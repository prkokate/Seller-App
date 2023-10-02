//require("dotenv").config();
import React, { useState,useEffect } from 'react'
import './Cars.css'
import Caritem from './Caritem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import './Caritem.css'
import carinfo from '../carinfo.json'




export default function Cars() {
    const [page, setpage] = useState(1);
    const [pointer,setptr] = useState(0);
    const [loading, setloading] = useState(false);
    const[carsAr,setCarsAr] = useState(carinfo.slice(pointer,pointer+6));

    useEffect(()=>{
        setCarsAr(carinfo.slice(pointer,pointer+6));
    } ,[pointer] );

    const handleNext=()=>{
        if(pointer>=30){
            setpage(1);
            setptr(0);
        }
        else{

            setpage(page+1);
            setptr(pointer+6);
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
        }
        setloading(true);
        //setCarsAr(carinfo.slice(pointer,pointer+6));
       //setloading(false);


}

  

  return (
   

        <>

        <div className="my-4">
            
        <div className="row">
    
            {
                carsAr.map(cars =>{
                return <div className="col-md-4 my-3">
                    <Caritem carname={cars.brand} year={cars.year} price={cars.price} />
                </div>
                  
                })
            }
           
        </div>
        </div>

    
        <div className="nav"> <b>{page} of 10</b>  <div className="nav-in"> <button disabled={(page===1)}  onClick={handlePrev} className="arrows navigator">&larr;</button><div className="arrows">1</div><div className="arrows">2</div><div className="arrows">3</div><div className="arrows">4</div><button disabled={(page===6)} onClick={handleNext} className="arrows navigator">&rarr;</button> </div> </div>
 
        </>

    
  )
}
