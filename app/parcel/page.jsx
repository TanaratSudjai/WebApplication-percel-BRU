"use client"
import React, { useState, useEffect } from "react";

function page() {
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
    <div className="p-6 bg-gray-100 flex justify-center w-full">
      <div class="container mx-auto">
        <h2 class="font-semibold text-xl text-gray-600">Responsive Form</h2>

        <div className="h-[90%] bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
            <table class="w-full table-fixed">
              <thead>
                <tr class="bg-gray-100">
                  <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    Name
                  </th>
                  <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    Email
                  </th>
                  <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    Phone
                  </th>
                  <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr>
                  <td class="py-4 px-6 border-b border-gray-200">John Doe</td>
                  <td class="py-4 px-6 border-b border-gray-200 truncate">
                    johndoe@gmail.com
                  </td>
                  <td class="py-4 px-6 border-b border-gray-200">
                    555-555-5555
                  </td>
                  <td class="py-4 px-6 border-b border-gray-200">
                    <span class="bg-green-500 text-white py-1 px-2 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="py-4 px-6 border-b border-gray-200">Jane Doe</td>
                  <td class="py-4 px-6 border-b border-gray-200 truncate">
                    janedoe@gmail.com
                  </td>
                  <td class="py-4 px-6 border-b border-gray-200">
                    555-555-5555
                  </td>
                  <td class="py-4 px-6 border-b border-gray-200">
                    <span class="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                      Inactive
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="py-4 px-6 border-b border-gray-200">Jane Doe</td>
                  <td class="py-4 px-6 border-b border-gray-200 truncate">
                    janedoe@gmail.com
                  </td>
                  <td class="py-4 px-6 border-b border-gray-200">
                    555-555-5555
                  </td>
                  <td class="py-4 px-6 border-b border-gray-200">
                    <span class="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                      Inactive
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="py-4 px-6 border-b border-gray-200">Jane Doe</td>
                  <td class="py-4 px-6 border-b border-gray-200 truncate">
                    janedoe@gmail.com
                  </td>
                  <td class="py-4 px-6 border-b border-gray-200">
                    555-555-5555
                  </td>
                  <td class="py-4 px-6 border-b border-gray-200">
                    <span class="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                      Inactive
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

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
                        <td className="px-4 py-2 border w-3/12">
                          {parcel.staff_name}
                        </td>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
