"use client"
import React, { useState, useEffect } from "react";

function Owners() {
  const [ownerData, setOwnerData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newOwner, setNewOwner] = useState({
    owner_name: "",
    owner_phone: "",
  });

  useEffect(() => {
    async function fetchOwner() {
      try {
        const response = await fetch("/api/owner");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setOwnerData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchOwner();
  }, []);

  async function addOwner(newOwnerData) {
    try {
      const response = await fetch("./api/owner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOwnerData),
      });
      if (!response.ok) {
        throw new Error("Failed to add owner");
      }
      const data = await response.json();
      setOwnerData((prevData) => [...prevData, data]);
      setShowModal(false); // Close the modal after adding owner
    } catch (error) {
      console.error("Error adding owner:", error);
    }
  }

  const handleAddOwner = (event) => {
    event.preventDefault();
    addOwner(newOwner);
  };

  return (
    <div className="m-2 font-sans w-full border-2 w-full items-center p-4">
      {/* Your existing code */}
      <div className="m-2 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setShowModal(true)}
        >
          เพิ่มชื่อ
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div id="crud-modal" tabindex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center w-full overflow-x-hidden overflow-y-auto">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Owner
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowModal(false)}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleAddOwner}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="owner_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" name="owner_name" id="owner_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type owner name" required value={newOwner.owner_name} onChange={(e) => setNewOwner({ ...newOwner, owner_name: e.target.value })} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="owner_phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                    <input type="text" name="owner_phone" id="owner_phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type owner phone" required value={newOwner.owner_phone} onChange={(e) => setNewOwner({ ...newOwner, owner_phone: e.target.value })} />
                  </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                  Add new owner
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-container rounded-xl border-2 shadow-md p-4 bg-white w-[50%]">
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
                <th scope="col" className="px-4 py-2 border">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ownerData && ownerData.owners && ownerData.owners.map((owner) => (
                <tr key={owner.own_id} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{owner.own_id}</td>
                  <td className="px-4 py-2 border">{owner.own_name}</td>
                  <td className="px-4 py-2 border">{owner.own_phone}</td>
                  <td>
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">
                      แก้ไขชื่อ
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                      ลบชื่อ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Owners;
