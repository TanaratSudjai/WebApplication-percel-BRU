"use client"

import React, { useState, useEffect } from "react";
import Block from '../components/block';
function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Staff Table */}
      <div className="table-container">
        <h2>Staff Table</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.staff.map((staff) => (
              <tr key={staff.staff_id}>
                <td>{staff.staff_id}</td>
                <td>{staff.staff_name}</td>
                <td>{staff.staff_phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Owners Table */}
      <div className="table-container">
        <h2>Owners Table</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.owners.map((owner) => (
              <tr key={owner.own_id}>
                <td>{owner.own_id}</td>
                <td>{owner.own_name}</td>
                <td>{owner.own_phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Table */}
      <div className="table-container">
        <h2>Status Table</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.status.map((status) => (
              <tr key={status.sta_id}>
                <td>{status.sta_id}</td>
                <td>{status.sta_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Parcels Table */}
      <div className="table-container">
        <h2>Parcels Table</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Real ID</th>
              <th>Owner ID</th>
              <th>Staff ID</th>
              <th>Pickup Date</th>
              <th>Status ID</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.parcels.map((parcel) => (
              <tr key={parcel.par_id}>
                <td>{parcel.par_id}</td>
                <td>{parcel.par_real_id}</td>
                <td>{parcel.own_id}</td>
                <td>{parcel.staff_id}</td>
                <td>{parcel.pickupsdate}</td>
                <td>{parcel.sta_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* delivers Table */}
      <div className="table-container">
        <h2>Delivers Table</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>DELIVERS ID</th>
              <th>PARCEL ID</th>
              <th>OWNER ID</th>
              <th>DATA/TIME</th>
              <th>MAKE NAME</th>  
            </tr>
          </thead>
          <tbody>
            {dashboardData.delivers.map((delivered) => (
              <tr key={delivered.del_id}>
                <td>{delivered.del_id}</td>
                <td>{delivered.par_id}</td>
                <td>{delivered.own_id}</td>
                <td>{delivered.deliverydate}</td>
                <td>{delivered.deliver_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 20px;
        }
        .table-container {
          margin-bottom: 20px;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #ddd;
        }
        .data-table th,
        .data-table td {
          padding: 8px;
          text-align: left;
          border: 1px solid #ddd;
        }
        .data-table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .data-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
}

export default DashboardPage;
