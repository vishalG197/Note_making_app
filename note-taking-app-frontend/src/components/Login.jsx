
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
const {login}=useAuth()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await fetch('https://note-backend-mqdn.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if(response.ok){
        const responseData = await response.json()
        // console.log(responseData);
        localStorage.setItem("token",responseData.token)
        login();
        alert("login sucessfully ")
      }else{
        alert("please check your credentials")
      }
      
      alert("Login successful")
    } catch (error) {
      alert("Login error: " + error.message)
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <details value={"note"}>Note: password should contain at least one uppercase,number and one special character</details>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
