

import React from 'react';
import Navbar from './compoents/Navbar';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./compoents/Home";
import Profile from "./compoents/Profile";
import Login from "./compoents/Login";
import About from "./compoents/About";
import Register from './compoents/Register';

const App = () => {
  const router= createBrowserRouter([
    {
      path: "/",
      element: <div>
        <Home/>
      </div>
    },
    {
      path: "/profile",
      element: <div>
        <Navbar/>
        <Profile/>
      </div>
    },
    {
      path: "/login",
      element: <div>
        <Navbar/>
        <Login/>
      </div>
    },
    {
      path: "/about",
      element: <div>
        <Navbar/>
        <About/>
      </div>
    },
    {
      path:"/register",
      element: <div>
        <Navbar/>
        <Register/>
      </div>
    }

  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;