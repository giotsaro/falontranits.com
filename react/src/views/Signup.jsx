import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";




function Signup( ){

  const  nameRef = useRef();
  const  companyRef = useRef();
  const  emailRef = useRef();
  const  passwordRef = useRef();
  //const  nameRef = useRef();

  const [errors, setErrors] = useState(null);

const {setUser,setToken}= useStateContext();

const OnSubmit = async (ev) => {
  ev.preventDefault();

  setErrors(null);

  const payload = {
    name: nameRef.current.value,
    company: companyRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value,
  };

  try {
    const { data } = await axiosClient.post('/signup', payload);
    setUser(data.user);
    setToken(data.token);
    Navigate({pathname: '/login'});
    
  } catch (err) {
    const response = err.response;
    if (response && response.status === 422) {
     // console.log(response.data.errors);
      setErrors(response.data.errors);
    }
  }
}



    return(


<>
<>
  <div className="account-pages ">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xxl-4 col-lg-5">
          <div className="card">
            
            <div className="card-body p-4">
              <div className="text-center w-75 m-auto">
                <h4 className="text-dark-50 text-center mt-0 fw-bold">
                   Sign Up
                </h4>
                <p className="text-muted mb-2">
                  Don't have an account? Create your account, it takes less than
                  a minute
                </p>
              </div>
                {errors && <div className="alert alert-danger"> {Object.keys(errors).map(key=>(<p key={key}>{errors[key][0]}</p>))} </div>}


              <form onSubmit={OnSubmit}>
                <div className="mb-2">
                  <label htmlFor="fullname" className="form-label">
                    Full Name
                  </label>
                  <input
                  ref={nameRef}
                    className="form-control"
                    id="fullname"
                    type="text"
                    placeholder="Enter your name"

                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="company" className="form-label">
                    Company Name
                  </label>
                  <input
                  ref={companyRef}
                    className="form-control"
                    id="company"
                    type="text"
                    placeholder="Enter company name"

                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="emailaddress" className="form-label">
                    Email address
                  </label>
                  <input  
                  ref={emailRef}
                    className="form-control"
                    type="email"
                    id="emailaddress"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                    ref={passwordRef}
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                    <div className="input-group-text" data-password="false">
                      <span className="password-eye" />
                    </div>
                  </div>
                </div>
              {/*   <div className="mb-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="checkbox-signup"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkbox-signup"
                    >
                      I accept{" "}
                      <Link to="/" className="text-muted">
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div> */}
                <div className="mb-2 text-center">
                  <button className="btn btn-primary btn-sm rounded-pill" type="submit">
                    Sign Up
                  </button>
                </div>
                    {/* social*/}
               {/*      <div className="text-center mt-2">
                      <p className="text-muted font-16">Sign up with</p>
                      <ul className="social-list list-inline mt-2">
                        <li className="list-inline-item">
                          <a className="social-list-item border-danger text-danger">
                            <i className="mdi mdi-google" />
                          </a>
                        </li>
                      </ul>
                    </div> */}

              </form>
            </div>
            {/* end card-body */}
          </div>
          {/* end card */}
          <div className="row mt-3">
            <div className="col-12 text-center">
              <p className="text-muted">
                Already have account?{" "}
                <Link to="/login" className="text-muted ms-1">
                  <b>Log In</b>
                </Link>
              </p>
            </div>{" "}
            {/* end col*/}
          </div>
          {/* end row */}
        </div>{" "}
        {/* end col */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </div>
  {/* end page */}
</>

 </>

    )
};


export default Signup;