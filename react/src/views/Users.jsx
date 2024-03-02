import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { Link ,useNavigate } from "react-router-dom";



function Users( ){
  const [usertype, _setUsertype] = useState(localStorage.getItem('Role')); 
  const{user} = useStateContext();

const [users,setUsers ]=useState([]);
const [loading,setLoading] = useState(false);



const onDeleteClick = (id)=>{
  //console.log(id)
   if(!window.confirm('Are you sure you want to delete?')){
    return
  } 
   axiosClient.delete(`/users/${id}`).then(()=>{
    getUsers();
  }) 

}


 useEffect(()=>{
    getUsers();

},[])  

const getUsers = async () => {
  setLoading(true);

  try {
    const { data } = await axiosClient.get('/users');
    
    setLoading(false);

    setUsers(data.data);
  } catch (error) {
    setLoading(false);
    
  }
};

const [searchQuery, setSearchQuery] = useState(""); 

const filteredUsers = users.filter((user) => {
  const searchString = searchQuery.toLowerCase();
  return Object.values(user).some((value) => {
    // Check if the value is not null before calling toString
    if (value !== null && value !== undefined) {
      return value.toString().toLowerCase().includes(searchString);
    }
    return false;
  });
});



    return(
        
 <>


 <div>
  <h3>employees</h3>
  
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
     
    <button type="button" className="btn btn-success btn-sm rounded-pill mb-2 me-1"  onClick={getUsers}>
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
              <Link type="button" className="btn btn-danger rounded-pill mb-2 me-1"   to = '/users/new'>
              <small>Add User</small>
                </Link>
              
              {/*   <button type="button" className="btn btn-success mb-2 me-1">
                  Import
                </button>
                <button type="button" className="btn btn-success mb-2">
                  Export
                </button> */}
                <Link  className="btn rounded-pill mb-2"  to = '/deletedusers'>   <small>Deleted Users </small></Link>
                
              </div>
            </div>
          </div>



         




          
          <div className="table-responsive">
            <table
              className="table table-centered table-hover table-striped dt-responsive nowrap w-100"
              id="products-datatable"
            >
              <thead>
                <tr>
                  <th>User id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Create Date</th>
                  <th>Status</th>
                  <th style={{ width: 75 }}>Action</th>
                </tr>
              </thead>
              {loading &&
            <tbody>
            <tr>
              <td colSpan="7" className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
              </td>
            </tr>
            </tbody>
          }
           {!loading &&
              <tbody>
               {filteredUsers.map((item)=> {
                return(

                  <tr key={item.id} >

                  <td>{item.id}</td>
                  <td>{item.name} </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td><span className="badge badge-success-lighten">{item.role === 1 && 'Administrator'} {item.role === 2 && 'HR'} {item.role === 3 && 'Dispatcher'} </span></td>

                  <td>{item.created_at}</td>
                  <td>
                    <span className="badge badge-success-lighten">Active</span>
                  </td>
                  <td>
                    <Link  className="action-icon" /* data-bs-toggle="modal" data-bs-target="#standard-modal" */ to={'/users/'+item.id} >
                      <i className="mdi mdi-square-edit-outline" />
                    </Link>
                    <button  className="action-icon btn" onClick={ev => onDeleteClick(item.id)}>
                      <i className="mdi mdi-delete" />
                    </button>
                  </td>
                </tr>
                
                )} )}
         


             
               
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


export default Users;