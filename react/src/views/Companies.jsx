import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Companies() {
    const [company,setCompanies ]=useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
      getCompanies();
    
    },[])  


    const getCompanies = async () => {
        setLoading(true);
      
        try {
          const { data } = await axiosClient.get('/companies');
          // console.log(data);
          setLoading(false);
         //  console.log(data.companies.data);
          setCompanies(data.data);
        

        } catch (error) {
          setLoading(false);
      
          // Handle the error if needed
        }
      };

      //console.log(companies.data);


    const [searchQuery, setSearchQuery] = useState(""); 

const filteredCompanies = company.filter((company) => {
  const searchString = searchQuery.toLowerCase();
  return Object.values(company).some((value) => {
    // Check if the value is not null before calling toString
    if (value !== null && value !== undefined) {
      return value.toString().toLowerCase().includes(searchString);
    }
    return false;
  });
});
      
return (
<>




<div>
  <h3>Companies</h3>
  
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
     
    <span>{company.length}</span>
    </li>
    <li className="d-sm-inline-block">
     
    <button type="button" className="btn btn-success btn-sm rounded-pill mb-2 me-1"  onClick={getCompanies}>
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
              <Link type="button" className="btn btn-danger rounded-pill mb-2 me-1"   to = '/companies/new'>
              <small>Add Company</small>
                </Link>
              
              {/*   <button type="button" className="btn btn-success mb-2 me-1">
                  Import
                </button>
                <button type="button" className="btn btn-success mb-2">
                  Export
                </button> */}
                <Link  className="btn rounded-pill mb-2"  to = '/deletedcompanies'>   <small>Deleted companies </small></Link>
                
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
                  <th>Company id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Credited </th>
                  <th>Credited Date</th>
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
               {filteredCompanies.map((item)=> {
                return(

                  <tr key={item.id} >

                  <td>{item.id}</td>
                  <td>{item.company} </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.credited}</td>
                  <td>{item.credited_until}</td>
                  <td>
                    <span className="badge badge-success-lighten">Active</span>
                  </td>
                  <td>
                    <Link  className="action-icon" /* data-bs-toggle="modal" data-bs-target="#standard-modal" */ to={'/companies/'+item.id} >
                      <i className="mdi mdi-square-edit-outline" />
                    </Link>
                   {/*  <button  className="action-icon btn" onClick={ev => onDeleteClick(item.id)}>
                      <i className="mdi mdi-delete" />
                    </button> */}
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


}
 

export default Companies;