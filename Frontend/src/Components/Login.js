import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NumberCounter from 'number-counter'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState('');
  const [address, setAddress] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [formType, setFormType] = useState('login');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5500/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setLoggedIn(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5500/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, contacts, address }),
      });

      if (response.ok) {
        setLoggedIn(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to signup');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up. Please try again.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setEmail('');
    setContacts('');
    setAddress('');
    setError('');
  };

  const handleFormSwitch = () => {
    setFormType(formType === 'login' ? 'signup' : 'login');
    setError('');
  };

  const handleFormSubmit = async (e) => {
    try {
      if (formType === 'login') {
        await handleLogin(e);
      } else if (formType === 'signup') {
        await handleSignup(e);
      }
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: 'url(https://i.pinimg.com/originals/f6/32/2f/f6322faf9e6ec6aade3bfd55588bc443.jpg)',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        backgroundPosition: 'center',
      }}
    >
      {loggedIn ? (
        <LoggedInContent username={username} handleLogout={handleLogout} />
      ) : (
        <div className="card p-4 " style={{backgroundColor: 'rgba(255, 230, 220, 0.8)', borderRadius: '10px', width: '800px', height: '600px'}}>
          {formType === 'login' && (
            <>
              <h2>Login</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <input
                      type="password"
                      className="form-control mb-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <button className="btn btn-primary me-2" type="submit">
                      Login
                    </button>
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={handleFormSwitch}
                    >
                      Switch to Sign Up
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="alert alert-danger mt-3">{error}</div>
                )}
              </form>
            </>
          )}
          {formType === 'signup' && (
            <>
              <h2>Sign Up</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Username"
                      value={username}

                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <input
                      type="password"
                      className="form-control mb-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Contacts order (xxx-xxx-xxx)"
                      value={contacts}
                      onChange={(e) => setContacts(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6">
                    <button className="btn btn-success me-2" type="submit">
                      Sign Up
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleFormSwitch}
                    >
                      Switch to Login
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="alert alert-danger mt-3">{error}</div>
                )}
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

function LoggedInContent({ username, handleLogout }) {
  return (
    <>
    <div className='welcome'>
      <h2 className='stroketext'>Welcome,</h2><h3 className='stroketext2'> {username}!</h3>
     <div className='home'> <Link to="/home" >Home</Link></div>

      <button className="btn-btn-danger" onClick={handleLogout}>
        Logout
      </button>
     
    </div>
      
      
                
                <div className='figures'>
                    <div>
                        <span><NumberCounter end={180} start={110} delay='7' preFix="+"/></span>
                        <span>Expert coaches</span>
                    </div>
                    <div>
                        <span><NumberCounter end={1400} start={1000} delay='7' preFix="+"/></span>
                        <span>Members Joined</span>
                    </div>
                    <div>
                        <span><NumberCounter end={80} start={20} delay='7' preFix="+"/></span>
                        <span>Fitness Programs</span>
                    </div>

                </div>
    </>
  );
}

export default Login;
