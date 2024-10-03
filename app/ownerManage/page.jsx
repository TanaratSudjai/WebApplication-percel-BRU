"use client";
import { useSession, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoadingPage from "../components/lodding";
import Image from "next/image";
import { Inter } from "next/font/google";

const HelloOwnerPage = () => {
  const { data: session, status } = useSession();
  const [parcelData, setParcelData] = useState({ parcelOwner: [] });
  const [oneParcelData, setOneParcelData] = useState({
    parcelOwnerStatusOne: [],
  });
  const [parcelData1, setParcelData1] = useState({ dataParcel: [] });

  const [showReceiveModal, setReceiveModal] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [selectedParcelId, setSelectedParcelId] = useState(null);

  const [delivereData, setDelivereData] = useState({ dataDelivernd: [] });

  const [showDetailReceiveModal, setDetailReceiveModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const [activeButton, setActiveButton] = useState("all"); // Initial state can be 'all' or 'unreceived'

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
      fetchParcelData1();
    }, 1000);
    return () => clearInterval(interval);
  }, [session]);

  if (status === "loading") {
    return (
      <div>
        <LoadingPage />
      </div>
    );
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
            title: "รับสินค้าเรียบร้อย!",
            text: "ท่านได้รับพัสดุไปเป้นที่เรียบร้อยแล้ว.",
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

  const router = useRouter();
  const handleLogout = async (e) => {
    return router.push("/ownerLogin");
  };

  const handleViewUnreceived = async () => {
    try {
      const response = await axios.get(`/api/parcelowner/${session.user.id}`);
      setParcelData({ parcelOwner: response.data.parcelOwnerStatusOne });
      if (
        !response.data.parcelOwnerStatusOne ||
        response.data.parcelOwnerStatusOne.length === 0
      ) {
        Swal.fire({
          title: "Warning!",
          text: "ไม่พบสินค้าที่ยังไม่ได้รับ",
          icon: "warning",
          confirmButtonColor: "#60d0ac",
        });
        fetchParcelData();
      } else {
        // Handle displaying unreceived parcels as needed
      }
    } catch (error) {
      console.error("Error fetching unreceived parcels:", error);
      Swal.fire({
        title: "Error!",
        text: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าที่ยังไม่ได้รับ",
        icon: "error",
        confirmButtonColor: "#60d0ac",
      });
    }
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    if (buttonType === "all") {
      fetchParcelData();
    } else if (buttonType === "unreceived") {
      handleViewUnreceived();
    }
  };

  return (
    <div className="container-sm w-full mt-4">
      <div className="min-h-screen w-full flex flex-col items-center">
      <div className="flex justify-end">
        <button
          onClick={async () => {
            await signOut();
            router.push("/ownerLogin");
          }}
          className="flex items-center text-black px-3 py-1 rounded-lg focus:outline-none shadow-xl"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z"
              fill="#FF0000"
            />
          </svg>
          ออกจากระบบ
        </button>

      </div>
        <div className="p-8 rounded w-full max-w-screen-lg">
          <h1 className="text-2xl font-bold text-center sm:mb-1">สวัสดีครับ</h1>
          <h1 className="text-2xl font-bold mb-4 text-center">
            {session.user.name}
          </h1>

          <p className="text-sm mb-4 text-center">
            เบอร์โทร: {session.user.phone}
          </p>
        </div>

        <div className="flex sm:flex-row justify-center gap-[-20px] border-t-2 border-b-2 mt-4 sm:mt-2 w-full mt-[-10px]">
          <div className="flex w-[90%] justify-center gap-5">
            <button
              onClick={() => handleButtonClick("all")}
              className={`w-full text-black px-3 py-1 focus:outline-none self-start sm:self-center w-full sm:w-auto ${
                activeButton === "all" ? "border-b-2 border-green-600" : ""
              }`}
            >
              สินค้าทั้งหมด
            </button>
            <button
              onClick={() => handleButtonClick("unreceived")}
              className={`w-full text-black px-3 py-1 focus:outline-none self-start sm:self-center w-full sm:w-auto ${
                activeButton === "unreceived"
                  ? "border-b-2 border-green-600"
                  : ""
              }`}
            >
              สินค้าที่ไม่ได้รับ
            </button>
          </div>
        </div>

        <div className="container-sm w-full px-4 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-3 py-2">
            {parcelData.parcelOwner &&
              parcelData.parcelOwner.map((parcel) => (
                <div
                  key={parcel.par_id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col shadow-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={
                        parcel.Status?.sta_id === 2
                          ? () => handleReceiveDetail(parcel.par_id)
                          : () => handleReceiver(parcel.par_id)
                      }
                      className={`px-2 py-1 text-sm tracking-wide rounded-full border focus:outline-none ${
                        parcel.Status?.sta_id === 2
                          ? "text-black border-black cursor-pointer select-none"
                          : "text-black border-[#60d0ac] cursor-pointer select-none"
                      }`}
                    >
                      {parcel.Status?.sta_id === 2 ? "รายละเอียด" : "รับสินค้า"}
                    </button>
                  </div>
                  <div className="flex-grow">
                    <p className="flex mb-1 justify-between">
                      <strong>รหัสพัสดุ</strong> {parcel.par_real_id}
                    </p>
                    <p className="flex mb-1 justify-between">
                      <strong>พนักงานผู้รับ</strong>{" "}
                      {parcel.Staff?.staff_name || "N/A"}
                    </p>
                    <p className="flex mb-1 justify-between">
                      <strong>วันที่/เวลา</strong>{" "}
                      {formatDateTime(parcel.pickupsdate)}
                    </p>
                    <hr />
                    <p className="flex justify-between mt-2">
                      <strong>สถานะ</strong>
                      <span
                        className={`ml-2 px-2 inline-flex leading-5 font-semibold rounded-full ${
                          parcel.Status?.sta_id === 1
                            ? "text-rose-600 font-bold text-sm"
                            : parcel.Status?.sta_id === 2
                            ? "text-[#60d0ac] font-bold text-sm"
                            : "text-gray-800 font-bold text-sm"
                        }`}
                      >
                        {parcel.Status?.sta_name || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
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
                <div className="flex justify-center mt-[-40]">
                  <Image
                    src="/realogo.png"
                    width={200}
                    height={333}
                    alt="Logo"
                    className="w-48 sm:w-64"
                  />
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
  );
};

export default HelloOwnerPage;
