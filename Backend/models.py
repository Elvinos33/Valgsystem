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
