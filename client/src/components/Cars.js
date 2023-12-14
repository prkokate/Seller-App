
import React, { useState,useEffect, useContext } from 'react'
import './Cars.css'
import Caritem from './Caritem';
import './Caritem.css'
// import carinfo from '../carinfo.json'
import UserContext from '../context/users/UserContext';
import {
   Link
  } from 'react-router-dom';
  




export default function Cars(props) {
    const {pg,srctext}=props;
    //loadings imported for implementation of spinner
    const {fetchAllCars,cars,loadings}=useContext(UserContext);
    const [page, setpage] = useState(1);
    const [pointer,setptr] = useState(0);
    const [loading, setloading] = useState(false);
    const[carsAr,setCarsAr] = useState(cars.slice(pointer,pointer+6));
    const [totalpgs,settotalpgs]=useState(1)

    
    useEffect(()=>{
        fetchAllCars();
 
       settotalpgs(Math.floor(cars.length/6)+cars.length%6)
        setCarsAr(cars.slice(pointer,pointer+6));

    },[fetchAllCars])
    useEffect(()=>{

        setCarsAr(cars.slice(pointer,pointer+6));
        
    } ,[pointer]);

    const handleNext=()=>{
        if(pointer>=cars.length){
            setpage(1);
            pg(1)
            setptr(0);
        }
        else{

            setpage(page+1);
            pg(page+1)
            setptr(pointer+6);

        }
        setloading(true);


        

    }

    const handlePrev= ()=>{
        if(pointer<=0){
            setptr(0);
            pg(1);
            setpage(1);
        }
        else{

            setpage(page-1);
            pg(page-1)
            setptr(pointer-6);
        
        }
        setloading(true);
        //setCarsAr(carinfo.slice(pointer,pointer+6));
       //setloading(false);


}

const Navtopage=(pge)=>{
    setpage(pge);
 
    setptr((pge-1)*6);

    setloading(true);
    pg(pge)
}




  

  return (
   

        <>

        <div className="my-3">
            
        <div className="row">
    
            {
                srctext===''
                ? carsAr.map(cars =>{
                return <div key={cars.id} className="col-md-4 my-3">
                    <Caritem key={cars.id} img={cars.image} carname={cars.brand} year={cars.year} price={cars.price} gear={cars.gear} typee={cars.type} people={cars.passenger} />
                </div>
                 })
                : cars.filter((car)=>{
                    return srctext.toLowerCase()===''
                    ? car
                    :car.brand.toLowerCase().includes(srctext.toLowerCase());                 
                }).map(cars =>{
                    return <div key={cars.id} className="col-md-4 my-3">
                        <Caritem key={cars.id} img={cars.image} carname={cars.brand} year={cars.year} price={cars.price} gear={cars.gear} typee={cars.type} />
                    </div>
                })
            }
           
        </div>
        </div>

    
        <div className="nav"> 
        <b>{page} of {totalpgs}</b> 
         <div className="nav-in"> 
        {page>1?<Link to={`/${page-1}`} onClick={handlePrev} className="arrows navigator">&larr;</Link>:<button  disabled={true} onClick={handleNext} className="arrows navigator">&larr;</button>}
         <Link to={`/${page}`} onClick={()=>{Navtopage(page)}} className="arrows">{page}</Link>
         <Link to={`/${page+1<=totalpgs?page+1:page-totalpgs+1}`} onClick={()=>{Navtopage(page+1<=totalpgs?page+1:page-totalpgs+1)}} className="arrows">{page+1<=totalpgs?page+1:page-totalpgs+1}</Link>
         <Link to={`/${page+2<=totalpgs?page+2:page-totalpgs+2}`} onClick={()=>{Navtopage(page+2<=totalpgs?page+2:page-totalpgs+2)}} className="arrows">{page+2<=totalpgs?page+2:page-totalpgs+2}</Link>
         <Link to={`/${page+3<=totalpgs?page+3:page-totalpgs+3}`} onClick={()=>{Navtopage(page+3<=totalpgs?page+3:page-totalpgs+3)}} className="arrows">{page+3<=totalpgs?page+3:page-totalpgs+3}</Link>
         <Link to={`/${page+4<totalpgs?page+4:page-totalpgs+4}`} onClick={()=>{Navtopage(page+4<totalpgs?page+4:page-totalpgs+4)}} className="arrows">...</Link>
         {page<totalpgs?<Link to={`/${page+1}`} disabled={(page===totalpgs)} onClick={handleNext} className="arrows navigator">&rarr;</Link>:<button  disabled={true} onClick={handleNext} className="arrows navigator">&rarr;</button>}
         </div> 
         </div>
 
        </>

    
  )
}
