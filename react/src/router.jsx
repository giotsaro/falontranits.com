import { Navigate, Router, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
//import Singup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
//import Recovery from "./views/Recovery";
import GuestHome from "./views/GuestHome";
//import Pricing from "./views/Pricing";
import Map from "./views/Map";
import Drivers from "./views/Drivers";
import UserFrom from "./views/UserFrom";
import ManageDrivers from "./views/ManageDrivers";
import ZipCodes from "./views/ZipCodes";
import Companies from "./views/Companies";
import DriverForm from "./views/DriverForm";
import DeletedDrivers from "./views/DeletedDrivers";
import DeletedUsers from "./views/DeletedUsers";
import Settings from "./views/settings";
import CompaniesForm from "./views/CompaniesForm";
import ZipForm from "./views/ZipsForm";




const usertype = localStorage.getItem('Role'); 

const Routeri = createBrowserRouter([


  {
    path:'/',
    element:<DefaultLayout />,

    children:[
      {
        path:'/',
        element:<Navigate to='dashboard' />
      },
      {

        path:'dashboard',
        element:<Dashboard />
      },
    
      {

        path:'users',
        element:<Users />
      },
       
      {

        path:'users/:id',
        
        element:<UserFrom key="userUpdate" />
      },
      {

        path:'users/new',
        
        element:<UserFrom  key="userCreate"/>
      },
      {

        path:'companies/:id',
        
        element:<CompaniesForm key="companyUpdate" />
      },
      {

        path:'companies/new',
        
        element:<CompaniesForm  key="companyCreate"/>
      },
     
    
      {

        path:'map',
        element:<Map />
      },
      {

        path:'drivers',
        element:<Drivers />
      },
      {

        path:'drivers/:id',
        element:<DriverForm  key="driverUpdate"/>
      },

      {

        path:'drivers/new',
        element:<DriverForm key="driverCreate"/>
      },



      {

        path:'managedrivers',
        element:<ManageDrivers />
      },
      {

        path:'deleteddrivers',
        element:<DeletedDrivers />
      },
      {

        path:'deletedusers',
        element:<DeletedUsers />
      },
      {

        path:'zipcodes',
        element:<ZipCodes />
      },
      {

        path:'zipcodes/new',
        element:<ZipForm key="zipCreate"/>
      },
      {

        path:'zipcodes/:id',
        element:<ZipForm  key="zipUpdate"/>
      },
      {

        path:'companies',
        element:<Companies />
      },
      {

        path:'company',
        element:<Settings />
      },
    
   
    ]
  },
 

  {
    path:'/',
    element:<GuestLayout />,
    children:[

      {

        path:'/',
        element:<GuestHome />
      },
      {

        path:'/home',
        element:<GuestHome />
      },
    
      {

        path:'login',
        element:<Login />
      },
      /* {
  
        path:'signup',
        element:<Singup />
      }, */
   /*    {
  
        path:'recovery',
        element:<Recovery />
      }, */


    ]
  },
    {

      path:'*',
      element:<NotFound />
    },
   

            ]);

export default Routeri 