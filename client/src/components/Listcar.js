import React, { useContext, useEffect, useState } from 'react'
import './Listcar.css'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/users/UserContext';

export default function Listcar(props) {

    let {srctext}=props;
    const {listCar,token}=useContext(UserContext)
    const [car,setcar]=useState({brand:"",type:"petrol",passenger:0,year:0,gear:"Manual",price:0,image:"https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80"})

    const handleChange=(e)=>{
        setcar({...car, [e.target.id]:e.target.value})
    }

    const submit=(e)=>{
        e.preventDefault();
       // console.log(car);
        listCar(car);
        navigate("/")
        alert("Car listing successful! (Refresh to see lastest version)")
    }
    

    const navigate=useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/Sign-up')
        }
        if(srctext!=''){
            navigate("/")
        }
    })

    const date= new Date().getFullYear()

  return (
    <div className='container' >
      <form onSubmit={submit} className="row g-3 my-5">
  <div className="col-md-6">
    <label htmlFor="brand" className="form-label">Brand</label>
    <input type="text" onChange={handleChange} required className="form-control" id="brand" placeholder='Your car brand'/>
  </div>
  <div className="col-md-4">
    <label htmlFor="type" className="form-label">Engine Type</label>
    <select onChange={handleChange} id="type" className="form-select">
      <option>Petrol</option>
      <option>Disel</option>
      <option>Electric</option>
      <option>other....</option>
    </select>
  </div>
  <div className="col-12">
    <label htmlFor="passenger"  className="form-label">Passengers accomodated</label>
    <input onChange={handleChange} type="number" required min="1" max="10" className="form-control" id="passenger" placeholder="Passengers"/>
  </div>
  <div className="col-12">
    <label htmlFor="year" className="form-label">Model year</label>
    <input onChange={handleChange} type="number" min="1960" max={{date}} required className="form-control" id="year" placeholder="Enter 'yyyy'"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="gear" className="form-label">Gear type</label>
    <select onChange={handleChange} id="gear" className="form-select">
      <option>Manual</option>
      <option>Automatic</option>
    </select>
  </div>
  <div className="col-md-6">
    <label htmlFor="price" className="form-label">Price ($/day)</label>
    <input onChange={handleChange} type="number" placeholder='per day price...' required className="form-control" id="price"/>
  </div>
  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">State</label>
    <select id="inputState" className="form-select">
      <option>Maharashtra</option>
      <option>Gujrat</option>
      <option>Delhi</option>
      <option>Kerala</option>
      <option>more....</option>
    </select>
  </div>
  <div className="col-md-2">
    <label htmlFor="inputZip" className="form-label">Zip</label>
    <input type="text" className="form-control" id="inputZip"/>
  </div>
  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" required type="checkbox" id="gridCheck"/>
      <label className="form-check-label" htmlFor="gridCheck">
        Agree to terms and conditions
      </label>
    </div>
  </div>
  <div className="col-12">
    <button type='submit' className="btn btn-primary">Confirm Listing</button>
  </div>
</form>
    </div>
  )
}
