import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import Navigation from './components/Navigation';
import Register from './components/Register';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  return (
    <> 
    <Navigation/>
    <Routes>
     
        <Route exact path="/" element={<h1>welcome to my notes</h1>} />
        <Route path="/notes" element={
        <PrivateRoutes>
  <NotesList/>
        </PrivateRoutes>
      
        
        } />
        <Route path="/create" element={
           <PrivateRoutes>

             <CreateNote/>
           </PrivateRoutes>
        
        } />
        {/* <Route path="/edit/:noteId" element={<EditNote/>} /> */}
        <Route path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
    </Routes>
    </>
  );
}

export default App;
