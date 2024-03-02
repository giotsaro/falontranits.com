import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

function DeletedUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const onDeleteClick = (id) => {
        if (!window.confirm('Are you sure you want to delete?')) {
            return;
        }
        axiosClient.delete(`/removedusers/${id}`).then(() => {
            getUsers();
        });
    };

    const restore = async (id) => {
        const idObject = { id: id };
        try {
            const { data } = await axiosClient.put(`/removedusers/${idObject.id}`, idObject);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const getUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get('/removedusers');
            setLoading(false);
            setUsers(data.data);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-sm-5">
                                    <Link className="btn btn-warning rounded-pill btn-sm" to='/users'>
                                        <i className="ri-arrow-left-line" /> Back
                                    </Link>
                                </div>
                                <div className="col-sm-7">
                                    <div className="text-sm-end">
                                        <button type="button" className="btn btn-success rounded-pill mb-2 me-1" onClick={getUsers}>Refresh</button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <div style={{ overflowX: "auto" }}>
                                    <table id="fixed-columns-datatable" className="table table-hover font-13 table-centered w-100 nowrap">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Employee ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Role</th>
                                                <th>Create Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {loading ? (
                                            <tbody>
                                                <tr>
                                                    <td colSpan="13" className="text-center">
                                                        <div className="spinner-border text-primary" role="status"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) : (
                                            <tbody>
                                                {users.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.role}</td>
                                                        <td>{item.created_at}</td>
                                                        <td className="table-action">
                                                            <button className="btn btn-success" onClick={() => restore(item.id)}>Restore</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeletedUsers;
