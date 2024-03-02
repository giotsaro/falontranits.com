import {Link,useNavigate, useParams} from "react-router-dom";
import { useEffect ,useState } from "react";
import axiosClient from "../axios-client";




function ZipForm( ){




    const navigate = useNavigate();
    let {_zip_code} = useParams();


    const [zip, setZip] = useState({
        id: '',
        city: '',
        county: '',
        state_name: '', // Corrected state name attribute
        state_id: '',   // Corrected state id attribute
        zip_code: '',
        LAT: '',
        LNG: ''
    
    });
    
const [loading ,setLoading] = useState(false);
const [errors, setErrors] = useState(null);




    const onSubmit = ev => {
        ev.preventDefault();
        {
            axiosClient.post('/zips', zip)
              .then(() => {
                setNotification('zip was successfully created')
                navigate("/zipcodes");
              })
              .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors)
                }
              })
          }

    }


    return(

 
 <>

 
 { <h3>Add Zip</h3>}



 <div className="row">
  <div className="col-12">
    <div className="card">
      <div className="card-body">

      {loading && (
          <div className="text-center">
           <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}
<div className="col-lg-12">
{errors &&
          <div className="alert alert-danger">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }


      

      {!loading && (
     <form onSubmit={onSubmit}>


<div className="row g-2">

    <div className="mb-3 col-md-4">
      <label htmlFor="City" className="form-label">
      City
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="City"
        placeholder="City"
        value={zip.city}   onChange={ev => setZip({...zip, city: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
      <label htmlFor="county" className="form-label">
      County
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="county"
        placeholder="county"
        value={zip.county}   onChange={ev => setZip({...zip, county: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
      <label htmlFor="state_name" className="form-label">
      State Name
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="state_name"
        placeholder="state name"
        value={zip.state_name}   onChange={ev => setZip({...zip, state_name: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
      <label htmlFor="state_id" className="form-label">
      State Id
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="state_id"
        placeholder="State Id"
        value={zip.state_id}   onChange={ev => setZip({...zip, state_id: ev.target.value})}
      />
    </div>
   
    <div className="mb-3 col-md-4">
      <label htmlFor="LAT" className="form-label">
      LAT
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="LAT"
        placeholder="LAT"
        value={zip.LAT}   onChange={ev => setZip({...zip, LAT: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
      <label htmlFor="LNG" className="form-label">
      LNG
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="LNG"
        placeholder="LNG"
        value={zip.LNG}   onChange={ev => setZip({...zip, LNG: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
      <label htmlFor="zipcode" className="form-label">
      Zip Code
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="zipcode"
        placeholder="zip code"
        value={zip.zip_code}   onChange={ev => setZip({...zip, zip_code: ev.target.value})}
      />
    </div>
   
  
  


<div className="float-start ">
    <input
      type="submit"
      className="btn btn-primary"
     
      defaultValue="Submit"
    />
  </div>
  <div className="float-end">
 
    <Link 
      type="button"
      className="btn btn-warning button-next"
    to="/zipcodes" >Cancel</Link>
  
  </div> 
 

  </div> 
</form>

 )}
</div>




    






        
      </div>
     
    </div>
  
  </div>
</div>














 
</>

 


    )
};


export default ZipForm;