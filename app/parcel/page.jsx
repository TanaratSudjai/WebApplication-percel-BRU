"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AuthWrapper from "../components/authComponents";
import Swal from "sweetalert2";

function page() {
  const [parcelData, setParcelData] = useState({ dataParcel: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [comData, setComData] = useState([]);
  const [cateData, setCateData] = useState({dataparcel_category: []});
  const [showReceiveModal, setReceiveModal] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [selectedParcelId, setSelectedParcelId] = useState(null);

  const [delivereData, setDelivereData] = useState({ dataDelivere: [] });

  const [showDetailReceiveModal, setDetailReceiveModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const fetchCategoryParcel = async () => {
    try {
      const response = await axios.get("/api/parcel_category");
      setCateData(response.data);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    }
  };

  const fetchComData = async () => {
    try {
      const response = await axios.get("/api/company");
      setComData(response.data.datacompany);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

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
    fetchComData();
    fetchParcelData();
    fetchDelivereData();
    fetchCategoryParcel();
    const interval = setInterval(() => {
      fetchParcelData();
      fetchDelivereData();
    }, 1000);
    return () => clearInterval(interval);
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
          const response = await axios.delete(`/api/parcel/${parcelId}`);
          if (response.status === 200) {
            setParcelData((prevData) => ({
              ...prevData,
              parcels: prevData.dataParcel.filter(
                (parcel) => parcel.par_id !== parcelId
              ),
            }));
            Swal.fire({
              title: "ลบออกเรียบร้อย!!",
              text: "ไฟล์ของคุณได้ถูกลบออกไปแล้ว.",
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
            title: "รับสินค้าเรียบร้อย!",
            text: `พัสดุหมายเลข ${selectedParcel.par_real_id} ได้ถูกรับไปแล้ว.`,
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
      <div className="p-6 bg-white border h-[100vh] flex justify-center w-full">
        <div className="container mx-auto">
          <div className="bg-white rounded p-4 px-4 md:p-8 mb-6 h-[80vh]">
            <h1 className="text-center text-2xl font-bold">
              จัดการพัสดุในระบบ
            </h1>
            <div className="relative mt-4">
              <input
                type="search"
                className="w-[250px] focus:border-[#60d0ac] focus:border-2 relative m-0 block flex-auto rounded-full border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                placeholder="ค้นหาชื่อเจ้าของพัสดุ"
                aria-label="Search"
                id="exampleFormControlInput2"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <span
                className="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5"
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
            <div className="md:container md:mx-auto">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-white text-center">
                    <tr>
                      <th scope="col" className="px-2 py-3">
                        จัดการ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        รหัสพัสดุ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ชื่อบริษัท
                      </th>
                      <th scope="col" className="px-6 py-3">
                        รหัสประเภทพัสดุประเภท
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ชื่อเจ้าของ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ชื่อพนักงาน
                      </th>
                      <th scope="col" className="px-6 py-3">
                        เบอร์ติดต่อ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        เวลารับสินค้า
                      </th>
                      <th scope="col" className="px-6 py-3">
                        สถานะ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {filteredParcels.map((parcel) => (
                      <tr key={parcel.par_id}>
                        <td className="px-6 py-4 ">
                          <div className="flex w-[150px] items-center justify-between px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                            <a
                              className="font-medium bg-red-100 text-rose-600 rounded-full w-[50px] cursor-pointer select-none"
                              onClick={() => deleteParcel(parcel.par_id)}
                            >
                              ลบ
                            </a>

                            <a
                              className={`font-medium rounded-full w-[75px] ${
                                parcel.Status?.sta_id === 2
                                  ? "bg-green-100 text-[#60d0ac] cursor-pointer select-none"
                                  : "bg-amber-100 text-amber-500 cursor-pointer select-none"
                              }`}
                              onClick={
                                parcel.Status?.sta_id === 2
                                  ? () => handleReceiveDetail(parcel.par_id)
                                  : () => handleReceiver(parcel.par_id)
                              }
                            >
                              {parcel.Status?.sta_id === 2
                                ? "รายละเอียด"
                                : "กดรับสินค้า"}
                            </a>
                          </div>
                        </td>

                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-black whitespace-nowrap"
                        >
                          {parcel.par_real_id}
                        </th>
                        

                        <th scope="row" className="px-6 py-4">
                          {parcel.Company?.com_name}
                        </th>

                        <th scope="row" className="px-6 py-4">
                          {parcel.CategoryParcel?.categoryparcel_name}
                        </th>

                        <td className="px-6 py-4"> {parcel.Owner?.own_name}</td>
                        <td className="px-6 py-4">
                          {parcel.Staff?.staff_name || "N/A"}
                        </td>
                        <td className="px-6 py-4">{parcel.Owner?.own_phone}</td>
                        <td className="px-6 py-4">
                          {" "}
                          {formatDateTime(parcel.pickupsdate)}
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`flex w-[75px] items-center justify-center px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              parcel.Status?.sta_id === 1
                                ? "bg-red-100 text-rose-600 select-none"
                                : parcel.Status?.sta_id === 2
                                ? "bg-green-100 text-[#60d0ac] select-none"
                                : "bg-gray-100 text-gray-800 select-none"
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
            <div className="fixed inset-0 z-50 flex justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-neutral-900 bg-opacity-45">
              <div className="relative p-4 w-full max-w-[550px] animate-sweetAlertPopUp">
                <div className="p-3 rounded-2xl bg-white shadow-xl w-full max-w-md">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                      รายละเอียดการรับสินค้า
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
                          className="text-gray-800 text-sm mb-2 block"
                        >
                          ชื่อผู้รับสินค้า
                        </label>
                        <input
                          type="text"
                          name="receiverName"
                          id="receiverName"
                          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                          placeholder="Receiver Name"
                          value={receiverName}
                          readOnly
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="deliveryDate"
                          className="text-gray-800 text-sm mb-2 block"
                        >
                          วันที่รับสินค้า
                        </label>
                        <input
                          type="text"
                          name="deliveryDate"
                          id="deliveryDate"
                          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                          placeholder="Delivery Date"
                          value={deliveryDate}
                          readOnly
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="ownerName"
                          className="text-gray-800 text-sm mb-2 block"
                        >
                          ชื่อเจ้าของสินค้า
                        </label>
                        <input
                          type="text"
                          name="ownerName"
                          id="ownerName"
                          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
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

          <style jsx>{`
            @keyframes sweetAlertPopUp {
              0% {
                transform: scale(0.5);
                opacity: 0;
              }
              80% {
                transform: scale(1.05);
                opacity: 1;
              }
              100% {
                transform: scale(1);
              }
            }
            .animate-sweetAlertPopUp {
              animation: sweetAlertPopUp 0.3s ease-out forwards;
            }
          `}</style>

          {/* ReceiveModal modal */}
          {showReceiveModal && (
            <div className="fixed inset-0 z-50 flex justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-neutral-900 bg-opacity-45">
              <div className="relative p-4 w-full max-w-[550px] animate-sweetAlertPopUp">
                <div className="p-3 rounded-2xl bg-white shadow-xl w-full max-w-md">
                  <div className="flex items-center justify-between rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                      ฟอร์มการรับสินค้า
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:bg-orange-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-orange-600 dark:hover:text-white"
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
                          className="text-gray-800 text-sm mb-2 block"
                        >
                          ชื่อผู้รับสินค้า
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                            placeholder="กรอกชื่อผู้รับ"
                            required
                            value={receiverName}
                            onChange={(e) => setReceiverName(e.target.value)}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#bbb"
                            stroke="#bbb"
                            className="w-4 h-4 absolute right-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="10"
                              cy="7"
                              r="6"
                              data-original="#000000"
                            ></circle>
                            <path
                              d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#60d0ac] hover:bg-[#469e80] text-white py-3 rounded-md  transition duration-300 ease-in-out"
                    >
                      ยืนยันการรับของ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
}

export default page;
