import React from 'react'
import ReactDOM from 'react-dom/client'
import {  Router, RouterProvider } from "react-router-dom";
import { ContextProvider } from './contexts/ContextProvider.jsx';
import Routeri from './router.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>




    <ContextProvider>
      <RouterProvider router={Routeri} />
    </ContextProvider> 


  </React.StrictMode>,
)
