import React, { useContext, useEffect, useState } from 'react';
import {Menu} from 'lucide-react'
import './Navbar.css';


import {
  Link, useNavigate
}from 'react-router-dom';
import UserContext from '../context/users/UserContext';


export default function Navbar(props) {
  const{srctext}=props;
  const navigate=useNavigate();

  const [logstyle,setlogstyle]=useState("btn btn-danger")
  

  const [search,setsearch]=useState('');
  const {token}=useContext(UserContext)
  const handleSearch=(e)=>{
    setsearch(e.target.value);
    srctext(e.target.value);
    
  }

  const srcBrand=(brnd)=>{
    setsearch(brnd);
    srctext(brnd);
  }

  const handleLogin=()=>{
    if(localStorage.getItem('token')){
      localStorage.clear('token')
      alert("You have been logged out!")
      navigate("/Sign-up");
    }
    else{
      navigate("/Sign-up")
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    {/* <a className="navbar-brand" href="#">Navbar</a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <form className="d-flex" role="search">
        <input value={search} onChange={handleSearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
      </form>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/relevance" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Relevance
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/sidan">Sidan</a></li>
            <li><a className="dropdown-item" href="/SUV">SUV</a></li>
            <li><a className="dropdown-item" href="/Hybrid">Hybrid</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/categories">See more categories...</a></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/brands" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            All Brands
          </a>
          <ul className="dropdown-menu">
            <li><button onClick={()=>{srcBrand("Audi")}} className="dropdown-item" >Audi</button></li>
            <li><button onClick={()=>{srcBrand("Ford")}} className="dropdown-item" >Ford</button></li>
            <li><button onClick={()=>{srcBrand("Lexus")}} className="dropdown-item" >Lexus</button></li>
            <li><button onClick={()=>{srcBrand("Honda")}} className="dropdown-item" >Honda</button></li>
            <li><button onClick={()=>{srcBrand("Chevrolet")}} className="dropdown-item" >Chevrolet</button></li>
            <li><button onClick={()=>{srcBrand("Mercedes-Benz")}} className="dropdown-item" >Mercedes-Benz</button></li>
            <li><button onClick={()=>{srcBrand("Toyota")}} className="dropdown-item" >Toyota</button></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/more-brands">Browse More ...</a></li>
          </ul>
        </li>
        <Link to="/"  className='home nav-link' >
                  Home
        </Link>
<div className="buttons">
  
          <li onClick={handleLogin} id='login' className={logstyle}>
          {localStorage.getItem('token')?"Log out":"Login"}
          </li>
  
          { localStorage.getItem('token')? <Link to="/My-Favorites"  className='btn btn-primary myfav' >
                My Favorites
          </Link>:null}
</div>
      </ul>
     
    </div>
  </div>
</nav>
  )
}
