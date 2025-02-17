from flask import Blueprint, jsonify
import requests
import os

api = Blueprint('api', __name__)

@api.route('/openapi', methods=['GET'])
def openapi_spec():
    response = requests.get('https://api.example.com/openapi')
    spec = response.json()
    return jsonify(spec)

@api.route('/example', methods=['GET'])
def example_endpoint():
    response = requests.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        headers={
            'Authorization': f'Bearer {os.getenv("OPENAI_API_KEY")}',
            'Content-Type': 'application/json'
        },
        json={
            'prompt': 'Say this is a test',
            'max_tokens': 5
        }
    )
    result = response.json()
    return jsonify(result)