import React from 'react'
import {Navigate } from "react-router-dom"
import { useAuth } from './AuthContext';
const PrivateRoutes = ({children}) => {
   let {authenticated} =useAuth();
   if(!authenticated){
      return <Navigate to="/login"/>
   }
  return (
   children
  )
}

export default PrivateRoutes
