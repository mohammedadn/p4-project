from flask import Flask, request, jsonify,make_response
from flask_cors import CORS

from models import *
from flask_migrate import Migrate


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x2a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fitness.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user=User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
    if user.password==password:
        return jsonify({'success': True, 'message': 'Login successful'}), 200
    
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    user=User(
        username=username,
        password=password,
        email=email
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Signup successful'})

@app.route('/api/trainers', methods=['GET'])
def get_trainers():
    trainers=Trainer.query.all()
    response=make_response([trainer.to_dict()for trainer in trainers],200)
    return response
    

@app.route('/api/trainers', methods=['POST'])
def create_trainer():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    speciality=data.get('speciality')
    image=data.get('image')

    trainer=Trainer(
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
    workouts=Workout.query.all()
    response=make_response([workout.to_dict()for workout in workouts],200)
    return response
    

@app.route('/api/workouts', methods=['POST'])
def create_workout():
    data = request.json
    name = data.get('name')
    email=data.get('email')
    address=data.get('address')
    contacts=data.get('contacts')
    activities=data.get('activities')
    
    asts=[]
    for activity in activities:
    
        workout= Workout (
            name=name,
            email=email,
            address=address,
            contacts=contacts,
            activity=activity,
            
            
        )
        asts.append(workout)
    
    db.session.add_all(asts)
    db.session.commit()
    print (asts)
    return jsonify({'success': True, 'message': 'Workout created successfully'}),201
@app.route('/api/activities', methods=['GET'])
def get_activities():
    activities=Activity.query.all()
    response=make_response([activity.to_dict()for activity in activities],200)
    return response



if __name__ == '__main__':
    app.run(port=5000, debug=True)