"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AuthWrapper from "../components/authComponents";
function page() {
  const [parcelData, setParcelData] = useState({ dataParcel: [] });
  const [searchQuery, setSearchQuery] = useState("");

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
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-GB", options); // Use 'en-GB' or any locale you prefer
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredParcels = Array.isArray(parcelData.dataParcel)
    ? parcelData.dataParcel.filter((parcel) =>
        parcel.Owner?.own_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <AuthWrapper>
      <div className="p-6 bg-gray-100 flex justify-center w-full">
        <div class="container mx-auto">
          <h2 class="font-semibold text-xl text-gray-600">Responsive Form</h2>

          <div className="h-[90%] bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="flex w-full mb-3 justify-end gap-2 relative">
            <div>
              <h1 className="mt-2">ค้นหาชื่อเจ้าของ : </h1>
              </div>
            
              <div class="relative">
                <input
                  type="search"
                  class="focus:border-blue-500 focus:border-2 relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                  placeholder="Search"
                  aria-label="Search"
                  id="exampleFormControlInput2"
                  aria-describedby="button-addon2"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <span
                  class="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5"
                  id="button-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
              </div>
            </div>

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
                      {filteredParcels.map((parcel) => (
                        <tr
                          key={parcel.par_id}
                          className="even:bg-gray-50 text-center"
                        >
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
