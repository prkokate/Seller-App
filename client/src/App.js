
import React, { useEffect, useState,useMemo,useContext } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Cars from './components/Cars';
import UserState from './context/users/UserState';
import UserContext from './context/users/UserContext';



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Rentcar from './components/Rentcar';
import Listcar from './components/Listcar';
import Login from './components/Login';



export default function App() {
  const [page,setpage]=useState(1);
  const [search,setSearch]=useState('');

 
  
  return (
<div className="App">
  <div className="container">
  
  <UserState>
    <Router>
  
        <Navbar srctext={setSearch} />
        
    <Routes>
  
    <Route exact path="/" element={<Cars srctext={search} pg={setpage} />} />
    <Route exact path="/1" element={<Cars srctext={search} pg={setpage}  />} />
    <Route exact path={`/${page}`} element={<Cars srctext={search} pg={setpage}  />} />
    <Route exact path='/My-Favorites' element={<Cars srctext={search} pg={setpage} favorite={true}  />} />
    <Route exact path='/Rent-car'   element={<Rentcar srctext={search} pg={setpage}/>} />
    <Route exact path="/List-car" element={<Listcar srctext={search} />} />
    <Route exact path="/Sign-up" element={<Login/>} />
   
    
        
    </Routes>
      <br /><br /><br />
    <div className="outer"><Link to="/List-car" className='listcar' >List Car</Link></div>
        </Router>
    </UserState>
  </div>
</div>
  )
}

        
        
        
  