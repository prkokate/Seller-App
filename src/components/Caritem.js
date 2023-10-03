import React, { useState } from 'react'
import './Caritem.css'




export default function Caritem(props) {
    let {carname,year,price}=props;
    const [like,setlike]=useState(false);
    const toggleLike=()=>{
        if(like===true){
            setlike(false);
           
        }
        else{
            setlike(true);
        }
    }
  return (
    <div className="card" style={{width: "25rem"}}>
  <img src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Harrier/9850/1681887437871/front-left-side-47.jpg?tr=w-420" className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className='title' ><h5 className="card-title">{carname}</h5> <div className="year">{year}</div> </span>
    <div className="mid"><div className="mid-inner"><i className="fa-solid fa-users"></i><p className="card-txt">4-people</p></div><div className="mid-inner"><i className="fa-solid fa-users"></i><p className="card-txt">Gasoline</p></div></div> 
    <div className="foot"> <div className="price"> <b style={{fontSize:"24px"}} >{price}$</b>/ month</div> <div className="right"><div className="like" onClick={toggleLike}>{like?<i className="fa-solid fa-heart" style={{color: "#37c0d2"}} ></i>:<i className="fa-regular fa-heart" style={{color: "#37c0d2"}}></i>}</div><a href="#" className="btn btn-primary">Rent Now</a></div></div>
    
  </div>
</div>
  )
}
