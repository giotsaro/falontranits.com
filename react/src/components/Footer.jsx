
import { NavLink } from "react-router-dom"

const Footer =() =>{
  function closesidenav(){

    document.querySelector("html").setAttribute("class", "menuitem-active");
    const element = document.getElementById("custom-backdrop");
          element.setAttribute("class","")
        document.querySelector("body").setAttribute("style", "");
  }
    
    return(
        <>

{/* Footer Start */}
<footer className="footer">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">   
      <span className="ri-copyright-line"></span>  Star Team <span className="ri-star-line"></span>  
      </div>
      <div className="col-md-6">
        <div className="text-md-end footer-links d-none d-md-block">
        <NavLink to="/" className="side-nav-link">
          
            <span className="ri-facebook-circle-fill">  </span>
            </NavLink>
            <NavLink to="/" className="side-nav-link">
            <span className="ri-github-fill" ></span>
            </NavLink>
            <NavLink to="/" className="side-nav-link">
           
            <span className=" ri-linkedin-box-line"></span>
            </NavLink>
        </div>
      </div>
    </div>
  </div>
</footer>
{/* end Footer */}

        </>
    )


} 

export default Footer


