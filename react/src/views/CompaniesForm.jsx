import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function CompaniesForm() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [Users, setUsers] = useState([]);

  const [company, setCompany] = useState({
    id: null,
    name: "",
    password: '',
    company: "",
    email: "",
    phone: "",
    credited: "",
    credited_until: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Initialize errors as an empty object

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/companies/${id}`,company)
        .then(({ data }) => {
          setCompany(data.company);
          setUsers(data.users);
         // console.log(data.users);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (company.id) {
      axiosClient
        .put(`/companies/${company.id}`, company)
        .then(() => {
          navigate("/companies");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/companies", company)
        .then(() => {
          //navigate("/companies");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };



  return (
    <>
      {company.id && <h3>Update Company: {company.company}</h3>}
      {!company.id && <h3>New Company</h3>}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {loading && (
                <div className="text-center">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                </div>
              )}

              <div className="col-lg-12">
                {Object.keys(errors).length > 0 && ( // Check if errors object is not empty
                  <div className="alert alert-danger">
                    {Object.keys(errors).map((key) => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
                )}

                {!loading && (
                  <form onSubmit={onSubmit}>
                    <div className="row g-2">
                      <div className="mb-3 col-md-4">
                        <label htmlFor="name" className="form-label">
                        User Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="name"
                          placeholder="user Name"
                          value={company.name}
                          onChange={(ev) =>
                            setCompany({ ...company, name: ev.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 col-md-4">
                        <label htmlFor="inputName" className="form-label">
                         company  Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="inputName"
                          placeholder="company Name"
                          value={company.company}
                          onChange={(ev) =>
                            setCompany({ ...company, company: ev.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 col-md-4">
                        <label htmlFor="inputEmail" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          id="inputEmail"
                          placeholder="Email"
                          value={company.email}
                          onChange={(ev) =>
                            setCompany({ ...company, email: ev.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 col-md-4">
                        <label htmlFor="inputPhone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="inputPhone"
                          placeholder="+995123456789"
                          value={company.phone}
                          onChange={(ev) =>
                            setCompany({ ...company, phone: ev.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 col-md-4">
                        <label htmlFor="datetime" className="form-label">
                          Credited until
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          id="datetime"
                          placeholder="+995123456789"
                          value={company.credited_until}
                          onChange={(ev) =>
                            setCompany({ ...company, credited_until: ev.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 col-md-4">
                        <label htmlFor="password" className="form-label">
                        user password
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="password"
                          placeholder="password"
                          value={company.password}
                          onChange={(ev) =>
                            setCompany({ ...company, password: ev.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="float-start ">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        defaultValue="Submit"
                      />
                    </div>
                    <div className="float-end">
                      <Link
                        type="button"
                        className="btn btn-warning button-next"
                        to="http://localhost:3000/companies"
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                )}
              </div>

<br />
<br /><br />

              <div className="table-responsive ">
            <table
              className="table table-centered table-hover table-striped dt-responsive nowrap w-100"
              id="products-datatable"
            >
              <thead>
                <tr>
                  <th>User id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Create Date</th>
                 
                  
                </tr>
              </thead>
              {loading &&
            <tbody>
            <tr>
              <td colSpan="7" className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
              </td>
            </tr>
            </tbody>
          }
           {!loading &&
              <tbody>
               {Users.map((item)=> {
                return(

                  <tr key={item.id} >

                  <td>{item.id}</td>
                  <td>{item.name} </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td><span className="badge badge-success-lighten">{item.role === 1 && 'Administrator'} {item.role === 2 && 'HR'} {item.role === 3 && 'Dispatcher'} </span></td>
                  <td>{item.created_at}</td>
                  
        
                </tr>
                
                )} )}
         


             
               
              </tbody>
               }  
            </table>
          </div>



            </div>{" "}
            {/* end card body*/}
          </div>{" "}
          {/* end card */}
        </div>
      </div>
    </>
  );
}

export default CompaniesForm;
