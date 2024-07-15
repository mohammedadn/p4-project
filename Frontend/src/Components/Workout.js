import React, { useEffect, useState } from 'react';

import Navbar from './Navbar';



const trainers = [
  'Jane Smith',
  'John Doe',
  'Shaqs Dickie',
  'Michael Brown',
  'Alex Thompson',
  'Daniel Jones',
  'Emily Wilson',
  'Jessica Brown',
  'Lynnelle Parker',
  'Washington Brown',
  
];

function Workout() {
  const [activities,setActivities]=useState([])
  useEffect(()=>{
    fetch("http://127.0.0.1:5500/api/activities")
     .then(response => response.json())
     .then(data => setActivities(data))
     .catch(error => console.error('Error fetching workouts:', error));
  },[])
  console.log(activities)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contacts: '',
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
    fetch('http://127.0.0.1:5500/api/workouts', {
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
      activities: [],
      trainer: ''
    });
  };

  return (
    <div>
      <Navbar />
      <hr></hr>
      <div className="container bg-secondary m-8 p-4">
        <h2 className="text-center fw-bold">Select Activity</h2>
        <div className="mb-3">
          {activities.map(activity => (
            <div key={activity} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={activity.id}
                value={activity.name}
                checked={formData.activities.includes(activity.name)}
                onChange={handleActivityChange}
              />
              <label className="form-check-label" htmlFor={activity.name}>{activity.name}</label>
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
            <input type="text" className="form-control" name="contacts" value={formData.contacts} onChange={handleChange} />
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
