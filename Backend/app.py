from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://elvinos:ImpalaTame2023.@localhost:5432/valgsystem"
db = SQLAlchemy(app)
migrate = Migrate(app, db)
cors = CORS(app)
app.config['SECRET_KEY'] = os.urandom(24)

from voting_routes import voting_blueprint

app.register_blueprint(voting_blueprint)

from key_generator import generator_blueprint

app.register_blueprint(generator_blueprint)


if __name__ == '__main__':
    app.run(debug=True)
