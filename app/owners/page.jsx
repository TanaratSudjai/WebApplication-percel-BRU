"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthWrapper from "../components/authComponents";

function Owners() {
  const [ownerData, setOwnerData] = useState({ owners: [] });
  const [showAddModal, setAddShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOwners = Array.isArray(ownerData.owners)
    ? ownerData.owners.filter((owner) =>
        owner.own_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
    console.log("Editing owner:", owner);
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
      title: "คุณแน่ใจว่าจะลบหรือไม่?",
      text: "คุณจะไม่สามารถนำมันกลับมาได้อีก!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#60d0ac",
      cancelButtonColor: "#e11d48",
      confirmButtonText: "ใช่ ลบไปเลย!",
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
              title: "ลบออกเรียบร้อย!",
              text: "ไฟล์ของคุณได้ถูกลบออกไปแล้ว.",
              icon: "success",
              confirmButtonColor: "#60d0ac",
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
      <div className="p-6 bg-white border h-[100vh] flex justify-center w-full">
        <div class="container mx-auto">
          <div className="bg-white rounded p-4 px-4 md:p-8 mb-6 h-[80vh]">
            <h1 className="text-center text-2xl font-bold">
              จัดการรายชื่อเจ้าของ
            </h1>
            <div className="flex justify-between">
              <div className="relative mt-4">
                <input
                  type="search"
                  class="focus:border-[#60d0ac] focus:border-2 relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                  placeholder="ค้นหาชื่อเจ้าของ"
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
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
              </div>

              <div className="mt-4">
                <button
                  className="bg-[#60d0ac] hover:bg-[#469e80] text-white font-bold py-2 px-4 rounded-md"
                  onClick={() => setAddShowModal(true)}
                >
                  เพิ่มชื่อ
                </button>
              </div>
            </div>

            <div className="md:container md:mx-auto">
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-white text-center">
                    <tr>
                      <th scope="col" class="px-2 py-3">
                        จัดการ
                      </th>
                      <th scope="col" class="px-6 py-3">
                        ชื่อเจ้าของ
                      </th>
                      <th scope="col" class="px-6 py-3">
                        เบอร์ติดต่อ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {filteredOwners.map((owner) => (
                      <tr key={owner.own_id} className="even:bg-gray-50">
                        <td className="text-center p-2 px-2 gap-2 w-3/12 ">
                          <div className="flex w-[175px] items-center justify-between px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                            <a
                              className="font-medium bg-green-100 text-[#60d0ac] rounded-full w-[75px] cursor-pointer select-none"
                              onClick={() => handleEditOwner(owner.own_id)}
                            >
                              แก้ไขรายชื่อ
                            </a>
                            <a
                              className="font-medium bg-red-100 text-rose-600 rounded-full w-[75px] cursor-pointer select-none"
                              onClick={() => deleteOwner(owner.own_id)}
                            >
                              ลบรายชื่อ
                            </a>
                          </div>
                        </td>
                        <td className="px-4 py-2 ">{owner.own_name}</td>
                        <td className="px-4 py-2 ">{owner.own_phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/*edit modal*/}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-neutral-300 bg-opacity-75">
            <div className="relative p-4 w-full max-w-[550px]">
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
                    className="text-white inline-flex items-center bg-[#60d0ac] hover:bg-[#469e80] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
            <div className="relative p-4 w-full max-w-[550px]">
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
                    className="text-white inline-flex items-center bg-[#60d0ac] hover:bg-[#469e80] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
