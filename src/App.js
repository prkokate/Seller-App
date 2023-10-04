
import React, { useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Cars from './components/Cars';



import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';



export default function App() {
  const [page,setpage]=useState(1);
  const [search,setSearch]=useState('');

  
  return (
<div className="App">
  <div className="container">
  
    <Router>
  
        <Navbar srctext={setSearch} />
        
    <Routes>
    <Route path="/" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/1" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/2" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/3" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/4" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/5" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/6" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/7" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/8" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/9" element={<Cars srctext={search} pg={setpage} />} />
    <Route path="/10" element={<Cars srctext={search} pg={setpage} />} />
   
    
        
    </Routes>
        </Router>
  </div>
</div>
  )
}

        
        
        
  