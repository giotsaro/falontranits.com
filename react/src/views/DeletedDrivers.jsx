import { useState,useEffect } from "react";
import { NavLink ,Link,useNavigate} from "react-router-dom";
import axiosClient from "../axios-client";


function DeletedDrivers( ){

      const [drivers,setDrivers ]=useState([]);
      const [loading,setLoading] = useState(false);

      const onDeleteClick = (id)=>{
        console.log(id)
         if(!window.confirm('Are you sure you want to delete?')){
          return
        } 
         axiosClient.delete(`/removeddrivers/${id}`).then(()=>{
         
          
          getDrivers();
        }) 
      
      }
     
    

      const restore = async (id) => {

        const idObject = { id: id };
         try {
          const { data } = await axiosClient.put(`/removeddrivers/${idObject.id}`,idObject);
          // Sending a POST request to the /reservation endpoint with the reservid in the request body
          getDrivers();
          // getDrivers(); // If you need to update drivers after this operation
        } catch (error) {
          console.log(error); // Logging any errors that occur during the POST request
          // Handle the error if needed
        }  
      };



    const getDrivers = async () => {
      setLoading(true);
    
      try {
        const { data } = await axiosClient.get('/removeddrivers');
        // console.log(data);
        setLoading(false);
        // console.log(data);
        setDrivers(data.data);
      } catch (error) {
        setLoading(false);
      //  console.log(data);
        // Handle the error if needed
      }
    };


 useEffect(()=>{
  getDrivers();

},[]) 


  

    return(
<>


<div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-sm-5">
            <li className="d-sm-inline-block">
    
        <Link
          className="btn btn-warning rounded-pill btn-sm"
        
          type="submit"
          to = '/managedrivers'><i className="ri-arrow-left-line "/> Back  
       
         
        </Link>
      
    </li>
            </div>
            <div className="col-sm-7">
              <div className="text-sm-end">
              <button type="button" className="btn btn-success rounded-pill mb-2 me-1"  onClick={getDrivers}>refresh</button>
    
              </div>
            </div>
            {/* end col*/}
          </div>
          <div className="table-responsive">
 
         <div    style={{overflowX: "auto"}}   >
        <table id="fixed-columns-datatable"   className="table table-hover  font-13 table-centered w-100 nowrap" > 
        <thead   className="table-light"   >
            <tr>
           {/* <th >ID</th> */}
           <th >Units</th>
           <th >Name</th>
           <th >Dims</th>
           <th >Payload</th>
           <th >Phone</th>
           <th >Location</th>
           <th >Zip</th>
           <th >Date</th>
           <th >Comments</th>
           <th   >E-mail</th>
           <th >Emergency</th>
           <th >Action</th>
            </tr>
        </thead>
        {loading &&
            <tbody>
            <tr>
              <td colSpan="13" className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
              </td>
            </tr>
            </tbody>
          }

{!loading &&
        <tbody >
        {drivers.map((item) => {
        
          
    return (

        
        <tr  role="alert"  key={item.Id}  className= {item.reserved ? 'alert alert-warning ' : ''} >
           {/*  <td >{item.id}</td> */}
            <td >{item.unit}</td>
            <td >{item.name}</td>
            <td >{ item.dims }</td>
            <td>{item.payload}</td>
            <td ><a href={"tel:"+item.phone}>{item.phone}</a></td>
            <td>{item.location}</td>
            <td>{item.zip}</td>
            <td >{item.updated_at}</td>  
            <td>{item.comments}</td>
            <td >{item.email}</td>
            <td >{item.emergency}</td>
            <td className="table-action" >
       
          <button  className="btn btn-success" onClick={ev => restore(item.id)}>restore</button>
         
         
               </td>
               
        </tr>
    )
})}
        </tbody>
}
    </table>
    </div>
    </div>
      </div>
      </div>
    </div>
  </div>







 
 </>

    )
};


export default DeletedDrivers;