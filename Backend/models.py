from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(128))
    email = db.Column(db.String(120), unique=True)

    # One-to-many relationship with Workout
    workouts = db.relationship('Workout', backref='user', lazy=True)

   

    serialize_rules = ( "-workouts.user",)

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String)
    address = db.Column(db.String)
    contacts = db.Column(db.String)
    activity = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Foreign key to users table

    def __repr__(self):
        return f"<Workout(id={self.id}, name='{self.name}')>"

class Trainer(db.Model, SerializerMixin):
    __tablename__ = 'trainers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(120))
    speciality = db.Column(db.String)
    image = db.Column(db.String)

    # One-to-many relationship with TrainerDetail
    

    def __repr__(self):
        return f"<Trainer(id={self.id}, name='{self.name}', email='{self.email}')>"

class Activity(db.Model,SerializerMixin):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    

