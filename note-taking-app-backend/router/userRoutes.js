const express =require('express');
 const userRouter =express.Router();
 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');
 const User = require('../models/User');
 const validateStrongPassword =require("../middleware/validatepass")
 userRouter.post("/register",validateStrongPassword,async(req, res) => {
   try {
     const { email, password } = req.body;
   //   console.log(email)
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = new User({ email, password: hashedPassword });
     await user.save();
     res.status(201).json({ message: 'User registered successfully' });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 })
 
 userRouter.post("/login",async(req, res) => {
   try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(401).json({ error: 'Invalid credentials' });
     }
     const isPasswordMatch = await bcrypt.compare(password, user.password);
     if (!isPasswordMatch) {
       return res.status(401).json({ error: 'Invalid credentials' });
     }
     const token = jwt.sign({ userId: user._id }, 'Note', { expiresIn: '1h' });
     res.status(200).json({msg:"login success", token });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 
 })


 module.exports =userRouter;
 