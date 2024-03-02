import { Navigate, Outlet  } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";




export default function DefaultLayout(){

 const {user, token, setUser, setToken, notification} = useStateContext();


 if(!token  ){
  return <Navigate to="home"/>
 } 

 
 
    return(
        <>  
        <Header />
     <Sidebar />
<div>
  {/* Start Page Content here */}
  {/* ============================================================== */}
  <div className="content-page">
    <div className="content">
      {/* Start Content*/}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">                                    
              <div className="page-title-right">
                   {/* {  <small>{user.name}</small> } */}
                    <div>
               
            </div>
              </div>
              {/* <small className="page-title">{location.pathname}</small> */}
              
            </div>
          </div>
        </div>

        <Outlet />

        
{/* end row */}
</div>
{/* container */}
</div>
{notification &&
          <div className="alert alert-info">
            {notification}
          </div>
        }
    <Footer />
    {/* content */}</div>
 </div>
    
        </>
    )

}