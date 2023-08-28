from flask import Blueprint, request, jsonify
from models import user_model, db
import bcrypt

user_blueprint = Blueprint('user_blueprint', __name__)
salt = bcrypt.gensalt()


@user_blueprint.route('/users', methods=['POST', 'GET'])
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

    elif request.method == 'GET':
        users = user_model.query.all()
        results = [
            {
                "email": user.email,
                "password": user.password
            } for user in users]

        return {"count": len(results), "users": results}
