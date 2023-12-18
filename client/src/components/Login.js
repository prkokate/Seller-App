import React, { useContext, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import person_icon from '../Assets/person.png';
import {
  Link
} from "react-router-dom";
import UserContext from '../context/users/UserContext';

const Login = () => {

    const [credentials,setcredentials]=useState({name:"",username:"",password:""});

    const[state, setState]= useState("SignUp");
    const navigate = useNavigate();
    const {login,getFav,setfavList,settoken}=useContext(UserContext);

    const handlechange=(e)=>{

      setcredentials({...credentials, [e.target.name]:e.target.value})
  }

    


    const signup= async (e)=>{
      e.preventDefault()
      const response=await fetch(`http://localhost:8000/api/auth/sign-up`,{
        method: 'POST',
        headers:{

            "Content-Type":"application/json"
        },
        body: JSON.stringify({name:credentials.name, username:credentials.username, password:credentials.password})
    })

    const json=await response.json();
    if(json.success){
        
        localStorage.setItem('token',json.Token)
        navigate("/");
        alert("Succesfully signed up!")
    }
    else{
        alert(json.error)
    }
    }

    const logins=async(e)=>{
      e.preventDefault()
      const response=await fetch(`http://localhost:8000/api/auth/login`,{
        method: 'POST',
        headers:{

            "Content-Type":"application/json"
        },
        body: JSON.stringify({name:credentials.name, username:credentials.username, password:credentials.password})
    })

    const json=await response.json();
    if(json.success){
        //settoken(json.Token);
        localStorage.setItem('token',json.Token)
        getFav(json.Token).then(array=>{
          console.log("In login : ",array);
          //setfavList(array);
        })
        navigate("/");
        alert("Logged in successfully!")
    }
    else{
        alert("Login failed!")
    }
    }
    
  


    
  return (
    <form onSubmit={state==="SignUp"?signup:logins} className='container3' >
        <div className='header'>
            <div className='text'>{state}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <img src={person_icon} alt="" />
                <input type="text" name='name' placeholder='Name' onChange={handlechange} />
            </div>
            <div className='input'>
                <img src={email_icon} alt="" />
                <input type="text" placeholder='Username' name='username' onChange={handlechange} />
            </div>
           
            <div className='input'>
                <img src={ password_icon} alt="" />
                <input type="password" placeholder='Password' name='password' onChange={handlechange} />
            </div>
            
  
        </div>
       <div className='forgot-password'>Forgot Password? <span>Click Here</span></div> 
          
           <button type='submit' className='submit form-sub' style={{cursor:"pointer"}}  >Submit</button> 
      <div className='submitContainer'>
        <div className = {state==="Login"?"submit gray":"submit"} onClick={()=>{setState("SignUp")}}>SignUp</div>
        <div className = {state==="SignUp"?"submit gray":"submit" } onClick={()=>{setState("Login")}}>Login</div>
      </div>
    </form>
  )
}

export default Login