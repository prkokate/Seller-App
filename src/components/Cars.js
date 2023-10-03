//require("dotenv").config();
import React, { useState,useEffect } from 'react'
import './Cars.css'
import Caritem from './Caritem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import './Caritem.css'
import carinfo from '../carinfo.json'
import {
   Link
  } from 'react-router-dom';
  




export default function Cars(props) {
    const {pg,srctext}=props;
    // useEffect(()=>{
    //     console.log(srctext);
    //   },[srctext])
    const [page, setpage] = useState(1);
    const [pointer,setptr] = useState(0);
    const [loading, setloading] = useState(false);
    const[carsAr,setCarsAr] = useState(carinfo.slice(pointer,pointer+6));

    useEffect(()=>{
        setCarsAr(carinfo.slice(pointer,pointer+6));
        
    } ,[pointer] );

    const handleNext=()=>{
        if(pointer>=60){
            setpage(1);
            setptr(0);
        }
        else{

            setpage(page+1);
            setptr(pointer+6);
            // pg(page+1);
        }
        setloading(true);
        //setCarsAr(carinfo.slice(pointer,pointer+6));
       //setloading(false);

        

    }

    const handlePrev= ()=>{
        if(pointer<=0){
            setptr(0);
            setpage(1);
        }
        else{

            setpage(page-1);
            setptr(pointer-6);
            // pg(page-1);
        }
        setloading(true);
        //setCarsAr(carinfo.slice(pointer,pointer+6));
       //setloading(false);


}

const Navtopage=(pge)=>{
    setpage(pge);
 
    setptr((pge-1)*6);

    setloading(true);
}




  

  return (
   

        <>

        <div className="my-3">
            
        <div className="row">
    
            {
                srctext===''
                ? carsAr.map(cars =>{
                return <div key={cars.id} className="col-md-4 my-3">
                    <Caritem key={cars.id} carname={cars.brand} year={cars.year} price={cars.price} gear={cars.gear} typee={cars.type} people={cars.passenger} />
                </div>
                 })
                : carinfo.filter((car)=>{
                    return srctext.toLowerCase()===''
                    ? car
                    :car.brand.toLowerCase().includes(srctext.toLowerCase());                 
                }).map(cars =>{
                    return <div key={cars.id} className="col-md-4 my-3">
                        <Caritem key={cars.id} carname={cars.brand} year={cars.year} price={cars.price} gear={cars.gear} typee={cars.type} />
                    </div>
                })
            }
           
        </div>
        </div>

    
        <div className="nav"> 
        <b>{page} of 10</b> 
         <div className="nav-in"> 
        {page>1?<Link to={`/${page-1}`} onClick={handlePrev} className="arrows navigator">&larr;</Link>:<button  disabled={true} onClick={handleNext} className="arrows navigator">&larr;</button>}
         <Link to={`/${page}`} onClick={()=>{Navtopage(page)}} className="arrows">{page}</Link>
         <Link to={`/${page+1<=10?page+1:page-10+1}`} onClick={()=>{Navtopage(page+1<=10?page+1:page-10+1)}} className="arrows">{page+1<=10?page+1:page-10+1}</Link>
         <Link to={`/${page+2<=10?page+2:page-10+2}`} onClick={()=>{Navtopage(page+2<=10?page+2:page-10+2)}} className="arrows">{page+2<=10?page+2:page-10+2}</Link>
         <Link to={`/${page+3<=10?page+3:page-10+3}`} onClick={()=>{Navtopage(page+3<=10?page+3:page-10+3)}} className="arrows">{page+3<=10?page+3:page-10+3}</Link>
         <Link to={`/${page+4<10?page+4:page-10+4}`} onClick={()=>{Navtopage(page+4<10?page+4:page-10+4)}} className="arrows">...</Link>
         {page<10?<Link to={`/${page+1}`} disabled={(page===10)} onClick={handleNext} className="arrows navigator">&rarr;</Link>:<button  disabled={true} onClick={handleNext} className="arrows navigator">&rarr;</button>}
         </div> 
         </div>
 
        </>

    
  )
}
