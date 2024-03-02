
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation , Outlet} from "react-router-dom";



export default function DefaultLayout({ children }){
    const location = useLocation();
    const dro = new Date().toLocaleString() + "";
    let currentDate = moment().format('MM D YYYY, hh:mm:ss');
    
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
                    <small>{dro}</small>
                    <div>
               
            </div>
              </div>
              <small className="page-title">{location.pathname}</small>
            </div>
          </div>
        </div>

        <Outlet />

        
{/* end row */}
</div>
{/* container */}
</div>
    <Footer />
    {/* content */}</div>
 </div>
        </>
    )

}