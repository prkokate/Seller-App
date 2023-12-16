import React, { useContext, useEffect, useState } from 'react'
import './Rentcar.css'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/users/UserContext';

export default function Rentcar(props) {

    const navigate=useNavigate();
    const [days,setdays]=useState(0)
    let {srctext}=props
    const {toRent,host}=useContext(UserContext)


    useEffect(()=>{
        if(srctext!==''){
            navigate("/")
        }
    })

    const handleChange=(e)=>{
        setdays(Number(e.target.value))
    }

    const submit=async(e)=>{
        e.preventDefault()
if(days<1){
            alert("1<=days<=10")
        }
if(days<=10){
           // console.log("rented in rentcar=",toRent)

    try{
        const response=await fetch(`${host}/api/cars/rent-car/${toRent}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body:JSON.stringify({days:days})
        })

        const json=await response.json();
        if(json){
            alert("Booked successfully!")
        }else{
            alert("Booking unsuccessful!")
        }
    }
    catch(err){
        console.log(err)
    }finally{
        navigate("/")
        //console.log("Submitted")
    }
           
        }
    }



  return (
    <div className='container'> 
      <form className='container2' >
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email" style={{width:"30%"}} className="form-control" id="inputEmail3"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="days" className="col-sm-2 col-form-label">Number of days to rent (min:1, max:10)</label>
    <div className="col-sm-10">
      <input onChange={handleChange} type="number" min="1" max="10" className="form-control" style={{width:"17%",paddingLeft:"2%"}} name="days" id="days"/>
    </div>
  </div>
  <fieldset className="row mb-3">
    <legend className="col-form-label col-sm-2 pt-0">Agree to terms and conditions:</legend>
    <div className="col-sm-10">
    <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={function check(){return "checked"}} />
  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Agree</label>
</div>
      
    </div>
  </fieldset>
  
  <button onClick={submit} className="btn btn-primary">Confirm Purchase</button>
</form>
    </div>
  )
}
