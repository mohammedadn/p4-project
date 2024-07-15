from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    contacts = db.Column(db.String(64), unique=True, nullable=False)
    address = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # One-to-many relationship with Workout
    workouts = db.relationship('Workout', backref='user', lazy=True)

    # One-to-many relationship with Tracker
    trackers = db.relationship('Tracker', backref='user', lazy=True)

    serialize_rules = ("-workouts.user", "-trackers.user")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(64), nullable=False)
    contacts = db.Column(db.String(64), nullable=False)
    activity = db.Column(db.String(64), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_workout_user'), nullable=False)

    def __repr__(self):
        return f"<Workout(id={self.id}, name='{self.name}')>"

class Trainer(db.Model, SerializerMixin):
    __tablename__ = 'trainers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(64), nullable=False)
    speciality = db.Column(db.String(64), nullable=False)
    image = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"<Trainer(id={self.id}, name='{self.name}', email='{self.email}')>"

class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)

    def __repr__(self):
        return f"<Activity(id={self.id}, name='{self.name}')>"

class Tracker(db.Model):
    __tablename__ = 'trackers'
    id = db.Column(db.Integer, primary_key=True)
    meal = db.Column(db.String(64))
    gym_visit_date = db.Column(db.Date)
    hours_training = db.Column(db.Float)  # Added field for hours of training
    weight = db.Column(db.Float)  # Added field for weight
    water_intake = db.Column(db.Float)  # Added field for water intake
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"<Tracker(id={self.id}, meal='{self.meal}', gym_visit_date='{self.gym_visit_date}', user_id={self.user_id})>"

    def to_dict(self):
        return {
            'id': self.id,
            'meal': self.meal,
            'gym_visit_date': self.gym_visit_date.strftime('%Y-%m-%d') if self.gym_visit_date else None,
            'hours_training': self.hours_training,
            'weight': self.weight,
            'water_intake': self.water_intake,
            'user_id': self.user_id
        }

    def __repr__(self):
        return f"<Tracker(id={self.id}, meal='{self.meal}', gym_visit_date='{self.gym_visit_date}', user_id={self.user_id})>"
