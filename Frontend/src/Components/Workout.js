import React, { useState } from 'react';

import Navbar from './Navbar';

const activitiesList = [
  'Wide-grip standing barbell curl',
  'Incline Dumbbell Hammer Curl',
  'Bench press',
  'Push Ups',
  'Squats',
  'Treadmill',
  'Stairs'
];

const trainers = [
  'John Doe',
  'Jane Smith',
  'Mike Johnson',
  'Sarah Lee',
  'Jessica Brown',
  'Alex Thompson',
  'Daniel Jones',
  'Emily Wilson',
  'Michael Brown',
  'Daniel Parker',
  
];

function Workout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contacts: '',
    interestedWorkout: '',
    activities: [],
    trainer: ''  // New state for selected trainer
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActivityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData({ ...formData, activities: [...formData.activities, value] });
    } else {
      const updatedActivities = formData.activities.filter(activity => activity !== value);
      setFormData({ ...formData, activities: updatedActivities });
    }
  };

  const handleTrainerChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, trainer: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your form has been submitted successfully. Thank you for choosing Fitness tracker. Our team will reach out to you shortly. Asante Sana!`);
    fetch('https://api-server-vik-2.onrender.com/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => console.log(data)) // Handle response data as needed
      .catch(error => console.error('Error submitting form:', error));

    // Clear form data after submission
    setFormData({
      name: '',
      email: '',
      address: '',
      contacts: '',
      interestedWorkout: '',
      activities: [],
      trainer: ''
    });
  };

  return (
    <div>
      <Navbar />
      <hr></hr>
      <div className="container bg-secondary m-8 p-4">
        <h2 className="text-center fw-bold">Select Workout</h2>
        <div className="mb-3">
          {activitiesList.map(activity => (
            <div key={activity} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={activity}
                value={activity}
                checked={formData.activities.includes(activity)}
                onChange={handleActivityChange}
              />
              <label className="form-check-label" htmlFor={activity}>{activity}</label>
            </div>
          ))}
        </div>
        <hr></hr>
        <h2 className="text-center fw-bold">Fill in Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Information</label>
            <input type="number" className="form-control" name="contacts" value={formData.contacts} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Trainer</label>
            <select className="form-select" name="trainer" value={formData.trainer} onChange={handleTrainerChange} required>
              <option value="">Select a trainer</option>
              {trainers.map(trainer => (
                <option key={trainer} value={trainer}>{trainer}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary m-3">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Workout;
