from flask import Blueprint, request, jsonify
from models import user_model, db
import bcrypt

user_blueprint = Blueprint('user_blueprint', __name__)
salt = bcrypt.gensalt()


@user_blueprint.route('/users/register', methods=['POST'])
def handle_register():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            hashedpw = bcrypt.hashpw(data['password'].encode('utf-8'), salt)
            newUser = user_model(email=data['email'], hasVoted=data["hasVoted"], password=hashedpw)
            db.session.add(newUser)
            db.session.commit()
            return {"message": f"user {newUser.email} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

@user_blueprint.route('/users/login', methods=['POST'])
def handle_users():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            hashedpw = bcrypt.hashpw(data['password'].encode('utf-8'), salt)
            newUser = user_model(email=data['email'], hasVoted=data["hasVoted"], password=hashedpw)
            db.session.add(newUser)
            db.session.commit()
            return {"message": f"user {newUser.email} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

