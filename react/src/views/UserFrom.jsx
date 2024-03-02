import {Link,useNavigate, useParams} from "react-router-dom";
import { useEffect ,useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";



function UserFrom( ){


  const {setNotification} = useStateContext()


    const navigate = useNavigate();
    let {id} = useParams();


    const [user, setUser] = useState( {
        id: null,
        role: '',
        name: '',
        email: '',
        phone: '',
        password: '',
       
    })
const [loading ,setLoading] = useState(false)
const [errors, setErrors] = useState(null)



if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
           
            setUser(data);
            setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }











    const onSubmit = ev => {
        ev.preventDefault();
       // console.log(user);
        if (user.id) {
          
          axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
              setNotification('User was successfully updated')
              navigate('/users')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        }else {
            axiosClient.post('/users', user)
              .then(() => {
                setNotification('User was successfully created')
                navigate('/users')
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
 {user.id && <h3>Update User: {user.name}</h3>}
 {!user.id && <h3>New User</h3>}


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

{/*  <div>
  <div className="mb-3">
    <label htmlFor="simpleinput" className="form-label">Name</label>
    <input type="text" id="simpleinput" className="form-control" placeholder="Name" value={user.name}   onChange={ev => setUser({...user, name: ev.target.value})}/>
  </div>
  <div className="mb-3">
    <label htmlFor="example-email" className="form-label">Email</label>
    <input type="email" id="example-email"  className="form-control" placeholder="Email"  value={user.email}  onChange={ev => setUser({...user, email: ev.target.value})}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    
      <input type="password" id="password" className="form-control" placeholder="Enter your password" onChange={ev => setUser({...user, password: ev.target.value})} />
    
  </div>

  <div className="mb-3 col-md-4">
            <label htmlFor="inputState" className="form-label">Role</label>
            <select id="inputState" className="form-select" onChange={ev => setUser({...user, role: ev.target.value})}  >
                 <option value={'3'} defaultValue >Dispatcher</option>
                 <option value={'2'}>HR</option>
                 <option value={'1'}>Administrator</option>
                
                 
            </select>
        </div>

</div> */}
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
        value={user.name}   onChange={ev => setUser({...user, name: ev.target.value})}
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
        value={user.email}   onChange={ev => setUser({...user, email: ev.target.value})}
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
        placeholder="+995123456789"
        value={user.phone}   onChange={ev => setUser({...user, phone: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
      <label htmlFor="password" className="form-label">
      Password
      </label>
      <input
        type="password"
        className="form-control form-control-sm"
        id="password"
        placeholder="password"
          onChange={ev => setUser({...user, password: ev.target.value})}
      />
    </div>
    <div className="mb-3 col-md-4">
    <label htmlFor="inputState" className="form-label">Role</label>
            <select id="inputState" className="form-select form-control-sm" onChange={ev => setUser({...user, role: ev.target.value})}  >
                 <option >select one</option>
                 <option value={'3'} defaultValue >Dispatcher</option>
                 <option value={'2'}>HR</option>
                 <option value={'1'}>Administrator</option>
                
                 
            </select>
    </div>
  
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
    to="/users" >Cancel</Link>
  
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


export default UserFrom;