import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';

const Tracker = () => {
  const [meal, setMeal] = useState('');
  const [meals, setMeals] = useState([]);
  const [gymVisit, setGymVisit] = useState('');
  const [gymVisits, setGymVisits] = useState([]);
  const [hoursTraining, setHoursTraining] = useState('');
  const [hoursTrainings, setHoursTrainings] = useState([]);
  const [weight, setWeight] = useState('');
  const [weights, setWeights] = useState([]);
  const [waterIntake, setWaterIntake] = useState('');
  const [waterIntakes, setWaterIntakes] = useState([]);

  // Replace with actual user ID retrieval logic in your application
  const userId = 1; // Example user ID

  // Fetch existing data on component mount
  useEffect(() => {
    fetchMeals();
    fetchGymVisits();
    fetchHoursTraining();
    fetchWeight();
    fetchWaterIntake();
  }, []);

  // Fetch existing meals
  const fetchMeals = async () => {
    try {
      const response = await fetch(`http://localhost:5500/api/trackers?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMeals(data.map(entry => entry.meal));
      } else {
        console.error('Failed to fetch meals:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  // Fetch existing gym visits
  const fetchGymVisits = async () => {
    try {
      const response = await fetch(`http://localhost:5500/api/trackers?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setGymVisits(data.map(entry => ({ id: entry.id, date: entry.gym_visit_date })));
      } else {
        console.error('Failed to fetch gym visits:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching gym visits:', error);
    }
  };

  // Fetch existing hours of training
  const fetchHoursTraining = async () => {
    try {
      const response = await fetch(`http://localhost:5500/api/trackers?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setHoursTrainings(data.map(entry => entry.hours_training));
      } else {
        console.error('Failed to fetch hours of training:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching hours of training:', error);
    }
  };

  // Fetch existing weight
  const fetchWeight = async () => {
    try {
      const response = await fetch(`http://localhost:5500/api/trackers?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setWeights(data.map(entry => entry.weight));
      } else {
        console.error('Failed to fetch weight:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching weight:', error);
    }
  };

  // Fetch existing water intake
  const fetchWaterIntake = async () => {
    try {
      const response = await fetch(`http://localhost:5500/api/trackers?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setWaterIntakes(data.map(entry => entry.water_intake));
      } else {
        console.error('Failed to fetch water intake:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching water intake:', error);
    }
  };

  // Handle adding a new meal
  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (meal) {
      const data = { meal, user_id: userId };

      try {
        const response = await fetch('http://localhost:5500/api/trackers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Meal added successfully:', result);
          setMeals([...meals, meal]);
          setMeal('');
        } else {
          console.error('Failed to add meal:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding meal:', error.message);
      }
    }
  };

  // Handle adding a new gym visit
  const handleAddGymVisit = async (e) => {
    e.preventDefault();
    if (gymVisit) {
      const data = { gym_visit_date: gymVisit, user_id: userId };

      try {
        const response = await fetch('http://localhost:5500/api/trackers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Gym visit added successfully:', result);
          setGymVisits([...gymVisits, { id: result.id, date: gymVisit }]);
          setGymVisit('');
        } else {
          console.error('Failed to add gym visit:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding gym visit:', error.message);
      }
    }
  };

  // Handle adding hours of training
  const handleAddHoursTraining = async (e) => {
    e.preventDefault();
    if (hoursTraining) {
      const data = { hours_training: parseFloat(hoursTraining), user_id: userId };

      try {
        const response = await fetch('http://localhost:5500/api/trackers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Hours of training added successfully:', result);
          setHoursTrainings([...hoursTrainings, parseFloat(hoursTraining)]);
          setHoursTraining('');
        } else {
          console.error('Failed to add hours of training:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding hours of training:', error.message);
      }
    }
  };

  // Handle adding weight
  const handleAddWeight = async (e) => {
    e.preventDefault();
    if (weight) {
      const data = { weight: parseFloat(weight), user_id: userId };

      try {
        const response = await fetch('http://localhost:5500/api/trackers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Weight added successfully:', result);
          setWeights([...weights, parseFloat(weight)]);
          setWeight('');
        } else {
          console.error('Failed to add weight:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding weight:', error.message);
      }
    }
  };

  // Handle adding water intake
  const handleAddWaterIntake = async (e) => {
    e.preventDefault();
    if (waterIntake) {
      const data = { water_intake: parseFloat(waterIntake), user_id: userId };

      try {
        const response = await fetch('http://localhost:5500/api/trackers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Water intake added successfully:', result);
          setWaterIntakes([...waterIntakes, parseFloat(waterIntake)]);
          setWaterIntake('');
        } else {
          console.error('Failed to add water intake:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding water intake:', error.message);
      }
    }
  };

  return (
   
    <div className='tracker-body'>
     <Navbar/>
    
    <div className="container ">
      
      <h1 style={{ fontSize: '24px', color: 'white', fontWeight: 'bold',  textAlign: 'center' }}>Tracker</h1>


      <div className="card mt-5">
        
        <div className="card-body">
          <h2>Track Meals</h2>
          <form onSubmit={handleAddMeal}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter meal"
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Add Meal
              </button>
            </div>
          </form>
          <ul className="list-group">
            {meals.map((meal, index) => (
              <li key={index} className="list-group-item">
                {meal}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h2>Track Gym Visits</h2>
          <form onSubmit={handleAddGymVisit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter gym visit date"
                value={gymVisit}
                onChange={(e) => setGymVisit(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Add Gym Visit
              </button>
            </div>
          </form>
          <ul className="list-group">
            {gymVisits.map((visit, index) => (
              <li key={index} className="list-group-item">
                {visit.date}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h2>Track Hours of Training</h2>
          <form onSubmit={handleAddHoursTraining}>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Enter hours of training"
                value={hoursTraining}
                onChange={(e) => setHoursTraining(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Add Hours of Training
              </button>
            </div>
          </form>
          <ul className="list-group">
            {hoursTrainings.map((hours, index) => (
              <li key={index} className="list-group-item">
                {hours} hours
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h2>Track Weight</h2>
          <form onSubmit={handleAddWeight}>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Add Weight
              </button>
            </div>
          </form>
          <ul className="list-group">
            {weights.map((weight, index) => (
              <li key={index} className="list-group-item">
                {weight} kg
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h2>Track Water Intake</h2>
          <form onSubmit={handleAddWaterIntake}>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Enter water intake"
                value={waterIntake}
                onChange={(e) => setWaterIntake(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Add Water Intake
              </button>
            </div>
          </form>
          <ul className="list-group">
            {waterIntakes.map((water, index) => (
              <li key={index} className="list-group-item">
                {water} liters
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Tracker;
