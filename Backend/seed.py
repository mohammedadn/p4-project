from flask_sqlalchemy import SQLAlchemy
from faker import Faker
from app import app, db, User, Workout, Trainer, Activity, Tracker
from datetime import datetime, date

# Initialize Faker (optional, for generating fake data)
fake = Faker()

def delete_data():
    """Delete existing data from the database."""
    with app.app_context():
        db.session.query(Workout).delete()
        db.session.query(Trainer).delete()
        db.session.query(User).delete()
        db.session.query(Activity).delete()
        db.session.query(Tracker).delete()  # Delete existing tracker data
        db.session.commit()
        print("Existing data deleted successfully!")

def seed_data():
    """Seed the database with sample data."""
    with app.app_context():
        # Create users
        user1 = User(username='john', password='password', email='john@example.com', contacts='123-456-7890', address='123 Main St')
        user2 = User(username='jane', password='password', email='jane@example.com', contacts='987-654-3210', address='456 Elm St')

        # Add users to the session
        db.session.add_all([user1, user2])
        db.session.commit()

        # Create workouts
        workout1 = Workout(name='Bench Press', email='john@example.com', address='123 Main St', contacts='123-456-7890', activity='Weightlifting', user_id=user1.id)
        workout2 = Workout(name='Yoga Class', email='jane@example.com', address='456 Elm St', contacts='987-654-3210', activity='Yoga', user_id=user2.id)

        # Add workouts to the session
        db.session.add_all([workout1, workout2])
        db.session.commit()

        # Seed trainers using trainersData
        trainersData = [
            {
                "name": 'Jane Smith',
                "speciality": 'Weight Training',
                "image": 'https://i.pinimg.com/originals/a9/36/83/a936834f26c349406f46659fe3a1ab24.jpg',
                "email": 'trainer1@example.com',
                "phone": '123-456-7890'
            },
            {
                "name": 'John Doe',
                "speciality": 'Arm Trainer',
                "image": 'https://i.pinimg.com/originals/8c/05/a4/8c05a4441da0c1a113a43ee3a42f96b6.jpg',
                "email": 'trainer2@example.com',
                "phone": '987-654-3210'
            },
            {
                "name": 'Shaqs Dickie',
                "speciality": 'Muscle Builder',
                "image": 'https://i.pinimg.com/originals/97/5a/6e/975a6e4cfabb4a61dad7ade098160ec7.jpg',
                "email": 'trainer3@example.com',
                "phone": '555-555-5555'
            },
            {
                "name": 'Michael Brown',
                "speciality": 'Body Builder',
                "image": 'https://i.pinimg.com/originals/2b/e8/9c/2be89cd60d1db8bc77c9591b0086e8a4.jpg',
                "email": 'trainer4@example.com',
                "phone": '777-777-7777'
            },
            {
                "name": 'Alex Thompson',
                "speciality": 'Cardio Junkie',
                "image": 'https://i.pinimg.com/originals/84/9a/3e/849a3ec67ca4f91d899a9fd6e289a170.jpg',
                "email": 'trainer5@example.com',
                "phone": '999-999-9999'
            },
            {
                "name": 'Daniel Jones',
                "speciality": 'Strength Trainer',
                "image": 'https://i.pinimg.com/1200x/12/3d/20/123d20439d9bfe22547a20dbbdbf86b4.jpg',
                "email": 'trainer6@example.com',
                "phone": '111-111-1111'
            },
            {
                "name": 'Emily Wilson',
                "speciality": 'Cross Fitter',
                "image": 'https://i.pinimg.com/originals/a8/ce/4b/a8ce4ba891e65dbcad0f0644684e774f.jpg',
                "email": 'trainer7@example.com',
                "phone": '222-222-2222'
            },
            {
                "name": 'Jessica Brown',
                "speciality": 'Power Lifter',
                "image": 'https://i.pinimg.com/originals/68/52/ee/6852ee748254da5d7a7268386cda2a15.jpg',
                "email": 'trainer8@example.com',
                "phone": '333-333-3333'
            },
            {
                "name": 'Lynnelle Parker',
                "speciality": 'Fitness Model',
                "image": 'https://i.pinimg.com/originals/d9/a4/bf/d9a4bfc9d522c1d6a50af0f0e823e59e.jpg',
                "email": 'trainer9@example.com',
                "phone": '444-444-4444'
            },
            {
                "name": 'Washington Brian',
                "speciality": 'Athlete',
                "image": 'https://i.pinimg.com/originals/8b/77/bc/8b77bc75a30db439cb756bce3f9a4177.jpg',
                "email": 'trainer10@example.com',
                "phone": '666-666-6666'
            },
        ]

        for data in trainersData:
            trainer = Trainer(name=data['name'], speciality=data['speciality'], image=data['image'], email=data['email'], phone=data['phone'])
            db.session.add(trainer)
        
        # Seed activities
        activitiesList = [
            'Wide-grip standing barbell curl',
            'Incline Dumbbell Hammer Curl',
            'Bench Press',
            'Push Ups',
            'Squats',
            'Treadmill',
            'Stairs'
        ]

        for activity_name in activitiesList:
            activity = Activity(name=activity_name)
            db.session.add(activity)

        # Seed trackers
        tracker1 = Tracker(meal='Salad', user_id=user1.id)
        tracker2 = Tracker(gym_visit_date=date(2023, 7, 1), user_id=user1.id)
        tracker3 = Tracker(meal='Chicken', user_id=user2.id)
        tracker4 = Tracker(gym_visit_date=date(2023, 7, 2), user_id=user2.id)

        db.session.add_all([tracker1, tracker2, tracker3, tracker4])
        db.session.commit()

        print("Seed data has been added successfully!")

if __name__ == '__main__':
    delete_data()  # Delete existing data before seeding (optional)
    seed_data()    # Seed the database with sample data
