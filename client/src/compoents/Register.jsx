



import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();

        console.log(name,email,password);
        try{
          const response = await axios.post("/api/register",{
            name,
            email,
            password
          });
          if(response.status===200){
            console.log("Register Successfull");
            alert("Register Successfull");
            navigate("/login");
            setName(""),
            setEmail(""),
            setPassword("")
          }
        }catch(error){

            if (error.response && error.response.data.errors) {
                // Show all validation errors in an alert, each on a new line
                alert(error.response.data.errors.join("\n"));
            } else {
                alert("Something went wrong");
            }
            
            
        }
    }
    return (
        <div>
            <h1>Registe Page</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)} />
                <br />
                <input type="email" placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                <br />
                <input type="text" placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button type='submit'>SignUp</button>
            </form>
        </div>
    );
};

export default Register;