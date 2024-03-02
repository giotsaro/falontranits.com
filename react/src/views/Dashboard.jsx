import { NavLink,Link } from "react-router-dom"

import { useEffect,useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";



function Dashboard( ){

  const [usertype, _setUsertype] = useState(localStorage.getItem('Role')); 
  const{user,company,token ,setUser,setCompany,setToken} = useStateContext();
  const currentDate = new Date();
 // const fiveDaysFromNow = moment(currentDate).format('MM-DD-YYYY');

  const fiveDaysFromNow = moment(currentDate).add(5, 'days').format('MM-DD-YYYY');

 
 
    return(

 <>

                      <div className="row">
                        <div className="col-12">
                          <div className="page-title-box">
                            <div className="page-title-right">
                              <ol className="breadcrumb m-0">
                                {/* <li className="breadcrumb-item active">{<Clock />}</li> */}
                               
                              </ol>
                            </div>
                            <h4 className="page-title">Dashboard  </h4>
                          </div>
                        </div>
                      </div>

                                <div className="row">
                                  <div className="col-sm-12">
                                    {/* Profile */}
                                    <div className="card bg-primary">
                                      <div className="card-body profile-user-box">
                                        <div className="row">
                                          <div className="col-sm-8">
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="avatar-lg">
                                                <h4 className=" text-white" >welcome</h4>
                                               
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div>
                                                  <h4 className="mt-1 mb-1 text-white">{user.name}</h4>
                                                  <p className="font-13 text-white-50">{usertype}</p>
                                                  <ul className="mb-0 list-inline text-light">
                                                   
                                                  </ul>
                                                  { (usertype === 'Administrator' || usertype==='HR') && ( <p className="alert  bg-primary text-white   border-0">{' Credited '+ moment(company.credited_until ).format('MM-DD-YYYY') }</p>)}
                                                  
                                                </div>
                                              </div>
                                            </div>
                                          </div> {/* end col*/}
                                        {/*   <div className="col-sm-4">
                                            <div className="text-center mt-sm-0 mt-3 text-sm-end">
                                              <button type="button" className="btn btn-light">
                                                <i className="mdi mdi-account-edit me-1" /> Edit Profile
                                              </button>
                                            </div>
                                          </div> */} {/* end col*/}
                                        </div> {/* end row */}
                                      </div> {/* end card-body/ profile-user-box*/}
                                    </div>{/*end profile/ card */}
                                  </div> {/* end col*/}
                                </div>

                                { usertype === 'sa'  && (  
   
       

   <div className="row">
     <div className="col-xl-12 col-lg-12">
       <div className="row">
         <div className="col-sm-3">
           <div className="card widget-flat">
             <div className="card-body">
               <div className="float-end">
                 <i className="mdi mdi-account-multiple widget-icon bg-success-lighten text-success" />
               </div>
               <h5 className="text-muted fw-normal mt-0" title="Number of Customers"> <Link to="/companies" >companies Manager</Link>    </h5>
               
               <p className="mb-0 text-muted">
                 <span className="text-success me-2"> 5</span>
                
               </p>
             </div> {/* end card-body*/}
           </div> {/* end card*/}
         </div> {/* end col*/}
         <div className="col-sm-3">
           <div className="card widget-flat">
             <div className="card-body">
               <div className="float-end">
               
                 <i className="mdi  mdi-truck-outline widget-icon bg-danger-lighten text-danger" />
               </div>
               <h5 className="text-muted fw-normal mt-0" title="Number of Orders"><Link to="/zipcodes" >zips Manager</Link></h5>
               <p className="mb-0 text-muted">
                 <span className="text-danger me-2"> 10</span>
                
               </p>
             </div> {/* end card-body*/}
           </div> {/* end card*/}
         </div> {/* end col*/}
   
        
       </div> {/* end row */}
     
     </div> {/* end col */}
   
   </div>
      )} 





                               
                                { (usertype === 'Administrator' || usertype==='HR') && (  
   
       

<div className="row">
  <div className="col-xl-12 col-lg-12">
    <div className="row">
      <div className="col-sm-3">
        <div className="card widget-flat">
          <div className="card-body">
            <div className="float-end">
              <i className="mdi mdi-account-multiple widget-icon bg-success-lighten text-success" />
              
            </div>
            <h5 className="text-muted fw-normal mt-0" title="Number of Customers"> <Link to="/users" >Users Manager</Link>    </h5>
            
            <p className="mb-0 text-muted">
              <span className="text-success me-2">{company.users_count}</span>
             
            </p>
</div> {/* end card-body*/}



       


        </div> {/* end card*/}
      </div> {/* end col*/}
      <div className="col-sm-3">
        <div className="card widget-flat">
          <div className="card-body">
            <div className="float-end">
              <i className="mdi  mdi-truck-outline widget-icon bg-danger-lighten text-danger" />
            </div>
            <h5 className="text-muted fw-normal mt-0" title="Number of Orders"><Link to="/managedrivers" >Drivers Manager</Link></h5>
            <p className="mb-0 text-muted">
              <span className="text-danger me-2">{company.drivers_count}</span>
             
            </p>
          </div> {/* end card-body*/}
        </div> {/* end card*/}
      </div> {/* end col*/}

     
    </div> {/* end row */}
  
  </div> {/* end col */}

</div>
   )} 



   
                               

   


{/* end row */}

{/* end row */}

{/* end row */}

</>


    )
};


export default Dashboard;