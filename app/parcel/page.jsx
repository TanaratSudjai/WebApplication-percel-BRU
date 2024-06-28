"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AuthWrapper from "../components/authComponents";
function page() {
  const [parcelData, setParcelData] = useState({ dataParcel: [] });

  useEffect(() => {
    const fetchParcelData = async () => {
      try {
        const response = await axios.get("/api/parcel"); // Replace with your API endpoint
        const data = response.data;
        setParcelData(data); // Ensure data matches the structure of your response
      } catch (error) {
        console.error("Error fetching parcel data:", error);
      }
    };

    fetchParcelData();
  }, []);

  if (!parcelData) {
    return (
      <div className="mx-auto flex h-[100vh] justify-center items-center w-full text-2xl">
        Loading...
      </div>
    );
  }

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString('en-GB', options); // Use 'en-GB' or any locale you prefer
  };

  return (
    <AuthWrapper>
    <div className="p-6 bg-gray-100 flex justify-center w-full">
      <div class="container mx-auto">
        <h2 class="font-semibold text-xl text-gray-600">Responsive Form</h2>

        <div className="h-[90%] bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
            {/* Parcels Table */}
            <div className="dashboard-container rounded-xl border-2 shadow-md p-4 bg-white">
              <h2 className="text-lg font-semibold mb-4">Parcels Table</h2>
              <div className="table-container h-[500px] overflow-y-auto">
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
                        phone
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
                    {parcelData.dataParcel &&
                      Array.isArray(parcelData.dataParcel) &&
                      parcelData.dataParcel.map((parcel) => (
                        <tr key={parcel.par_id} className="even:bg-gray-50 text-center">
                          <td className="px-4 py-2 border">{parcel.par_id}</td>
                          <td className="px-4 py-2 border">
                            {parcel.par_real_id}
                          </td>
                          <td className="px-4 py-2 border">
                            {parcel.Owner?.own_name}
                          </td>
                          <td className="px-4 py-2 border">
                            {parcel.Staff?.staff_name || "N/A"}
                          </td>
                          <td className="px-4 py-2 border w-2/12">
                            {parcel.Owner?.own_phone}
                          </td>
                          <td className="px-4 py-2 border w-2/12">
                            {formatDateTime(parcel.pickupsdate)}
                          </td>
                          <td className="px-4 py-2 border w-2/12">
                            <div className="flex items-center justify-center px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {parcel.Status?.sta_name || "N/A"}
                            </div>
                          </td>
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

export default page;
