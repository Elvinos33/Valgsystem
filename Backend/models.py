from app import db
from random import randint

key_id = randint(1000, 100000)

class group_model(db.Model):
    __tablename__ = 'Groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<User {self.name}>"


class key_model(db.Model):
    __tablename__ = 'Keys'

    id = db.Column(db.Integer, unique=True,  primary_key=True)
    group = db.Column(db.Integer)

    def __init__(self, group, id):
        self.group = group
        self.id = id

    def __repr__(self):
        return f"<User {self.group}>"


class candidate_model(db.Model):
    __tablename__ = 'Candidates'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    votes = db.Column(db.Integer())
    group = db.Column(db.String())

    def __init__(self, name, votes):
        self.name = name
        self.votes = votes

    def __repr__(self):
        return f"<User {self.name}>"



