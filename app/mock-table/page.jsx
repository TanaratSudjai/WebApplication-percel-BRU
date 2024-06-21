"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

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
    <div className="m-2 font-[sans-serif] w-full">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex mt-3 w-[90%]">
        <Sidebar />

        <div className="dashboard-container bg-black p-4 ">
          <br />
          <div className="">
            <h1 className="text-2xl font-bold ml-2">Dashboard</h1>
          </div>

          {/* Staff Table */}
          <div className="table-container m-2 h-[300px]">
            <h2>Staff Table</h2>
            <div className="relative h-full overflow-y-auto">
              <table className="data-table min-w-full">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th scope="col" className="px-2 py-2">
                      ID
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Name
                    </th>
                    <th scope="col" className="px-1 py-2">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.staff.map((staff) => (
                    <tr key={staff.staff_id}>
                      <td className="px-2 py-2">{staff.staff_id}</td>
                      <td className="px-2 py-2">{staff.staff_name}</td>
                      <td className="px-1 py-2">{staff.staff_phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              margin-left: 20px;
              margin-top: 20px;
              padding: 20px;
              width: 100%;
              border: 1px solid gray;
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
      </div>
    </div>
  );
}

export default DashboardPage;
