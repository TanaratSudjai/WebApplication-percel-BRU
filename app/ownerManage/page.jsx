"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const HelloOwnerPage = () => {
  const { data: session, status } = useSession();
  const [parcelData, setParcelData] = useState({ parcelOwner: [] });
  const [parcelData1, setParcelData1] = useState({ dataParcel: [] });

  const [showReceiveModal, setReceiveModal] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [selectedParcelId, setSelectedParcelId] = useState(null);

  const [delivereData, setDelivereData] = useState({ dataDelivere: [] });

  const [showDetailReceiveModal, setDetailReceiveModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const fetchParcelData1 = async () => {
    if (session) {
      try {
        const response = await axios.get(`/api/parcel`);
        const data = response.data;

        setParcelData1(data);
      } catch (error) {
        console.error("Error fetching parcel data:", error);
      }
    }
  };
  const fetchParcelData = async () => {
    if (session) {
      try {
        const response = await axios.get(`/api/parcelowner/${session.user.id}`);
        const data = response.data;
        setParcelData(data); // Ensure data matches the structure of your response
      } catch (error) {
        console.error("Error fetching parcel data:", error);
      }
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
    fetchDelivereData();
    fetchParcelData();
    fetchParcelData1();

    const interval = setInterval(() => {
      fetchDelivereData();
      fetchParcelData();
      fetchParcelData1();
    }, 1000);
    return () => clearInterval(interval);
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-GB", options);
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
    const parcel = parcelData1.dataParcel.find(
      (parcel) => parcel.par_id === id
    );
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
    const selectedParcel = parcelData1.dataParcel.find(
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
          const updatedData = parcelData.parcelOwner.map((parcel) =>
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
    <div className="min-h-screen w-[100%] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-[100%] ">
        <h1 className="text-2xl font-bold mb-4">Hello, {session.user.name}!</h1>
        <p>Phone: {session.user.phone}</p>
        <div className="dashboard-container w-[100%] rounded-xl border-2 shadow-md p-4 bg-white">
          <h2 className="text-lg font-semibold mb-4">Parcels Table</h2>
          <div className="table-container h-[500px] overflow-y-auto">
            <table className="data-table w-[100%] border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-2 border">
                    Action
                  </th>
                  <th scope="col" className="px-4 py-2 border">
                    Real ID
                  </th>
                  <th scope="col" className="px-4 py-2 border">
                    Owner Name
                  </th>
                  <th scope="col" className="px-4 py-2 border">
                    Owner Phone
                  </th>
                  <th scope="col" className="px-4 py-2 border">
                    Staff Name
                  </th>
                  <th scope="col" className="px-4 py-2 border">
                    Pickup Date
                  </th>
                  <th scope="col" className="px-4 py-2 border">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="w-[100%]">
                {parcelData.parcelOwner &&
                  parcelData.parcelOwner.map((parcel) => (
                    <tr
                      key={parcel.par_id}
                      className="even:bg-gray-50 text-center"
                    >
                      <td className="px-4 py-2 border">
                        <div className="flex gap-2 justify-center">
                          {/* Add your actions here */}
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
                      <td className="px-4 py-2 border">{parcel.par_real_id}</td>
                      <td className="px-4 py-2 border">
                        {parcel.Owner.own_name}
                      </td>
                      <td className="px-4 py-2 border">
                        {parcel.Owner.own_phone}
                      </td>
                      <td className="px-4 py-2 border">
                        {parcel.Staff?.staff_name || "N/A"}
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
    </div>
  );
};

export default HelloOwnerPage;
