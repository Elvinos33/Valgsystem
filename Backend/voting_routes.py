from flask import Blueprint, request
from models import candidate_model, user_model, db
from user_routes import token_required

voting_blueprint = Blueprint('voting_blueprint', __name__)

@voting_blueprint.route('/voting/results', methods=['GET'])
def handle_results():
    if request.method == 'GET':
        candidates = candidate_model.query.all()
        results = [
            {
                "name": candidate.name,
                "vote": candidate.votes
            } for candidate in candidates]

        return {"Results": results}


@voting_blueprint.route('/voting/vote', methods=['POST'])
@token_required
def handle_vote():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()

            voter = db.session.query(user_model).filter_by(email=data["voter"]).first()

            if voter:
                if voter.hasVoted:
                    return {"message": "This user has already voted."}, 422
                else:
                    voter.hasVoted = True
                    candidate = db.session.query(candidate_model).filter_by(name=data["candidate"]).first()

                    if candidate:
                        candidate.votes += 1
                        db.session.commit()
                        return {"message": "Successfully voted."}
                    else:
                        return {"message": "Candidate not found."}, 404
        else:
            return {"error": "The request payload is not in JSON format"}, 400




