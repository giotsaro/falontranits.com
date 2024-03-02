import {Link,useNavigate, useParams} from "react-router-dom";
import { useEffect ,useState } from "react";
import axiosClient from "../axios-client";




function Settings( ){




    const navigate = useNavigate();
    let {id} = useParams();


    const [company, setCompany] = useState( { })
const [loading ,setLoading] = useState(false)
const [errors, setErrors] = useState(null)


/* 
if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/company/${id}`)
        .then(({data}) => {
          
            setCompany(data);
            setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  } */




    /* const onSubmit = ev => {
        ev.preventDefault();
       
        if (company.id) {
          
          axiosClient.put(`/company/${company.id}`, company)
            .then(() => {
             // setNotification('User was successfully updated')
              navigate('/company')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        }else {
            axiosClient.post('/company', company)
              .then(() => {
               // setNotification('User was successfully created')
                navigate('/company')
              })
              .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors)
                }
              })
          }

    } */


     
    
    const getCompany = async () => {
      setLoading(true);
    
     
        try {
          const { data } = await axiosClient.get('/company');
          setLoading(false);
          setCompany(data.data[0]);
        }
        catch (error) {
          setLoading(false);
       
          // Handle the error if needed
        }
 
       }


       useEffect(()=>{
        getCompany();
      
      },[]) 

console.log(company)
    return(

 
 <>
 {company.id && <h3>About company: {company.company}</h3>}



 <div className="row">
  <div className="col-12">
    <div className="card">
    <Link 
      type="button"
      className="btn btn-warning button-next"
    to="http://localhost:3000/dashboard" >Back</Link>
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
     <form /* onSubmit={onSubmit} */>


<div className="row g-2">

    <div className="mb-3 col-md-4">
      <h3>{company.company}</h3>
      
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
        defaultValue={company.email}  disabled  //onChange={ev => setUser({...company, email: ev.target.value})}
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
        
        defaultValue={company.phone}  disabled //onChange={ev => setUser({...company, phone: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
    <label htmlFor="inputPhone" className="form-label">
      Owner
      </label>
      <h3>{company.creator}</h3>
       
        
     
    </div>
    <div className="mb-3 col-md-4">
    <label  className="form-label">
      Created at
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
      
        
        defaultValue={company.created_at}  disabled //onChange={ev => setUser({...company, phone: ev.target.value})}
      />
    </div>
  
 
  
  </div>


<div className="float-start ">
   {/*  <input
      type="submit"
      className="btn btn-primary"
     
      defaultValue="Submit"
    /> */}
  </div>
  <div className="float-end">
 
    {/* <Link 
      type="button"
      className="btn btn-warning button-next"
    to="http://localhost:3000/dashboard" >Cancel</Link> */}
  
  </div> 
 


</form>
 )}
</div>




    






        
      </div>{" "}
      
   </div>{" "} 
   
   </div>
</div> 














 
</>

 


    )
}; 


export default Settings;