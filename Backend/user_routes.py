import bcrypt
from flask import Blueprint, request
from models import user_model, db

user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route('/users/register', methods=['POST'])
def handle_register():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            salt = bcrypt.gensalt()

            hashedpw = bcrypt.hashpw(data['password'].encode('utf-8'), salt)
            new_user = user_model(email=data['email'], hasVoted=data["hasVoted"], password=hashedpw)

            db.session.add(new_user)
            db.session.commit()
            return {"message": f"user {new_user.email} has been created successfully."}
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
                    return {"message": "Logged in!"}
                else:
                    return {"message": "Wrong password"}, 422
            else:
                return {"message": "User not found."}, 404
        else:
            return {"error": "The request payload is not in JSON format"}, 400

