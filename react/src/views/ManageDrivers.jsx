import { useState,useEffect } from "react";
import { Link} from "react-router-dom";
import axiosClient from "../axios-client";
import moment from 'moment';

function ManageDrivers( ){

  const currentDate = new Date();

      const [drivers,setDrivers ]=useState([]);
      const [loading,setLoading] = useState(false);
      const dateTimenow = moment(currentDate).format('YYYY-MM-DD');


      const onDeleteClick = (id)=>{
        console.log(id)
         if(!window.confirm('Are you sure you want to delete?')){
          return
        } 
         axiosClient.delete(`/drivers/${id}`).then(()=>{
         
          
          getDrivers();
        }) 
      
      }
     
    
    const getDrivers = async () => {
      setLoading(true);
    
      try {
        const { data } = await axiosClient.get('/drivers');
        setLoading(false);
        setDrivers(data.data);
       
      } catch (error) {
        setLoading(false);
     
        // Handle the error if needed
      }
    };
   



 useEffect(()=>{
  getDrivers();

},[]) 
 
const [searchQuery, setSearchQuery] = useState(""); 

const filteredDrivers = drivers.filter((driver) => {
  const searchString = searchQuery.toLowerCase();
  return Object.values(driver).some((value) => {
    // Check if the value is not null before calling toString
    if (value !== null && value !== undefined) {
      return value.toString().toLowerCase().includes(searchString);
    }
    return false;
  });
});

    return(
<>















<div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-sm-5">
            <div className="row">
  <ul className="topbar-menu d-flex align-items-center gap-3">
    <li className="d-sm-inline-block">
    <Link type="button" className="btn btn-warning btn-sm rounded-pill mb-2 me-5" to = '/dashboard'>
                 <small>back</small>
                </Link>
    </li>
    <li className="d-sm-inline-block">
     
    <button type="button" className="btn btn-success btn-sm rounded-pill mb-2 me-1"  onClick={getDrivers}>
                 <small>refresh</small>
                </button>
    </li>
    <li className="d-sm-inline-block" >

    <input
  type="text"
  className="form-control form-control-sm"
  placeholder="search"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/> 
    </li>

  
    
  </ul>
  
</div>
    
            </div>
            <div className="col-sm-7">
  
              <div className="text-sm-end">
              
              <Link type="button" className="btn btn-danger rounded-pill mb-2 me-1"   to = '/drivers/new'>
              <small>Add Driver</small>
                </Link>
              
               {/*  <button type="button" className="btn btn-light mb-2 me-1">
                  Import
                </button>
                <button type="button" className="btn btn-light mb-2">
                  Export
                </button> */}
                <Link  className="btn rounded-pill mb-2"  to = '/deleteddrivers'>   <small>Deleted Drivers </small></Link>
                
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
           <th >Dimensions</th>
           <th >Payload</th>
           <th >Phone</th>
           <th >Location</th>
           <th >Zip</th>
           <th >Insurance Date</th>
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
        {filteredDrivers.map((item) => {
        
          
    return (

        
        <tr  key={item.id}  >
          
            <td >{item.unit}</td>
            <td >{item.name}</td>
            <td >{ item.dimensions }</td>
            <td>{item.payload}</td>
            <td ><a href={"tel:"+item.phone}>{item.phone}</a></td>
            <td>{item.location}</td>
            <td>{item.zip}</td>

            
            <td className={`${dateTimenow > item.insurensexp ? 'alert alert-danger bg-danger' : ''}`}>
              { moment(item.insurensexp).format('MM/DD/YYYY')} 
              </td>  
            <td>{item.comments}</td>
            <td >{item.email}</td>
            <td >{item.emergency}</td>
            <td className="table-action" >
             
           
        
          
          <Link  className="action-icon"  to={'/drivers/'+item.id} ><i className="mdi mdi-square-edit-outline" /></Link>
          
          <button  className="action-icon btn" onClick={ev => onDeleteClick(item.id)}><i className="mdi mdi-delete" /></button>
       


              
               
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


export default ManageDrivers;