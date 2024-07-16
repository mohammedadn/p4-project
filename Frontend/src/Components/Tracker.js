
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
        setMeals(data.filter(entry => entry.meal).map(entry => ({ id: entry.id, meal: entry.meal })));
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
        setGymVisits(data.filter(entry => entry.gym_visit_date).map(entry => ({ id: entry.id, date: entry.gym_visit_date })));
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
        setHoursTrainings(data.filter(entry => entry.hours_training).map(entry => ({ id: entry.id, hours: entry.hours_training })));
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
        setWeights(data.filter(entry => entry.weight).map(entry => ({ id: entry.id, weight: entry.weight })));
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
        setWaterIntakes(data.filter(entry => entry.water_intake).map(entry => ({ id: entry.id, water: entry.water_intake })));
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
          setMeals([...meals, { id: result.id, meal }]);
          setMeal('');
        } else {
          console.error('Failed to add meal:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding meal:', error.message);
      }
    }
  };

  // Handle deleting a meal
  const handleDeleteMeal = async (id) => {
    try {
      const response = await fetch(`http://localhost:5500/api/trackers/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Meal deleted successfully');
        setMeals(meals.filter(meal => meal.id !== id));
      } else {
        console.error('Failed to delete meal:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
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

  // Handle deleting a gym visit
  const handleDeleteGymVisit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5500/api/trackers/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Gym visit deleted successfully');
        setGymVisits(gymVisits.filter(visit => visit.id !== id));
      } else {
        console.error('Failed to delete gym visit:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting gym visit:', error);
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
          setHoursTrainings([...hoursTrainings, { id: result.id, hours: parseFloat(hoursTraining) }]);
          setHoursTraining('');
        } else {
          console.error('Failed to add hours of training:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding hours of training:', error.message);
      }
    }
  };

  // Handle deleting hours of training
  const handleDeleteHoursTraining = async (id) => {
    try {
      const response = await fetch(`http://localhost:5500/api/trackers/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Hours of training deleted successfully');
        setHoursTrainings(hoursTrainings.filter(hours => hours.id !== id));
      } else {
        console.error('Failed to delete hours of training:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting hours of training:', error);
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
          setWeights([...weights, { id: result.id, weight: parseFloat(weight) }]);
          setWeight('');
        } else {
          console.error('Failed to add weight:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding weight:', error.message);
      }
    }
  };

  const handleDeleteWeight = async (id) => {
    try {
      const response = await fetch(`http://localhost:5500/api/trackers/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setWeights(weights.filter(weight => weight.id !== id));
      } else {
        console.error('Failed to delete weight:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting weight:', error);
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
        setWaterIntakes([...waterIntakes, { id: result.id, water: parseFloat(waterIntake) }]);
        setWaterIntake('');
      } else {
        console.error('Failed to add water intake:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding water intake:', error.message);
    }
  }
};

// Handle deleting water intake
const handleDeleteWaterIntake = async (id) => {
  try {
    const response = await fetch(`http://localhost:5500/api/trackers/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log('Water intake deleted successfully');
      setWaterIntakes(waterIntakes.filter(intake => intake.id !== id));
    } else {
      console.error('Failed to delete water intake:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting water intake:', error);
  }
};

  return (
    <div className="container mt-5">
      <h1>Tracker</h1>

      <div className="card mt-3">
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

    {/* Track Gym Visits */}
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
            <button className="btn btn-primary" type="submit">Add Gym Visit</button>
          </div>
        </form>
        <ul className="list-group">
          {gymVisits.map((visit) => (
            <li key={visit.id} className="list-group-item d-flex justify-content-between align-items-center">
              {visit.date}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteGymVisit(visit.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Track Hours of Training */}
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
            <button className="btn btn-primary" type="submit">Add Hours of Training</button>
          </div>
        </form>
        <ul className="list-group">
          {hoursTrainings.map((hours) => (
            <li key={hours.id} className="list-group-item d-flex justify-content-between align-items-center">
              {hours.hours} hours
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteHoursTraining(hours.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Track Weight */}
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
            <button className="btn btn-primary" type="submit">Add Weight</button>
          </div>
        </form>
        <ul className="list-group">
          {weights.map((w) => (
            <li key={w.id} className="list-group-item d-flex justify-content-between align-items-center">
              {w.weight} kg
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteWeight(w.id)}
              >
                Delete
              </button>
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
  );
};

export default Tracker;