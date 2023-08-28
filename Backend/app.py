from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://elvinos:ImpalaTame2023.@localhost:5432/Valgsystem"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from routes import user_blueprint
app.register_blueprint(user_blueprint)

if __name__ == '__main__':
    app.run()
