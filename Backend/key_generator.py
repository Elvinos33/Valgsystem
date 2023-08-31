from flask import Blueprint, request, jsonify
from models import key_model, db
from random import randint

generator_blueprint = Blueprint('generator_blueprint', __name__)

@generator_blueprint.route('/generator/create/key')
def generator():

    group = int(input("Which group do you want to generate for? "))
    quantity = int(input("How many keys do you want to generate? "))

    for i in range(0, quantity):
        key = randint(1000, 1000000000)
        new_key = key_model(id=key, group=group)

        db.session.add(new_key)

    db.session.commit()

    return {"message": "success"}








