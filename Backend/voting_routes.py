from flask import Blueprint, request
from models import candidate_model, db

voting_blueprint = Blueprint('voting_blueprint', __name__)

@voting_blueprint.route('/voting/results', methods=['GET'])
def handle_results():
    if request.method == 'GET':
        if request.is_json:
            data = request.get_json()
            user = db.session.query(user_model).filter_by(email=data["email"]).first()

            if user:
                if bcrypt.checkpw(data['password'].encode("utf-8"), user.password):
                    return {"message": "Logged in!"}
                else:
                    return {"message": "Wrong password"}, 422
            else:
                return {"message": "no user with that email:("}, 422
        else:
            return {"error": "The request payload is not in JSON format"}


@voting_blueprint.route('/voting/vote', methods=['POST'])
def handle_vote():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            candidate = db.session.query(candidate_model).filter_by(name=data["name"]).first()
            if candidate:
                candidate.votes +=1
                db.session.commit()
                return {"message": "Successfully voted."}
            else:
                return {"message": "Candidate not found."}, 404
        else:
            return {"error": "The request payload is not in JSON format"}, 400

