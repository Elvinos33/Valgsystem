from flask import Blueprint, request, jsonify
from models import candidate_model, group_model, key_model, db
from flask_cors import cross_origin

voting_blueprint = Blueprint('voting_blueprint', __name__)

@voting_blueprint.route('/voting/results', methods=['GET'])
@cross_origin()
def handle_results():
    if request.method == 'GET':
        candidates = candidate_model.query.all()
        groupData = group_model.query.all()

        candidata = [
            {
                "name": candidate.name,
                "vote": candidate.votes,
                "group": candidate.group
            } for candidate in candidates]

        groups = [
            {
                "name": group.name,
            } for group in groupData]

        return {"candidates": candidata,
                "groups": groups}


@voting_blueprint.route('/voting/vote', methods=['POST'])
@cross_origin()
def handle_vote():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()

            voter = db.session.query(key_model).filter_by(id=data["key"]).first()

            if voter:
                group = db.session.query(group_model).filter_by(id=voter.group).first()

                if group.name == data["group"]:
                    candidate = db.session.query(candidate_model).filter_by(name=data["candidate"]).first()

                    if candidate:
                        if candidate.group == data['group']:
                            db.session.query(key_model).filter_by(id=voter.id).delete()
                            candidate.votes += 1
                            db.session.commit()
                            return jsonify({"success": True})
                        else:
                            return jsonify({"success": False})

                    else:
                        return {"message": "Candidate not found."}, 404
                else:
                    return jsonify({"access": False})

        else:
            return {"error": "The request payload is not in JSON format"}, 400




