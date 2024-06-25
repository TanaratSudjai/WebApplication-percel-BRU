"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthWrapper from "../components/authComponents";

function Owners() {
  const [ownerData, setOwnerData] = useState([]);
  const [showAddModal, setAddShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);

  const [newOwner, setNewOwner] = useState({
    name: "",
    phone: "",
  });

  const [editOwner, setEditOwner] = useState({
    id: "",
    ownerName: "",
    phone: "",
  });

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/owner");
      setOwnerData(res.data);
      
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleEditOwner = (id) => {
    const owner = ownerData.owners.find((owner) => owner.own_id === id);
    console.log('Editing owner:', owner); // Add this line to log the owner data
    if (owner) {
      setEditOwner({
        id: owner.own_id,
        name: owner.own_name,
        phone: owner.own_phone,
      });
      setEditShowModal(true);
    }
  };

  const handleInputChange = (e) => {
    setEditOwner({
      ...editOwner,
      [e.target.name]: e.target.value,
    });
  };

  const handleInsertOwner = async (e) => {
    e.preventDefault();
    try {
      const ownerId = editOwner.id;
      if (!ownerId) {
        throw new Error("Owner ID is not defined");
      }
      console.log("Updating owner:", editOwner); // Log editOwner before the request
      await axios.put(`/api/owner/${ownerId}`, {
        ownerName: editOwner.name,
        phone: editOwner.phone,
      });

      fetchData(); // Refresh the owner data
      setEditShowModal(false); // Close modal after successful update
    } catch (err) {
      console.error("Error updating owner:", err);
    }
  };

  useEffect(() => {
    fetchData();

    
  }, []);

  const addOwner = async (newOwnerData) => {
    try {
      const response = await axios.post("/api/owner", newOwnerData);
      setOwnerData((prevData) =>
        Array.isArray(prevData) ? [...prevData, response.data] : [response.data]
      );
      setAddShowModal(false);
      setNewOwner({
        name: "",
        phone: "",
      });
      fetchData(); // GET
    } catch (error) {
      console.error("Error adding owner:", error);
    }
  };

  const handleAddOwner = (event) => {
    event.preventDefault();
    addOwner(newOwner);
  };

  const deleteOwner = async (ownerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/api/owner/${ownerId}`);
          if (response.status === 200) {
            setOwnerData((prevData) =>
              Array.isArray(prevData)
                ? prevData.filter((owner) => owner.own_id !== ownerId)
                : prevData
            );

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            fetchData(); // GET
          } else {
            throw new Error("Failed to delete owner");
          }
        } catch (error) {
          console.error("Error deleting owner:", error);

          Swal.fire({
            title: "Error!",
            text: "Failed to delete owner.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <AuthWrapper>
    <div className="font-sans w-full items-center bg-gray-100 p-5">
      <div className="flex bg-white p-7 w-full items-center mb-3 rounded-xl">
        <h1 className="text-xl text-gray-500 font-semibold dark:text-black mt-[-20px]">
          Owner Manager
        </h1>
      </div>
      <div className="dashboard-container rounded-xl border-2 shadow-md p-4 bg-white w-[100%] h-[90%] ">
        <div className="m-2 mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => setAddShowModal(true)}
          >
            เพิ่มชื่อ
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-4">Owners Table</h2>

        <div className="table-container h-[540px] overflow-y-auto relative">
          <table className="data-table min-w-full border-collapse">
            <thead className="bg-gray-100 sticky top-[-3px]">
              <tr>
                <th scope="col" className="px-4 py-3 border w-1/12">
                  ID
                </th>
                <th scope="col" className="px-4 py-3 border w-4/12">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 border w-4/12">
                  Phone
                </th>
                <th scope="col" className="px-4 py-3 border w-3/12">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ownerData.owners &&
                ownerData.owners.map((owner) => (
                  <tr key={owner.own_id} className="even:bg-gray-50">
                    <td className="px-2 py-2 border w-1/12">{owner.own_id}</td>
                    <td className="px-4 py-2 border w-4/12">
                      {owner.own_name}
                    </td>
                    <td className="px-4 py-2 border w-4/12">
                      {owner.own_phone}
                    </td>
                    <td className="text-center p-2 border px-2 gap-2 w-3/12 ">
                      <button
                        className="bg-amber-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
                        onClick={() => handleEditOwner(owner.own_id)}
                      >
                        แก้ไขชื่อ
                      </button>
                      <button
                        onClick={() => deleteOwner(owner.own_id)}
                        className="ml-1 bg-rose-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                      >
                        ลบชื่อ
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*edit modal*/}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-neutral-300 bg-opacity-75">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                  Edit Owner
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-orange-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-orange-600 dark:hover:text-white"
                  onClick={() => setEditShowModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleInsertOwner}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type owner name"
                      required
                      value={editOwner.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type owner phone"
                      required
                      value={editOwner.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Update Owner
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/*add modal*/}
      {showAddModal && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-neutral-300 bg-opacity-75"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                  Create New Owner
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-orange-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-orange-600 dark:hover:text-white"
                  onClick={() => setAddShowModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleAddOwner}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type owner name"
                      required
                      value={newOwner.name}
                      onChange={(e) =>
                        setNewOwner({ ...newOwner, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type owner phone"
                      required
                      value={newOwner.phone}
                      onChange={(e) =>
                        setNewOwner({ ...newOwner, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add new owner
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </AuthWrapper>
  );
}

export default Owners;
