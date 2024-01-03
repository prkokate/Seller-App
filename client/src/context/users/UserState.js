import UserContext from "./UserContext";
import { useEffect, useState } from "react";

const UserState=(props)=>{


    const host="https://seller-app-server.vercel.app";
    const [token,settoken]= useState(localStorage.getItem('token')) ;
    const initcar=[]
    const [cars, setcars]=useState(initcar);
    const[loadings,setloadings]=useState(true);
    const[fav,setfav]=useState(false)
    const[favList,setfavList]=useState([])
    const [toRent,settoRent]=useState(null);
    const [mysale,setmysale]=useState([]);

   useEffect(()=>{
    settoken(localStorage.getItem('token'));
   })

    async function fetchAllCars () {
        try{
            const response = await fetch(`${host}/api/cars/all-cars`,{

                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': 'https://seller-app-server.vercel.app',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // If needed
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type', // If needed
                    'Access-Control-Allow-Credentials': true // If needed
                }
            })

            const json=await response.json();
           console.log(json)
            
            setcars(json);
            return json
    
        }catch(err){
            console.log("Error in Fetching Cars");

        }
        // finally{
        //     setloadings(false);
        // }
    }




    async function getFav(tok){
        //console.log(localStorage.getItem('token'))
        try{

            const response=await fetch(`${host}/api/cars/getFavList`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':tok
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



// async function rentCar(id){
//         try{
//             const response=await fetch(`${host}/api/cars/rent-car/${id}`,{
//                 method:"POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "auth-token": token
//                 },
//                 body:JSON.stringify({days:toRent})
//             })

//             const json=await response.json();
//             // if(json){
//             //     settoRent(id)
//             // }
//             return json

//         }
//         catch(err){
//             console.log(err)
//         }
//}



const makeAvailable=async()=>{
    const response=await fetch(`${host}/api/cars/make-available`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            'auth-token':token,
            'Access-Control-Allow-Origin': 'https://seller-app-server.vercel.app',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // If needed
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type', // If needed
            'Access-Control-Allow-Credentials': true // If needed
        }
    })

    const json=await response.json()
    //console.log(json)
}


const listCar=async({brand,year,price,passenger,type,gear,image})=>{
    console.log(brand)
    const response=await fetch(`${host}/api/cars/list-car`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "auth-token":token
        },
        body:JSON.stringify({brand:brand,year:year,price:price,passenger:passenger,type:type,gear:gear,image:image})
    })

    const json=await response.json()
    setmysale(json)

}


const login=async({name,username,password})=>{
    const response=await fetch(`${host}/api/auth/login`,{
        method: 'POST',
        headers:{

            "Content-Type":"application/json"
        },
        body: JSON.stringify({ name:name, username:username, password:password})
    })

    const json=await response.json();
    if(json.success){
        //console.log(json.Token)
        settoken(json.Token);
        localStorage.setItem('token',json.Token)
        alert("Logged in successfully!")
    }
    else{
        alert("Login failed!")
    }
}

    return (
      <UserContext.Provider value={{setloadings,login,fetchAllCars,cars,loadings,fav,addFav,favList,setfavList,getFav,removeFav,settoRent,toRent,host,makeAvailable,listCar,mysale,settoken}} >
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState