"use client";
import React, { useState, useEffect } from "react";
import AuthWrapper from "../components/authComponents";


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
    return (
      <div className="mx-auto flex h-[100vh] justify-center items-center w-full text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <AuthWrapper>
    <div className="m-2 font-sans w-full">
      <div className="flex gap-4 mt-3">
        <div className="h-[90vh] overflow-y-auto w-full">
          <div className="grid grid-cols-2 gap-4">
            {/* Staff Table */}
            <div className="dashboard-container rounded-xl border-2 shadow-md p-4 bg-white">
              <h2 className="text-lg font-semibold mb-4">Staff Table</h2>
              <div className="table-container h-[150px] overflow-y-auto">
                <table className="data-table min-w-full border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2 border">
                        Name
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        email
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.staff.map((staff) => (
                      <tr key={staff.staff_id} className="even:bg-gray-50">
                        <td className="px-4 py-2 border">{staff.staff_name}</td>
                        <td className="px-4 py-2 border">{staff.email}</td>
                        <td className="px-4 py-2 border">
                          {staff.staff_phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Status Table */}
            <div className="dashboard-container rounded-xl border-2 shadow-md p-4 bg-white">
              <h2 className="text-lg font-semibold mb-4">Status Table</h2>
              <div className="table-container overflow-y-auto">
                <table className="data-table min-w-full border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2 border">
                        ID
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.status.map((status) => (
                      <tr key={status.sta_id} className="even:bg-gray-50">
                        <td className="px-4 py-2 border">{status.sta_id}</td>
                        <td className="px-4 py-2 border">{status.sta_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            

            {/* Parcels Table */}
            <div className="dashboard-container rounded-xl border-2 shadow-md p-4 bg-white">
              <h2 className="text-lg font-semibold mb-4">Parcels Table</h2>
              <div className="table-container h-[300px] overflow-y-auto">
                <table className="data-table min-w-full border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2 border">
                        ID
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        Real ID
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        Owner ID
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        Staff ID
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        Pickup Date
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        Status ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.parcels.map((parcel) => (
                      <tr key={parcel.par_id} className="even:bg-gray-50">
                        <td className="px-4 py-2 border">{parcel.par_id}</td>
                        <td className="px-4 py-2 border">
                          {parcel.par_real_id}
                        </td> 
                        <td className="px-4 py-2 border">{parcel.own_name}</td>
                        <td className="px-4 py-2 border w-3/12">{parcel.staff_name}</td>
                        <td className="px-4 py-2 border">
                          {parcel.pickupsdate}
                        </td>
                        <td className="px-4 py-2 border">{parcel.sta_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delivers Table */}
            <div className="dashboard-container rounded-xl border-2 shadow-md p-4 bg-white">
              <h2 className="text-lg font-semibold mb-4">Delivers Table</h2>
              <div className="table-container h-[360px] overflow-y-auto">
                <table className="data-table min-w-full border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2 border">
                        DELIVERS ID
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        PARCEL ID
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        OWNER ID
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        DATE/TIME
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        NAME
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.delivers.map((delivered) => (
                      <tr key={delivered.del_id} className="even:bg-gray-50">
                        <td className="px-4 py-2 border">{delivered.del_id}</td>
                        <td className="px-4 py-2 border">{delivered.par_id}</td>
                        <td className="px-4 py-2 border">{delivered.own_id}</td>
                        <td className="px-4 py-2 border">
                          {delivered.deliverydate}
                        </td>
                        <td className="px-4 py-2 border">
                          {delivered.deliver_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Owners Table */}
            <div className="dashboard-container rounded-xl border-2 shadow-md p-4 bg-white">
              <h2 className="text-lg font-semibold mb-4">Owners Table</h2>
              <div className="table-container h-[150px] overflow-y-auto">
                <table className="data-table min-w-full border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2 border">
                        ID
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        Name
                      </th>
                      <th scope="col" className="px-4 py-2 border">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.owners.map((owner) => (
                      <tr key={owner.own_id} className="even:bg-gray-50">
                        <td className="px-4 py-2 border">{owner.own_id}</td>
                        <td className="px-4 py-2 border">{owner.own_name}</td>
                        <td className="px-4 py-2 border">{owner.own_phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AuthWrapper>
  );
}

export default DashboardPage;
