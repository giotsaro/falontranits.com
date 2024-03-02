import { NavLink ,Link } from "react-router-dom"
import { useEffect,useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import Clock from "./Clock";


const Header =() =>{

  const{user,token,company,setToken ,setCompany,setUser} = useStateContext();
/*  const[user,setUser] = useState({
  name:''

 }); */
  //const[company,setCompany] = useState();
 
  const [usertype, _setUsertype] = useState(localStorage.getItem('Role')); 
let currentmode = localStorage.getItem("theme");
if (currentmode == null) {
  localStorage.setItem("theme", "light");
  document.querySelector("html").setAttribute("data-theme", "light");
}
if (currentmode !=null) {
  localStorage.setItem("theme", currentmode);
  document.querySelector("html").setAttribute("data-theme", currentmode);
}

// Function to toggle between light and dark themes
function changemode() {
  if (currentmode == 'light') {
    localStorage.removeItem("theme");
    document.querySelector("html").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    currentmode='dark';
    
  } else if(currentmode == 'dark'){
    localStorage.removeItem("theme");
    document.querySelector("html").setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    currentmode='light';
    
  }
}

  //sidebar mode
let curentsidebarmode =localStorage.getItem("data-sidenav-size");

if (curentsidebarmode == null) {
  localStorage.setItem("data-sidenav-size", "default");
  document.querySelector("html").setAttribute("data-sidenav-size", "default");

}
if (curentsidebarmode !=null) {
  localStorage.setItem("data-sidenav-size", curentsidebarmode);
  document.querySelector("html").setAttribute("data-sidenav-size", curentsidebarmode);
}



      function sidenav(){
       
       let curentsidenav= document.querySelector("html").getAttribute("data-sidenav-size");
       //let sidebarenabled= document.querySelector("html").getAttribute("class");


        if(curentsidenav=='condensed'){
          
        document.querySelector("html").setAttribute("data-sidenav-size", "default"); 
        localStorage.setItem("data-sidenav-size", "default");
        document.querySelector("html").setAttribute("class", "menuitem-active sidebar-enable"); 
      }else 
      if(curentsidenav=='default'){
        localStorage.setItem("data-sidenav-size", "condensed");
        document.querySelector("html").setAttribute("data-sidenav-size", "condensed"); 
        document.querySelector("html").setAttribute("class", "menuitem-active"); 
        
      }else  if(curentsidenav=='full'){
        document.querySelector("html").setAttribute("class", "menuitem-active sidebar-enable"); 
        document.querySelector("body").setAttribute("style", "overflow: hidden;"); 
        const elemDiv = document.getElementById("custom-backdrop");
         elemDiv.setAttribute("class","offcanvas-backdrop fade show");

       
      }
      };

      const Logout = ev => {
        ev.preventDefault()
      
        axiosClient.post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
          })
      }

/* 
      
  useEffect(() => {
  axiosClient.get('/info')
  .then(({data}) => {
   
    
    setCompany(data.company)
    setCompany(data.user)
   
 })
}, [])   */


useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axiosClient.get('/info');
      setCompany(data.company);
      setUser(data.user); 
    //  console.log(data.company);
    //  console.log(data.user);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);










    return(
        <>
        {/* ========== Topbar Start ========== */}
<div className="navbar-custom">
    <div className="topbar container-fluid">
      <div className="d-flex align-items-center gap-lg-2 gap-1">
        {/* Topbar Brand Logo */}
        <div className="logo-topbar">
          {/* Logo light */}
          <Link to={'/'}  className="logo-light">
            <span className="logo-lg">
              <img src="http://localhost:3000/assets/images/logo.png" alt="logo" />
            </span>
            <span className="logo-sm">
              <img src="http://localhost:3000/assets/images/logo-sm.png" alt="small logo" />
            </span>
          </Link>
          {/* Logo Dark */}
          <Link to="/" className="logo-dark">
            <span className="logo-lg">
              <img src="http://localhost:3000/assets/images/logo.png" alt="dark logo" />
            </span>
            <span className="logo-sm">
              <img src="http://localhost:3000/assets/images/logo-sm.png" alt="small logo" />
            </span>
          </Link>
        </div>
        {/* Sidebar Menu Toggle Button */}
        <button className="button-toggle-menu"  onClick={sidenav}>
          <i className="mdi mdi-menu" />
        </button>
        {/* Horizontal Menu Toggle Button */}
        <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
          <div className="lines">
            <span />
            <span />
            <span />
          </div>
        </button>
        {/* Topbar Search Form */}
        <h3>  {company.company} </h3>
      </div>


      <ul className="topbar-menu d-flex align-items-center gap-3">

        
      {<Clock />}
        <li className="d-sm-inline-block">
          <div className="nav-link" id="light-dark-mode" onClick={changemode} data-bs-toggle="tooltip"   data-bs-placement="left" title="Theme Mode">
            <i className="ri-moon-line font-22" />
          </div>
        </li>
       
        <li className="dropdown">
          <NavLink className="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="false" aria-expanded="false">
            <span className="account-user-avatar">
             
             <img src="http://localhost:3000/assets/images/users/avatar-1.jpg" alt="user-image" width={32} className="rounded-circle" /> 
            </span>
            <span className="d-lg-flex flex-column gap-1 d-none">
              <h5 className="my-0">{ user.name }</h5>
              <h6 className="my-0 fw-normal">{usertype}</h6>
            </span>
          </NavLink>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
            {/* item*/}
            <div className=" dropdown-header noti-title">
             {/*  <h6 className="text-overflow m-0">Welcome !</h6> */}
            </div>
            
           
            <NavLink to='/company' className="dropdown-item">
              <i className= "ri-briefcase-line  me-1" />
              <span>Company</span>
            </NavLink>
            
        {/*     <NavLink to='/' className="dropdown-item">
              <i className="ri-lifebuoy-line me-1" />
              <span>Support</span>
            </NavLink>
          
            <NavLink to='/' className="dropdown-item">
              <i className=" ri-store-2-line  me-1" />
               <span>paymant</span>
            </NavLink> */}
            
            {/* item*/}
            <NavLink to={''} onClick={Logout} className="dropdown-item">
              <i className="mdi mdi-logout me-1" />
              <span>Logout</span>
            </NavLink>
          </div>
        </li>
      </ul>
    </div>
  </div>

  
        </>
    )


} 

export default Header


