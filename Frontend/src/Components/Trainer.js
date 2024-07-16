import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';



// Array of trainer objects with names, specialties, and image URLs


function Trainer() {
  const [list,setList] = useState([]);
  useEffect(()=>{
    fetch("http://127.0.0.1:5500/api/trainers")
     .then(response => response.json())
     .then(data => setList(data))
     .catch(error => console.error('Error fetching trainers:', error));
  },[])
  
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
            trainer.speciality.toLowerCase().includes(keyword)
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
    <div className='tracker-body'>
      <Navbar />
      <div className="container">
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
                  <p className="card-text">Speciality: {trainer.speciality}</p>
                  <p className="card-text">email: {trainer.email}</p>
                  <p className="card-text">phone: {trainer.phone}</p>

                 
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
