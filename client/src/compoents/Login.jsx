


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './../validation/cookieValidation';

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();


  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{

      const response= await axiosInstance.post("/api/login",{
        email, password
      })

      if(response.status ===200){
        alert("Login Successfull");
       
        navigate("/profile");
      }
    }catch(error){

      if (error.response) {
          // Show all validation errors in an alert, each on a new line
          console.log(error.response.data.message);
          alert(error.response.data.message)
      } else {
        console.log(error);
          alert("Something went wrong");
      }
      
      
  }
  }
  return (
    <div>
       <h1>Login Page</h1>

       <form onSubmit={handleSubmit}>
       <input type="email" placeholder='Enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
       <br />
       <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} />

       <button type="submit">Login</button>

       </form>
       
    </div>
  );
};

export default Login;