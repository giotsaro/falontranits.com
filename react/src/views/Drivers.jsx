import { useState,useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

import "react-datepicker/dist/react-datepicker.css";

function Drivers( ){

  const [usertype, _setUsertype] = useState(localStorage.getItem('Role')); 
  const [driver,setDriver] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); 

  const [location, setLocation] = useState();

  const onEdit = async (id)=>{
    try {
       await axiosClient.get(`/editdrivers/${id}`).then(({ data }) => {

        setDriver(data);
    
     
        }) 
    } catch (error) {
      console.log(error);
   
    }
  }

      const [driverss,setDrivers ]=useState([]);
      const [loading,setLoading] = useState(false);



     
    
    const getDrivers = async () => {
      setLoading(true);
   
        try {
          const { data } = await axiosClient.post('/getdrivers',zipdata);
          setLoading(false);
          setDrivers(data.data);
          if(data.location){
           setLocation(data.location);
          } else{
            setLocation('');
          }
        }
        catch (error) {
          setLoading(false);
       
          
        }
 
       }
    


    const [zipdata, setzipdata] = useState( {

      zipcode: '',
      range: '',
     
    })
    

     const [errors, setErrors] = useState();



 useEffect(()=>{
  getDrivers();

},[]) 


const currentDate = new Date();

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false, // 24-hour format
};


const dateTimenow = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');




function copy(text){
  navigator.clipboard.writeText(text)
}
const [message,setMessage] = useState();






const onSaveEdit = async (ev) => {
  ev.preventDefault();
  console.log(driver);
   if (driver) {
    try {
      await axiosClient.put(`/editdrivers/${driver.id}`, driver); 
      // setNotification('User was successfully updated');
      getDrivers();
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
        //console.log();
      } else {
        console.error('Error updating driver:', err);
      }
    }
  } 
}



const onBusy = async (id) => {
  const idObject = { id: id };



   try {
    const { data } = await axiosClient.post(`/reservation`, idObject);
    
    getDrivers();
  
  } catch (error) {
    console.log(error); 
   
  }  
};



const filteredDrivers = driverss.filter((driver) => {
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



  <div id="edit-modal" className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="edit-modal" aria-hidden="true" aria-label="Edit Driver Information">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">{driver.name}</h4> 
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-hidden="true" />
            </div>
            <div className="modal-body">
            <div>{errors &&
                <span className="badge bg-danger">
                        {Object.keys(errors).map(key => (
                          <small key={key}>{errors[key][0]}</small>
                        ))}
                      </span>}</div> 
                <div>
                    {/* ... other content ... */}

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <small>
                  <label htmlFor="phoneInput">Phone</label>
                </small>
                                <p className="text-primary">
                                    <small>{driver.phone}</small>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <small>
                  <label htmlFor="locationInput">Location</label>
                </small>
                                <p className="text-success">
                                    <small>{driver.location}</small>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="zipInput" className="form-label">
                                    ZIP Code
                                </label>
                                <input type="text" className="form-control" id="zipInput" value={driver.zip} onChange={ev=> setDriver({...driver, zip: ev.target.value}) } />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="dateInput" className="form-label">
                                    Date
                                </label>
                                <input type="datetime-local" className="form-control" id="dateInput" value={driver.date} onChange={ev=> setDriver({...driver, date: ev.target.value})} />
                            </div>
                        </div>
                        <div className="col-md-12">
                        <label htmlFor="comment" className="form-label" >comment</label>
                            <div>
                                <input type="text" className="form-control" id="comment" placeholder="comment" value={driver.comments} onChange={ev=> setDriver({...driver, comments: ev.target.value})}  />
                            </div>
                        </div>



                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                    Close
                </button>
                <button type="button" className="btn btn-primary" onClick={onSaveEdit}>
                    Save changes
                </button>
            </div>
        </div>
      
    </div>
  
</div>

 

 



<div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-body ">
        <div className="container text-center">
  <div className="row">
    <ul className="topbar-menu d-flex align-items-center gap-3">
      <li className="d-sm-inline-block">
        <div className="d-flex">
          <div className="me-2">
            <span >{location}</span>
          </div>



          <div className="me-2">
            <input
              type="text"
              className="form-control form-control-sm"
              id="location"
              placeholder="zip code"
              value={zipdata.zipcode}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, '');
                const truncatedValue = numericValue.slice(0, 5);
                setzipdata((zipdata) => ({
                  ...zipdata,
                  zipcode: truncatedValue,
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter'&&zipdata.zipcode.length === 5) {
                  getDrivers();
                }
              }}


            />
          </div>


          <div>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="range"
              value={zipdata.range}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, '');
                const truncatedValue = numericValue.slice(0, 5);
                setzipdata((zipdata) => ({
                  ...zipdata,
                  range: truncatedValue,
                }));
              }}
            />
          </div>


        </div>
      </li>

      
      <li className="d-sm-inline-block">
  <button
    className="btn btn-primary btn-sm"
    disabled={zipdata.zipcode.length !== 5}
    onClick={getDrivers}> distance
  </button>
</li>

      <li className="d-sm-inline-block">
        <button
          className="btn btn-success btn-sm"
          type="button"
          onClick={getDrivers}
          
        >
          <i className="ri-refresh-line" />
        </button>
      </li>
      <li className="d-sm-inline-block">
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





           <br />
          <div className="table-responsive">
 
         <div    style={{overflowX: "auto"}}   >
        <table id="fixed-columns-datatable"   className="table table-hover  font-13 table-centered w-100 nowrap" > 
        <thead   className="table-light"   >
            <tr>
           <th >ID</th>
           <th >Units</th>
           <th >Name</th>
           <th >Dimensions</th>
           <th >Payload</th>
           <th >Phone</th>
           <th >Location</th>
           <th >Zip Code</th>
           <th >Busy until </th>
           <th >Comments</th>
           <th >E-mail</th>
           <th >Emergency</th>
           <th >Distance</th>
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
        
        {  filteredDrivers.map((item) => {
        
          
    return (

     
      
      
        <tr  role="alert"  key={item.id}  className={`${
          dateTimenow < item.date ? 'alert alert-danger ' : ''
        }${
          item.reserved ? 'alert alert-warning ' : ''
        }${
          !(dateTimenow < item.date || item.reserved) ? 'alert alert-success ' : ''
        }`} > 
      
           <td>{item.id}</td>
            <td >{item.unit}</td>
            <td >{item.name}</td>
            <td >{ item.dimensions }</td>
            <td>{item.payload}</td>
            <td ><a href={"tel:"+item.phone}>{item.phone}</a></td>
            <td >{item.location}</td>
            <td onClick={() => copy(item.zip)}>{item.zip}</td>
            <td> { moment(item.date).format('MM/DD/YYYY h:m A')}
            
              </td>  
            <td>{item.comments}</td>
            <td>{item.email}</td>
            <td>{item.emergency}</td>
            <td>{item.distance}</td>
            <td className="table-action" >
             
           
        
    
          <div className="action-icon"  data-bs-toggle="modal"
        data-bs-target="#edit-modal" onClick={ev => {onEdit(item.id);setErrors('')}} > <i className="mdi mdi-square-edit-outline"  /></div>
          {/* <div className="action-icon" onClick={() => onBusy(setReservid=item.id) }  > <i className=" uil-clock-three" /></div> */}
          <div className="action-icon" onClick={() => {  onBusy(item.id); }}> <i className="uil-clock-three" /></div>

           <div><small>{item.reserved_by}</small></div> 


 
              
               
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


export default Drivers;