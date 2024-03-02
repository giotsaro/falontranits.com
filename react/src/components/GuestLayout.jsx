import { useStateContext } from "../contexts/ContextProvider";
import { Link, Navigate, Outlet } from "react-router-dom";


export default function GuestLayout(){
    const{token} = useStateContext()

    if(token){
     return <Navigate to="/Dashboard"/>
    }


    return(     
<>

  <header className="p-3 text-bg-dark">
  <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <h4><Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">Falcon Transits
          
        </Link>
        </h4>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/home" className="nav-link px-2 text-white">Home</Link></li>
         {/*  <li><Link to="/pricing" className="nav-link px-2 text-white">Pricing</Link></li> */}
        </ul>

       

        <div className="text-end">
        <Link  to='/login' className="btn btn-warning btn-sm rounded-pill"> Login </Link> 
         {/*  <Link  to='/signup'  className="btn btn-warning btn-sm rounded-pill">Singup</Link> */}
        </div>
      </div>
      </div>
  </header>





  <main className="container">
  <Outlet />
  </main>


        
        </>
    )

}