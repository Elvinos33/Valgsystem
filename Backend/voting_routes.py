from flask import Blueprint, request, jsonify
from models import candidate_model, user_model, db
from user_routes import token_required
from flask_cors import cross_origin

voting_blueprint = Blueprint('voting_blueprint', __name__)

@voting_blueprint.route('/voting/results', methods=['GET'])
@cross_origin()
def handle_results():
    if request.method == 'GET':
        candidates = candidate_model.query.all()

        candidata = [
            {
                "name": candidate.name,
                "vote": candidate.votes,
                "group": candidate.group
            } for candidate in candidates]

        return {"candidates": candidata}


@voting_blueprint.route('/voting/vote', methods=['POST'])
@cross_origin()
def handle_vote():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()

            voter = db.session.query(user_model).filter_by(id=data["voter"]).first()

            if voter:
                if voter.hasVoted:
                    return {"message": "This user has already voted."}, 422
                else:
                    voter.hasVoted = True
                    candidate = db.session.query(candidate_model).filter_by(name=data["candidate"]).first()

                    if candidate:
                        candidate.votes += 1
                        db.session.commit()
                        return jsonify({"success": True})
                    else:
                        return {"message": "Candidate not found."}, 404
        else:
            return {"error": "The request payload is not in JSON format"}, 400




