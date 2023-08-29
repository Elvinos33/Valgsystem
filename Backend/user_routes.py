import datetime
import bcrypt
import jwt
from flask import Blueprint, request, jsonify
from models import user_model, db
from app import app
from functools import wraps

user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route('/users/register', methods=['POST'])
def handle_register():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            user = db.session.query(user_model).filter_by(email=data["email"]).first()
            if not user:
                salt = bcrypt.gensalt()

                hashedpw = bcrypt.hashpw(data['password'].encode('utf-8'), salt)
                new_user = user_model(email=data['email'], hasVoted=False, password=hashedpw)

                db.session.add(new_user)
                db.session.commit()
                return {"message": f"user {new_user.email} has been created successfully."}
            else:
                return {"message": "User with this email already exists."}, 422

        else:
            return {"error": "The request payload is not in JSON format"}


@user_blueprint.route('/users/login', methods=['POST'])
def handle_login():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            user = db.session.query(user_model).filter_by(email=data["email"]).first()

            if user:
                if bcrypt.checkpw(data['password'].encode("utf-8"), user.password):
                    token = jwt.encode({'user_id': str(user.id), 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")
                    return jsonify({'token': token})

                else:
                    return {"message": "Wrong password"}, 422
            else:
                return {"message": "User not found."}, 404
        else:
            return {"error": "The request payload is not in JSON format"}, 400


@user_blueprint.route('/users/validate', methods=['POST'])
def handle_validation():
    if request.method == 'POST':
        if request.is_json:
            token = request.json.get('token')

            if token:
                try:
                    decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
                    # Token is valid
                    user_id = decoded_token.get('user_id')
                    user = db.session.query(user_model).filter_by(id=user_id).first()
                    return jsonify({'valid': True,
                                    "email": user.email})
                except jwt.ExpiredSignatureError:
                    # Token has expired
                    return jsonify({'valid': False, 'error': 'Token has expired'})
                except jwt.InvalidTokenError:
                    # Invalid token
                    return jsonify({'valid': False, 'error': 'Invalid token'})
            else:
                # Token not provided
                return jsonify({'valid': False, 'error': 'Token not provided'})


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            return jsonify({'message': 'a valid token is missing'})
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = db.session.query(user_model).filter_by(public_id=data['id']).first()
        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)

    return decorator

