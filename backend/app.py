from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for development

# Mock user for demo purposes
DEMO_USER = {
    "email": "demo@example.com",
    "password": "password123"
}

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No data provided"}), 400
            
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()

        print(f"Login attempt - Email: '{email}', Password: '{password}'")

        if email and password:
            return jsonify({"success": True, "message": "Login successful"}), 200
        else:
            return jsonify({"success": False, "message": "Email and password are required"}), 400
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"success": False, "message": "An error occurred during login"}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"reply": "No message received"}), 400
            
        message = data.get('message', '')
        print(f"Received message: {message}")
        
        reply = "Hi there! This is a response from the QA Chat backend."
        return jsonify({"reply": reply})
    except Exception as e:
        print(f"Chat error: {str(e)}")
        return jsonify({"reply": "An error occurred on the server."}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
