from flask import Flask
from .routes import api

def create_app():
    app = Flask(__name__)
    app.config.from_object('config')

    app.register_blueprint(api)

    return app

app = create_app()