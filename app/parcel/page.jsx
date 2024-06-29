"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AuthWrapper from "../components/authComponents";
import Swal from "sweetalert2";

function page() {
  const [parcelData, setParcelData] = useState({ dataParcel: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [showReceiveModal, setReceiveModal] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [selectedParcelId, setSelectedParcelId] = useState(null);

  const [delivereData, setDelivereData] = useState({ dataDelivere: [] });

  const [showDetailReceiveModal, setDetailReceiveModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [ownerName, setOwnerName] = useState("");


  const fetchParcelData = async () => {
    try {
      const response = await axios.get("/api/parcel"); // Replace with your API endpoint
      const data = response.data;
      setParcelData(data); // Ensure data matches the structure of your response
    } catch (error) {
      console.error("Error fetching parcel data:", error);
    }
  };

  const fetchDelivereData = async () => {
    try {
      const response = await axios.get("/api/deliverend");
      setDelivereData({ dataDelivernd: response.data.dataDelivernd });
    } catch (error) {
      console.error("Error fetching delivery data:", error);
    }
  };

  useEffect(() => {
    fetchParcelData();
    fetchDelivereData();
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

  const deleteParcel = async (parcelId) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#60d0ac",
      cancelButtonColor: "#e11d48",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/api/parcel/${parcelId}`);
          if (response.status === 200) {
            setParcelData((prevData) => ({
              ...prevData,
              parcels: prevData.dataParcel.filter(
                (parcel) => parcel.par_id !== parcelId
              ),
            }));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              confirmButtonColor: "#60d0ac",
            });
            fetchParcelData(); // Refresh data
          } else {
            fetchParcelData();
            throw new Error("Failed to delete parcel");
          }
        } catch (error) {
          console.error("Error deleting parcel:", error);
          fetchParcelData();

          Swal.fire({
            title: "Error!",
            text: "Failed to delete parcel.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleReceiveDetail = (id) => {
    fetchDelivereData();
    const delivere = delivereData.dataDelivernd.find(
      (delivere) => delivere.par_id === id
    );
    console.log("Editing owner:", delivere);
    if (delivere) {
      setReceiverName(delivere.deliver_name || "");
      setDeliveryDate(
        delivere.deliverydate
          ? new Date(delivere.deliverydate).toLocaleString()
          : ""
      );
      setOwnerName(delivere.own_name || "");
      setSelectedParcelId(id);
      setDetailReceiveModal(true);
    }
  };

  const handleReceiver = (id) => {
    const parcel = parcelData.dataParcel.find((parcel) => parcel.par_id === id);
    console.log("Editing owner:", parcel);
    if (parcel) {
      setReceiverName(parcel.Owner?.own_name || "");
      setSelectedParcelId(id);
      setReceiveModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the selected parcel data from the state
    const selectedParcel = parcelData.dataParcel.find(
      (parcel) => parcel.par_id === selectedParcelId
    );
    if (!selectedParcel || !selectedParcel.Owner) {
      Swal.fire({
        title: "Error!",
        text: "Parcel or owner data is missing.",
        icon: "error",
        confirmButtonColor: "#60d0ac",
      });
      return; // Exit if parcel or owner data is missing
    }

    try {
      // Update the parcel's status
      const response = await axios.put(`/api/parcel/${selectedParcelId}`, {
        receiverName,
        status: 2, // Received status
      });

      if (response.status === 200) {
        // Send data to /api/delivered
        const deliveredResponse = await axios.post("/api/deliverend", {
          parcelID: selectedParcelId,
          ownerID: selectedParcel.Owner.own_id,
          deliver_name: receiverName,
        });

        if (deliveredResponse.status === 200) {
          Swal.fire({
            title: "Updated!",
            text: "Parcel status and delivery record updated successfully.",
            icon: "success",
            confirmButtonColor: "#60d0ac",
          });

          // Refresh parcel data
          const updatedData = parcelData.dataParcel.map((parcel) =>
            parcel.par_id === selectedParcelId
              ? {
                  ...parcel,
                  Owner: { ...parcel.Owner, own_name: receiverName },
                  Status: { ...parcel.Status, sta_id: 2 }, // Update the status in the local state
                }
              : parcel
          );
          setParcelData({ dataParcel: updatedData });
          setReceiveModal(false);
          fetchParcelData();
        } else {
          throw new Error("Failed to create delivery record");
        }
      } else {
        throw new Error("Failed to update parcel");
      }
    } catch (error) {
      console.error(
        "Error updating parcel or creating delivery record:",
        error
      );
      Swal.fire({
        title: "Error!",
        text: "Failed to update parcel or create delivery record.",
        icon: "error",
      });
    }
    fetchParcelData();
    fetchDelivereData();
  };

  return (
    <AuthWrapper>
      <div className="p-6 bg-gray-100 flex justify-center w-full">
        <div class="container mx-auto">
          {/* Detail Receive Modal */}
          {showDetailReceiveModal && (
            <div className="fixed inset-0 z-50 flex justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-neutral-300 bg-opacity-75">
              <div className="relative p-4 w-full max-w-[550px]">
                <div className="relative bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                      Receive Detail
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-orange-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-orange-600 dark:hover:text-white"
                      onClick={() => setDetailReceiveModal(false)}
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
                  <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="receiverName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                          Receiver Name
                        </label>
                        <input
                          type="text"
                          name="receiverName"
                          id="receiverName"
                          className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Receiver Name"
                          value={receiverName}
                          readOnly
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="deliveryDate"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                          Delivery Date
                        </label>
                        <input
                          type="text"
                          name="deliveryDate"
                          id="deliveryDate"
                          className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Delivery Date"
                          value={deliveryDate}
                          readOnly
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="ownerName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                          Owner Name
                        </label>
                        <input
                          type="text"
                          name="ownerName"
                          id="ownerName"
                          className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Owner Name"
                          value={ownerName}
                          readOnly
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ReceiveModal modal */}
          {showReceiveModal && (
            <div className="fixed inset-0 z-50 flex justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-neutral-300 bg-opacity-75">
              <div className="relative p-4 w-full max-w-[550px]">
                <div className="relative bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                      Receive Form
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-orange-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-orange-600 dark:hover:text-white"
                      onClick={() => setReceiveModal(false)}
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
                  <form className="p-4 md:p-5" onSubmit={handleSubmit}>
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
                          value={receiverName}
                          onChange={(e) => setReceiverName(e.target.value)}
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

          <h2 class="font-semibold text-xl text-gray-600">Responsive Form</h2>

          <div className="h-[90%] bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="flex w-full mb-3 justify-end gap-2 relative">
              <div>
                <h1 className="mt-2">ค้นหาชื่อเจ้าของ : </h1>
              </div>

              <div class="relative">
                <input
                  type="search"
                  class="focus:border-[#60d0ac] focus:border-2 relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
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
                          Action
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
                          <td className="px-4 py-2 border">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => deleteParcel(parcel.par_id)}
                                className="w-[100] px-3 text-sm tracking-wide rounded-lg text-white bg-rose-600 hover:bg-red-700 focus:outline-none"
                              >
                                ลบ
                              </button>

                              <button
                                onClick={
                                  parcel.Status?.sta_id === 2
                                    ? () => handleReceiveDetail(parcel.par_id)
                                    : () => handleReceiver(parcel.par_id)
                                }
                                className={`w-[100] px-3 text-sm tracking-wide rounded-lg text-white focus:outline-none ${
                                  parcel.Status?.sta_id === 2
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-amber-600 hover:bg-red-700"
                                }`}
                              >
                                {parcel.Status?.sta_id === 2
                                  ? "รายละเอียด"
                                  : "รับสินค้า"}
                              </button>
                            </div>
                          </td>
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
                            <div
                              className={`flex items-center justify-center px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                parcel.Status?.sta_id === 1
                                  ? "bg-red-100 text-rose-600"
                                  : parcel.Status?.sta_id === 2
                                  ? "bg-green-100 text-[#60d0ac]"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
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
