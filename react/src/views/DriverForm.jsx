import {Link,useNavigate, useParams} from "react-router-dom";
import { useEffect ,useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";



function DriverFrom( ){

  const{usercontext} = useStateContext();


    const navigate = useNavigate();
    let {id} = useParams();


    const [driver, setDriver] = useState( {
      comments: '',
      dimensions: '',
      email: '',
      emergency: '',
      insurensexp: '',
      location: '',
      name:  '',
      payload: '',
      phone: '',
      unit: '',
      zip: ''
    })

const [loading ,setLoading] = useState(false)
const [errors, setErrors] = useState(null)



if (id) {
    useEffect(() => {
      setLoading(true)
            axiosClient.get(`/drivers/${id}`)
        .then(({data}) => {
          // console.log(data.data);
            setDriver(data.data);
            setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }




    const onSubmit = ev => {
        ev.preventDefault();
        setErrors(null);
       // console.log(driver);
         if (driver.id) {
          
          axiosClient.put(`/drivers/${driver.id}`, driver)
            .then(() => {
             // setNotification('User was successfully updated')
              navigate('/managedrivers')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        }else {
            axiosClient.post('/drivers', driver)
              .then(() => {
               // setNotification('User was successfully created')
                navigate('/managedrivers')
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
 {driver.id && <h3>Update Driver: {driver.name}</h3>}
 {!driver.id && <h3>New Driver</h3>}


 <div className="row">
  <div className="col-12">
    <div className="card">
      <div className="card-body">

      {loading && (
          <div className="text-center">
           <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}
<div >
{errors &&
          <div className="alert alert-danger">
            {Object.keys(errors).map(key => (
              <small key={key}>{errors[key][0]}</small>
            ))}
          </div>
        }


      

      {!loading && (
     <form onSubmit={onSubmit}>

<div className="row g-2">

    <div className="mb-3 col-md-4">
      <label htmlFor="inputName" className="form-label">
        Name
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="inputName"
        placeholder="Name"
        value={driver.name}   onChange={ev => setDriver({...driver, name: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
      <label htmlFor="inputEmail" className="form-label">
        Email
      </label>
      <input
        type="email"
        className="form-control form-control-sm"
        id="inputEmail"
        placeholder="Email"
        value={driver.email}   onChange={ev => setDriver({...driver, email: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
      <label htmlFor="inputPhone" className="form-label">
        Phone
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="inputPhone"
        placeholder="+123456789"
        value={driver.phone}   onChange={ev => setDriver({...driver, phone: ev.target.value})}
      />
    </div>
  </div>

  <div className="row g-2">
  <div className="mb-2 col-md-4">
    <label htmlFor="inputUnit" className="form-label">
    Unit
    </label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="inputUnit"
      placeholder="Unit"
      value={driver.unit}   onChange={ev => setDriver({...driver, unit: ev.target.value})}
    />
  </div>
  <div className="mb-2 col-md-4">
    <label htmlFor="inputAddress" className="form-label">
   Dimensions
    </label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="inputAddress"
      placeholder=" "
      value={driver.dimensions}   onChange={ev => setDriver({...driver, dimensions: ev.target.value})}
    />
  </div>
  <div className="mb-2 col-md-4">
    <label htmlFor="inputPayload" className="form-label">
    Payload
    </label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="inputPayload"
      placeholder="Payload"
      value={driver.payload}   onChange={ev => setDriver({...driver, payload: ev.target.value})}
    />
  </div>
 
  </div>
 

  <div className="row g-2">
  <div className="mb-2 col-md-4">
    <label htmlFor="inputexdate" className="form-label">
    Insurence exp. date
    </label>
    <input
      type="date"
      className="form-control form-control-sm "  
      id="inputexdate"
      placeholder="dd.mm.yyyy"
      value={driver.insurensexp}   onChange={ev => setDriver({...driver, insurensexp: ev.target.value})}
    />
  </div>
 
    <div className="mb-2 col-md-4">
      <label htmlFor="inputZip" className="form-label">
        Zip
      </label>
      <input type="text" className="form-control form-control-sm" id="inputZip" 
       placeholder="01001"
       value={driver.zip}   onChange={ev => setDriver({...driver, zip: ev.target.value})}
       />
    </div>
    <div className="mb-3 col-md-4">
      <label htmlFor="inputEmergency" className="form-label">
      Emergency
      </label>
      <input type="text" className="form-control form-control-sm" id="inputEmergency" 
       placeholder="Emergency"
       value={driver.emergency}   onChange={ev => setDriver({...driver, emergency: ev.target.value})}
       />
    </div>
  </div>


<div className="float-start">
    <input
      type="submit"
      className="btn btn-primary"
      defaultValue="submit"
    />

  </div>
  <div className="float-end">
    <Link
      type="button"
      className="btn btn-warning button-next"
     
     to="/managedrivers"
    >Cancel</Link>
  
  </div> 
 


</form>


 )}
</div>




      </div>{" "}
      {/* end card body*/}
    </div>{" "}
    {/* end card */}
  </div>
</div>














 
</>

 


    )
};


export default DriverFrom;