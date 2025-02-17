from flask_pymongo import PyMongo
from flask import Flask
import os

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

class ExampleModel:
    def __init__(self, name, description):
        self.name = name
        self.description = description

    def save(self):
        example_collection = mongo.db.example_collection
        example_collection.insert_one({
            'name': self.name,
            'description': self.description
        })

    def __repr__(self):
        return f'<ExampleModel {self.name}>'