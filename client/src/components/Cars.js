
import React, { useState,useEffect, useContext,useCallback } from 'react'
import './Cars.css'
import Caritem from './Caritem';
import './Caritem.css'
// import carinfo from '../carinfo.json'
import UserContext from '../context/users/UserContext';
import {
   Link
  } from 'react-router-dom';
  




export default function Cars(props) {
    const {pg,srctext,favorite}=props;
    //loadings imported for implementation of spinner
    const {fetchAllCars,cars,loadings,favList,setfavList,getFav,makeAvailable}=useContext(UserContext);
    const [page, setpage] = useState(1);
    const [pointer,setptr] = useState(0);
    const [loading, setloading] = useState(false);
    const[carsAr,setCarsAr] = useState(cars.slice(pointer,pointer+6));
    const [totalpgs,settotalpgs]=useState(1)


    
    useEffect(()=>{
   
        fetchAllCars().then(array=>{
            //console.log(array)
            setCarsAr(array.slice(pointer,pointer+6))
            settotalpgs(Math.floor(array.length/6)+array.length%6)
        })

        getFav().then(array=>{
            //console.log(array)
            setfavList(array)
        })

        makeAvailable();
        
        // console.log("favorite=",favorite)
        
      

    },[])

    useEffect(()=>{

        setCarsAr(cars.slice(pointer,pointer+6));
        
    } ,[pointer]);

  

    function isLiked(id){     
        
        if(favList.includes(id)){
            return true
        }
        return false
    }

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

            srctext!==''? cars.filter((car)=>{
            return srctext.toLowerCase()===''
            ? car
            :car.brand.toLowerCase().includes(srctext.toLowerCase());                 
            }).map(cars =>{
                return <div key={cars.id} className="col-md-4 my-3">
                    <Caritem key={cars.id} img={cars.image} carname={cars.brand} year={cars.year} price={cars.price} gear={cars.gear} typee={cars.type} liked={isLiked(cars._id)} />
                </div>
            })
            : favorite===true? cars.filter((car)=>{
                    return favList.includes(car._id);
                }).map((carfav)=>{
                    return <div key={carfav.id} className="col-md-4 my-3">
                    <Caritem key={carfav.id} myid={carfav._id} img={carfav.image} carname={carfav.brand} year={carfav.year} price={carfav.price} gear={carfav.gear} typee={carfav.type} people={carfav.passenger} liked={isLiked(carfav._id)} />
                </div>
                }) 
                :carsAr.map((cars) =>{
                return <div key={cars.id} className="col-md-4 my-3">
                    <Caritem key={cars.id} myid={cars._id} img={cars.image} carname={cars.brand} year={cars.year} price={cars.price} gear={cars.gear} typee={cars.type} people={cars.passenger} liked={isLiked(cars._id)} />
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
