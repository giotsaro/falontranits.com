import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { createRef } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken  } = useStateContext();
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    setMessage(null);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <>
      <div className="account-pages">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-4 col-lg-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center pb-0 fw-bold">
                      Sign In
                    </h4>
                    <p className="text-muted mb-4">
                      Enter your email address and password
                    </p>
                  </div>

                  {message && (
                    <div className="alert alert-danger">
                      <p>{message}</p>
                    </div>
                  )}

                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label htmlFor="emailaddress" className="form-label">
                        Email address
                      </label>
                      <input
                        ref={emailRef}
                        id="emailaddress"
                        className="form-control"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          ref={passwordRef}
                          id="password"
                          type={showPassword ? "text" : "password"} // Toggle password visibility based on showPassword state
                          className="form-control"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibility}
                        >
                           
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    <div className="mb-3 mb-0 text-center">
                      <button
                        className="btn btn-primary btn-sm rounded-pill"
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          {/*     <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-muted ms-1">
                      <b>Sign Up</b>
                    </Link>
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
