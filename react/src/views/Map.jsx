import Mappro from "./MapProvider";
import { useState,useEffect } from "react";
import axiosClient from "../axios-client";

function Map( ){


  const [locations,setLocations ]=useState([]);
  const [loading,setLoading] = useState(false);



 

 const getDrivers = async () => {
  setLoading(true);

  try {
    const { data } = await axiosClient.get('/map');
     
   // setLoading(false);
    // console.log(data);
    setLocations(data.data);
  } catch (error) {
    setLoading(false);
  //  console.log(data);
    // Handle the error if needed
  }
};
 const [errors, setErrors] = useState();



useEffect(()=>{
getDrivers();

},[]) 
 

//console.log(locations);

    
    return(
 <>

    
  
      <Mappro locations={locations} />
   

 </>

    )
};


export default Map;