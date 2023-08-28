from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://elvinos:ImpalaTame2023.@localhost:5432/valgsystem"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from user_routes import user_blueprint
app.register_blueprint(user_blueprint)

from voting_routes import voting_blueprint
app.register_blueprint(voting_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
