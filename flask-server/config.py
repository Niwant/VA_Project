class Config:
    DEBUG = True
    TESTING = False
    SECRET_KEY = 'your_secret_key'
    OPENAPI_URL = '/openapi.json'
    DATABASE_URI = 'sqlite:///your_database.db'  # Example database URI, adjust as needed

class ProductionConfig(Config):
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True