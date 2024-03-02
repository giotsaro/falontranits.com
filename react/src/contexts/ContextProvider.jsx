import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  company:null,
  user: null,
  token: null,
  notification: null,
  setUser:()=>{},
  setToken:()=>{},
  setCompany:()=>{},
  setNotification:()=>{}

})



export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [company, setCompany] = useState({});
    const [notification, _setNotification] = useState('');
  
    const setNotification = message => {
      _setNotification(message);
  
      setTimeout(() => {
        _setNotification('')
      }, 5000)
    }


    const [usertype, _setUsertype] = useState(localStorage.getItem('Role')); 
    if (user.role===1) {
      localStorage.setItem('Role', 'Administrator');
    }
    if (user.role===2) {
      localStorage.setItem('Role', 'HR');
    }
    if (user.role===3) {
      localStorage.setItem('Role', 'Dispatcher');
    }
    if (user.role===0) {
      localStorage.setItem('Role', 'sa');
    }



  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN')); 

   const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }


    }

  return (
    <StateContext.Provider  value={{
    company,
user,
token,
notification,
setUser,
setToken,
setCompany,
setNotification

    }}>

      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);