import React, { useContext, useEffect, useState } from 'react'
import './Caritem.css'
import UserContext from '../context/users/UserContext';
import {Link, useNavigate} from 'react-router-dom'




export default function Caritem(props) {
    let { carname, year, price, gear,typee,people,img,liked} = props;
    const {addFav,favList,setfavList,removeFav,settoRent}=useContext(UserContext)
    const navigate=useNavigate()
    const [tokenn,settokenn]=useState(localStorage.getItem('token'))
    
    useEffect(()=>{
        settokenn(localStorage.getItem('token'))
            // if(tokenn)
            // {console.log(tokenn)}
    },[])

   
    const [like, setlike] = useState(liked);
  
    const toggleLike = () => {
        if(!tokenn){
            console.log(tokenn)
            navigate("/Sign-up")
        }
        else{
        if(like){
            removeFav(props.myid)
            const ind=favList.indexOf(props.myid);

            if(ind>-1){
                favList.splice(ind,1);
            }
            setlike(false)
        }
        else{

            addFav(props.myid)
            setlike(true)
            //setfavList([...favList,props.myid])
        }
    }
            //setlike(!like);
            //console.log(fav)
        
        // console.log(props.myid)
    }

    const rentNow=()=>{
        console.log("rented in caritem=",props.myid)
        settoRent(props.myid)
        navigate("/Rent-car")
    }

    

    let imgdef="https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Harrier/9850/1681887437871/front-left-side-47.jpg?tr=w-420";
    return (
        <div className="card" style={{ width: "22rem" }}>
            <img src={img?img:imgdef} className="card-img-top" alt="..." />
            <div className="card-body">
                <span className='title' ><h5 className="card-title">{carname}</h5> <div className="year">{year}</div> </span>
                <div className="mid">
                    <div className="mid-inner">
                        <i className="fa-solid fa-users" style={{ color: "#37c0d2" }}></i><p className="card-txt">{people}-people</p>
                    </div>
                    <div className="mid-inner">
                    <i className="fa-solid fa-gas-pump" style={{ color: "#37c0d2" }}></i><p className="card-txt">{typee}</p>
                    </div>
                </div>
                <div className="mid">
                    <div className="mid-inner">
                        <i className="fa-solid fa-gauge" style={{ color: "#37c0d2" }}></i><p className="card-txt">61km/L</p>
                    </div>
                    <div className="mid-inner">
                    <i className="fa-solid fa-gear" style={{ color: "#37c0d2" }}></i><p className="card-txt">{gear}</p>
                    </div>
                </div>

            </div>
        <div className="foot"> <div className="price"> <b style={{ fontSize: "24px" }} >{price}$</b>/ day</div> <div className="right"><div className="like" onClick={toggleLike}>{like ? <i className="fa-solid fa-heart" style={{ color: "#37c0d2" }} ></i> : <i className="fa-regular fa-heart" style={{ color: "#37c0d2" }}></i>}</div>
        <button onClick={rentNow} className="btn btn-primary">Rent Now</button></div></div>
        </div>
    )
}
