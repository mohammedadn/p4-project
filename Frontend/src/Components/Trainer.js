import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


// Array of trainer objects with names, specialties, and image URLs
const trainersData = [
  {
    name: 'Trainer 1',
    specialty: 'Weight Training',
    image: 'https://i.pinimg.com/originals/a9/36/83/a936834f26c349406f46659fe3a1ab24.jpg'
  },
  {
    name: 'Trainer 2',
    specialty: 'Arm Trainer',
    image: 'https://i.pinimg.com/originals/8c/05/a4/8c05a4441da0c1a113a43ee3a42f96b6.jpg'
  },
  {
    name: 'Trainer 3',
    specialty: 'Muscle Builder',
    image: 'https://i.pinimg.com/originals/97/5a/6e/975a6e4cfabb4a61dad7ade098160ec7.jpg'
  },
  {
    name: 'Trainer 4',
    specialty: 'Body Builder',
    image: 'https://i.pinimg.com/originals/2b/e8/9c/2be89cd60d1db8bc77c9591b0086e8a4.jpg'
  },
  {
    name: 'Trainer 5',
    specialty: 'Cardio Junkie',
    image: 'https://i.pinimg.com/originals/84/9a/3e/849a3ec67ca4f91d899a9fd6e289a170.jpg'
  },
  {
    name: 'Trainer 6',
    specialty: 'Strength Trainer',
    image: 'https://i.pinimg.com/1200x/12/3d/20/123d20439d9bfe22547a20dbbdbf86b4.jpg'
  },
  {
    name: 'Trainer 7',
    specialty: 'Cross Fitter',
    image: 'https://i.pinimg.com/originals/a8/ce/4b/a8ce4ba891e65dbcad0f0644684e774f.jpg'
  },
  {
    name: 'Trainer 8',
    specialty: 'Power Lifter',
    image: 'https://i.pinimg.com/originals/68/52/ee/6852ee748254da5d7a7268386cda2a15.jpg'
  },
  {
    name: 'Trainer 9',
    specialty: 'Fitness Model',
    image: 'https://i.pinimg.com/originals/d9/a4/bf/d9a4bfc9d522c1d6a50af0f0e823e59e.jpg'
  },
  {
    name: 'Trainer 10',
    specialty: 'Athlete',
    image: 'https://i.pinimg.com/originals/8b/77/bc/8b77bc75a30db439cb756bce3f9a4177.jpg'
  },



];

function Trainer() {
  const [list] = useState(trainersData); // Initialize list with trainersData
  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filterList = () => {
      const keywords = search.toLowerCase().split(" ");
      const filteredList = list.filter((trainer) => {
        return keywords.every((keyword) => {
          return (
            trainer.name.toLowerCase().includes(keyword) ||
            trainer.specialty.toLowerCase().includes(keyword)
          );
        });
      });
      setFilteredList(filteredList);
    };

    const delaySearch = setTimeout(() => {
      filterList();
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [search, list]);

  return (
    <div>
      <Navbar />
      <div className="container m-3 p-3">
        <div className="m-2 p-3">
          <input
            onChange={handleSearch}
            className="form-control"
            type="text"
            placeholder="Search Trainer"
            value={search}
          />
        </div>
        <div className="row">
          {filteredList.map((trainer) => (
            <div key={trainer.id} className="col-sm-4 mb-3 mx-auto">
              <div className="card">
                <img
                  src={trainer.image}
                  className="card-img-top"
                  alt="Trainer"
                  style={{ height: "350px", width: "350px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Name: {trainer.name}</h5>
                  <p className="card-text">Specialty: {trainer.specialty}</p>
                  <Link to={`${trainer.id}`}>
                    <button className="btn btn-success btn-sm m-3">View trainer details</button>
                  </Link>
                  
                </div>
                
                  
               
             
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
  
  

export default Trainer;
