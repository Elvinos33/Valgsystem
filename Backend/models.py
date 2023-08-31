from app import db

class user_model(db.Model):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String())
    hasVoted = db.Column(db.Boolean())
    password = db.Column(db.LargeBinary())

    def __init__(self, email, hasVoted, password):
        self.email = email
        self.hasVoted = hasVoted
        self.password = password

    def __repr__(self):
        return f"<User {self.email}>"




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