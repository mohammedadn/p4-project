import React, { useState } from 'react';

const Tracker = () => {
  const [meal, setMeal] = useState('');
  const [meals, setMeals] = useState([]);
  const [gymVisit, setGymVisit] = useState('');
  const [gymVisits, setGymVisits] = useState([]);

  // Replace with actual user ID retrieval logic in your application
  const userId = 1; // Example user ID

  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (meal) {
      const data = { meal, user_id: userId }; // Include user_id in data

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
          console.log('Tracker created successfully:', result);
          setMeals([...meals, meal]);
          setMeal('');
        } else {
          console.error('Failed to create tracker:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating tracker:', error.message);
      }
    }
  };

  const handleAddGymVisit = async (e) => {
    e.preventDefault();
    if (gymVisit) {
      const data = { gym_visit_date: gymVisit, user_id: userId }; // Include user_id in data

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
          console.log('Tracker created successfully:', result);
          setGymVisits([...gymVisits, { id: gymVisits.length + 1, date: gymVisit }]);
          setGymVisit('');
        } else {
          console.error('Failed to create tracker:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating tracker:', error.message);
      }
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

      <div className="card mt-3">
        <div className="card-body">
          <h2>Track Gym Visits</h2>
          <form onSubmit={handleAddGymVisit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter gym visit date (YYYY-MM-DD)"
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
                {visit.date} {/* Display gym visit date */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
