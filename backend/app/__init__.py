from flask import Flask
from flask_pymongo import PyMongo
from app.config import Config
from flask_cors import CORS

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    mongo.init_app(app)
    CORS(app)

    from app.routes import reservations, venues, authentication
    app.register_blueprint(reservations)
    app.register_blueprint(venues)
    app.register_blueprint(authentication)

    return app