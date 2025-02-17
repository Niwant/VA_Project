# Flask Server

This project is a simple Flask server that provides an API with OpenAPI support. It is structured to allow easy expansion and maintenance.

## Project Structure

```
flask-server
├── app
│   ├── __init__.py
│   ├── routes.py
│   └── models.py
├── requirements.txt
├── config.py
├── run.py
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd flask-server
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required packages:**
   ```
   pip install -r requirements.txt
   ```

## Running the Server

To start the Flask server, run the following command:

```
python run.py
```

The server will be accessible at `http://127.0.0.1:5000`.

## API Endpoints

The API endpoints are defined in `app/routes.py`. You can access the OpenAPI documentation to explore the available endpoints.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.