from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3002"}})

# Mock user data (replace with actual user authentication logic)
users = {
    'admin': {
        'password': 'password'
    }
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if username exists and password matches
    if username in users and users[username]['password'] == password:
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    # Simulate successful signup for demonstration purposes
    # Replace with actual signup logic
    return jsonify({'success': True, 'message': 'Signup successful'})



if __name__ == '__main__':
    app.run(port=5000, debug=True)
