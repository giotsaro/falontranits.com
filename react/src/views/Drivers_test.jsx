import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import moment from "moment"; // Import moment library for date formatting

function Drivers() {
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [driverss, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch drivers data
  const getDrivers = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/getdrivers", zipdata);
      setLoading(false);
      setDrivers(data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    getDrivers();
  }, []);

  // Filter drivers based on search query
  const filteredDrivers = driverss.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

console.log(driverss);

  return (
    <>
      {/* Search input */}
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Table displaying filtered drivers */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Zip Code</th>
            <th>Date</th>
            <th>Comments</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.phone}</td>
              <td>{driver.location}</td>
              <td>{driver.zip}</td>
              <td>{moment(driver.date).format("MM/DD/YYYY h:mm A")}</td>
              <td>{driver.comments}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Drivers;
