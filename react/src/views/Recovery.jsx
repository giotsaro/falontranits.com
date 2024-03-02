import { Link } from "react-router-dom";



function Recovery( ){


    return(
 <>
<>
  <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xxl-4 col-lg-5">
          <div className="card">
            {/* Logo */}
        {/*     <div className="card-header py-4 text-center bg-primary">
              <a href="index.html">
                <span>
                  <img src="assets/images/logo.png" alt="logo" height={20} />
                </span>
              </a>
            </div> */}
            <div className="card-body p-4">
              <div className="text-center w-75 m-auto">
                <h4 className="text-dark-50 text-center mt-0 fw-bold">
                  Reset Password
                </h4>
                <p className="text-muted mb-4">
                  Enter your email address and we'll send you an email with
                  instructions to reset your password.
                </p>
              </div>
              <form action="#">
                <div className="mb-3">
                  <label htmlFor="emailaddress" className="form-label">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="emailaddress"
                    required=""
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-0 text-center">
                  <button className="btn btn-primary" type="submit">
                    Reset Password
                  </button>
                </div>
              </form>
            </div>{" "}
            {/* end card-body*/}
          </div>
          {/* end card */}
          <div className="row mt-3">
            <div className="col-12 text-center">
              <p className="text-muted">
                Back to{" "}
                <Link to="/login" className="text-muted ms-1">
                  <b>Log In</b>
                </Link>
              </p>
            </div>{" "}
            {/* end col */}
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
  <footer className="footer footer-alt">
    2018 - © Starlogisticsc.com
  </footer>
</>

 </>

    )
};


export default Recovery;