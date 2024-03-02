import { Link, Routes } from "react-router-dom"
import { useEffect,useState } from "react";

import { useStateContext } from "../contexts/ContextProvider";


const Sidebar = () => {

  const{user} = useStateContext();
 
  const [usertype, _setUsertype] = useState(localStorage.getItem('Role')); 
  

 

 
/*   function sidenav(){
    let curentsidenav= document.querySelector("html").getAttribute("data-sidenav-size");
    let sidebarenabled= document.querySelector("html").getAttribute("class");

     if(curentsidenav=='condensed'){
     document.querySelector("html").setAttribute("data-sidenav-size", "default"); 
     document.querySelector("html").setAttribute("class", "menuitem-active sidebar-enable"); 
   }else 
   if(curentsidenav=='default'){
     document.querySelector("html").setAttribute("data-sidenav-size", "condensed"); 
     document.querySelector("html").setAttribute("class", "menuitem-active"); 
     
   }else  if(curentsidenav=='full'){
     document.querySelector("html").setAttribute("class", "menuitem-active sidebar-enable"); 
     document.querySelector("body").setAttribute("style", "overflow: hidden;"); 
     
   }
   };
 */
function closesidenav(){

  document.querySelector("html").setAttribute("class", "menuitem-active");
  const element = document.getElementById("custom-backdrop");
        element.setAttribute("class","")
      document.querySelector("body").setAttribute("style", "");
}


    return (
    <>
 {/* ========== Left Sidebar Start ========== */}
 <div className="leftside-menu">
    {/* Brand Logo Light */}
    <Link  to="/" className="logo logo-light">
      <span className="logo-lg">
        <img src="http://localhost:3000/assets/images/logo.png" alt="logo" />
      </span>
      <span className="logo-sm">
        <img src="http://localhost:3000/assets/images/logo-sm.png" alt="small logo" />
      </span>
    </Link>
    {/* Brand Logo Dark */}
    <Link  to="/" className="logo logo-dark">
      <span className="logo-lg">
        <img src="http://localhost:3000/assets/images/logo-sm.png" alt="dark logo" />
      </span>
      <span className="logo-sm">
        <img src="http://localhost:3000/assets/images/logo-sm.png" alt="small logo" />
      </span>
    </Link>
    {/* Sidebar Hover Menu Toggle Button */}
    <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
      <i className="ri-checkbox-blank-circle-line align-middle" />
    </div>
    {/* Full Sidebar Menu Close Button */}
    <div className="button-close-fullsidebar" onClick={closesidenav}>
      <i className="ri-close-fill align-middle" ></i>
    </div>
    {/* Sidebar -left */}
    <div className="h-100" id="leftside-menu-container" data-simplebar>
      {/* Leftbar User */}
      <div className="leftbar-user">
        <Link href="pages-profile.html">
          <img src="http://localhost:3000/assets/images/users/avatar-1.jpg" alt="user-image" height={42} className="rounded-circle shadow-sm" />
          <span className="leftbar-user-name mt-2">{user.name}</span>
        </Link>
      </div>
      {/*- Sidemenu */}
      <ul className="side-nav">
     
      <li className="side-nav-title">navs</li>
    
      <li className="side-nav-item">
            <Link to="http://localhost:3000/dashboard" className="side-nav-link">
            <i className="ri-dashboard-line" />
            <span> Dashboard </span>
            </Link>
        </li>
   
        <li className="side-nav-item">
            <Link to="/drivers" className="side-nav-link">
            <i className="ri-truck-line" />
            <span> Drivers </span>
            </Link>
        </li>
    

        <li className="side-nav-item">
                            <Link to="/map" className="side-nav-link">
                                <i className="ri-map-pin-line"></i>
                                <span> Map </span>
                            </Link>
                        </li>
                      
     
       
      
     
    
 
   

    





      </ul>
      {/*- End Sidemenu */}
      <div className="clearfix" />
    </div>
  </div>
  {/* ========== Left Sidebar End ========== */}



    </>
    
    )
    }
    
    
    export default Sidebar