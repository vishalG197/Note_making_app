import axios from 'axios';
import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    try {
      // const res =await axios.post("http://localhost:8080/users/register",formData)
      // // const data =await res.data;
      // // console.log(data)
      // alert('Successfully registered');
      // // console.log(res.data)
      const response = await fetch('https://note-backend-mqdn.onrender.com/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        alert('Successfully registered');
      } else {
        alert('Error in registration');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <br />
        <input type="password" name="password" placeholder="Password" value={formData.password}  onChange={handleChange} />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
