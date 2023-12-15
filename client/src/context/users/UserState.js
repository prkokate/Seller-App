import UserContext from "./UserContext";
import { useState } from "react";

const UserState=(props)=>{


    const host="http://localhost:8000";
    const token=localStorage.getItem('token');
    const initcar=[]
    const [cars, setcars]=useState(initcar);
    const[loadings,setloadings]=useState(true);
    const[fav,setfav]=useState(false)
    const[favList,setfavList]=useState([])



    async function fetchAllCars () {
        try{
            const response = await fetch(`${host}/api/cars/all-cars`,{

                method:"GET",
                headers:{
                    'Content-Type':'application/json'
                }
            })

            const json=await response.json();
           // console.log(json)
            
            setcars(json);
            return json
    
        }catch(err){
            console.log("Error in Fetching Cars");

        }finally{
            setloadings(false);
        }
    }




    async function getFav(){
        try{
            const response=await fetch(`${host}/api/cars/getFavList`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':token
                }

               
            })
            const json=await response.json()
            setfavList(json);
            return json;
        }
        catch(err){
            console.error(err);

        }
    }

    const addFav=async(id)=>{
            try{
                const response=await fetch(`${host}/api/cars/add-favorite/${id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                         'auth-token':token
                    }
                })

                const json=await response.json();
                setfavList([...favList,id])
                //console.log(json)
                // setfav(json);

                if(!json){
                    alert("Car is already added to fav list")
                }

                
            }catch(err){
                console.log(err)
                alert("Car is already added to fav list")

            }
    }



    const removeFav=async(id)=>{
        try{
            const response=await fetch(`${host}/api/cars/remove-favorite/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                     'auth-token':token
                }
            })

            const json=await response.json();
            if(!json){
                alert("Car is already removed from to fav list")
            }
            else{

            
            const ind=favList.indexOf(id);

            if(ind>-1){
                favList.splice(ind,1);
            }
            setfavList(favList)
            //console.log(json)
            // setfav(json);

        }

            
        }catch(err){
            console.log(err)
            alert("Car is already added to fav list")

        }
}

    return (
      <UserContext.Provider value={{fetchAllCars,cars,loadings,fav,addFav,favList,setfavList,getFav,removeFav}} >
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState