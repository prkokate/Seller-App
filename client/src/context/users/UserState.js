import UserContext from "./UserContext";
import { useState } from "react";

const UserState=(props)=>{


    const host="http://localhost:8000";
    const token=localStorage.getItem('token');
    const initcar=[]
    const [cars, setcars]=useState(initcar);
    const[loadings,setloadings]=useState(true);

    const fetchAllCars=async()=>{
        try{
            const response = await fetch(`${host}/api/cars/all-cars`,{

                method:"GET",
                headers:{
                    'Content-Type':'application/json'
                }
            })

            const json=await response.json();
            
            setcars(json);
           // console.log("json=",json)
    
        }catch(err){
            console.log("Error in Fetching Cars");

        }finally{
            setloadings(false);
        }
    }

    return (
      <UserContext.Provider value={{fetchAllCars,cars,loadings}} >
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState