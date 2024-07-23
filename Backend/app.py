from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from models import *
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x2a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fitness.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if user is None or user.password != password:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
    return jsonify({'success': True, 'message': 'Login successful'}), 200

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    contacts = data.get('contacts')
    address = data.get('address')
    password = data.get('password')
    email = data.get('email')

    user = User(
        username=username,
        contacts=contacts,
        address=address,
        password=password,
        email=email
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Signup successful'})

@app.route('/api/trainers', methods=['GET'])
def get_trainers():
    trainers = Trainer.query.all()
    response = make_response([trainer.to_dict() for trainer in trainers], 200)
    return response

@app.route('/api/trainers', methods=['POST'])
def create_trainer():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    speciality = data.get('speciality')
    image = data.get('image')

    trainer = Trainer(
        name=name,
        email=email,
        phone=phone,
        speciality=speciality,
        image=image
    )
    db.session.add(trainer)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Trainer created successfully'})

@app.route('/api/workouts', methods=['GET'])
def get_workouts():
    workouts = Workout.query.all()
    response = make_response([workout.to_dict() for workout in workouts], 200)
    return response

@app.route('/api/workouts', methods=['POST'])
def create_workout():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    address = data.get('address')
    contacts = data.get('contacts')
    activities = data.get('activities')
    
    workouts = []
    for activity in activities:
        workout = Workout(
            name=name,
            email=email,
            address=address,
            contacts=contacts,
            activity=activity
        )
        workouts.append(workout)
    
    db.session.add_all(workouts)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Workout created successfully'}), 201

@app.route('/api/activities', methods=['GET'])
def get_activities():
    activities = Activity.query.all()
    response = make_response([activity.to_dict() for activity in activities], 200)
    return response

@app.route('/api/trackers', methods=['GET'])
def get_trackers():
    trackers = Tracker.query.all()
    response = make_response([tracker.to_dict() for tracker in trackers], 200)
    return response

@app.route('/api/trackers', methods=['POST'])
def create_tracker():
    data = request.get_json()
    meal = data.get('meal')
    hours_training = data.get('hours_training')
    weight = data.get('weight')
    water_intake = data.get('water_intake')
    gym_visit_date_str = data.get('gym_visit_date')
    user_id = data.get('user_id')
    
    if gym_visit_date_str:
        gym_visit_date = datetime.strptime(gym_visit_date_str, '%Y-%m-%d').date()
    else:
        gym_visit_date = None
    
    tracker = Tracker(
        meal=meal,
        hours_training=hours_training,
        weight=weight,
        water_intake=water_intake,
        gym_visit_date=gym_visit_date,
        user_id=user_id
    )
    
    db.session.add(tracker)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Tracker created successfully'}), 201

@app.route('/api/trackers/<int:id>', methods=['DELETE'])
def delete_tracker(id):
    tracker = Tracker.query.get(id)
    if tracker is None:
        return jsonify({'success': False, 'message': 'Tracker not found'}), 404
    
    db.session.delete(tracker)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Tracker deleted successfully'}), 200

if __name__ == '__main__':
    app.run(port=5500, debug=True)