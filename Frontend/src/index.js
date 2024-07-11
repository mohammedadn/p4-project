import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Homepage';

import Trainer from './Components/Trainer';
import Workout from './Components/Workout';




const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  
  {
    path: '/home',
    element: <Home />,
  },
 
  {
    path: '/trainers',
    element: <Trainer />,
  },
  {
    path: '/workout',
    element: <Workout />,
  },

  
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
