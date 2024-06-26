"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function AddParcel() {
  const [ownData, setOwnData] = useState([]);
  const [staffData, setStaffData] = useState({ staff: [] });
  const [inputValue, setInputValue] = useState("");
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState({ id: "", phone: "" });
  const [selectedStaff, setSelectedStaff] = useState("");
  const [parcelCode, setParcelCode] = useState(""); // State for parcel code

  useEffect(() => {
    // Fetch data from the database using Axios
    const fetchOwnData = async () => {
      try {
        const response = await axios.get("/api/owner"); // Replace with your API endpoint
        setOwnData(response.data.owners); // Access the 'owners' array in the response
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    const fetchStaffData = async () => {
      try {
        const response = await axios.get("/api/staff"); // Replace with your API endpoint
        setStaffData(response.data); // Ensure data is an array of staff objects
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchOwnData();
    fetchStaffData();
  }, []);

  useEffect(() => {
    if (Array.isArray(ownData)) {
      setFilteredOwners(
        ownData
          .filter((owner) =>
            owner.own_name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 3) // Limit to top 3
      );
    }
  }, [inputValue, ownData]);

  const handleSelectOwner = (id, name, phone) => {
    setInputValue(name);
    setSelectedOwner({ id, phone });
    setFilteredOwners([]);
    setDropdownVisible(false);
  };

  const handleInputFocus = () => {
    setDropdownVisible(true);
  };

  const handleInputBlur = () => {
    // Delay hiding to allow click event on dropdown items
    setTimeout(() => setDropdownVisible(false), 100);
  };

  const handleAddOwner = async (name, phone) => {
    try {
      const response = await axios.post("/api/owner", {
        name: name,
        phone: phone,
      });

      console.log("API Response:", response.data); // Log the response to inspect it

      // Check if the response indicates success and extract the owner ID
      if (response.status === 200 || response.status === 201) {
        const newOwner = response.data; // Assuming response.data contains the new owner object
        console.log("New owner has been added:", newOwner);

        return newOwner; // Return the new owner object or the part containing the ID
      } else {
        console.error("Failed to add new owner.");
        return null;
      }
    } catch (error) {
      console.error("Error adding new owner:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let ownerId = selectedOwner.id;
    if (!ownerId) {
      const newOwner = await handleAddOwner(inputValue, selectedOwner.phone);
      console.log("New owner:", newOwner); // Log the entire newOwner object
      if (newOwner && newOwner.newOwner && newOwner.newOwner.own_id) {
        ownerId = newOwner.newOwner.own_id; // Access own_id from newOwner.newOwner
        console.log("New owner ID:", ownerId);
      }
    }

    const parcelData = {
      Rid: parcelCode, // Use the parcelCode state
      owner: ownerId,
      staff: parseInt(selectedStaff), // Ensure staff is sent as a number
      sta_id: 1, // Assuming sta_id is always 1 for this form submission
    };

    try {
      const response = await axios.post("/api/parcel", parcelData);

      if (response.status === 200) {
        console.log("Parcel data submitted successfully");
        reset();
      } else {
        console.error("Failed to submit parcel data");
      }
    } catch (error) {
      console.error("Error submitting parcel data:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    }
  };

  const reset = () => {
    setInputValue("");
    setSelectedOwner({ id: "", phone: "" });
    setSelectedStaff("");
    setParcelCode("");
  };

  return (
    <div className="p-6 bg-gray-100 flex justify-center w-full">
      <div class="container mx-auto">
        <h2 class="font-semibold text-xl text-gray-600">Responsive Form</h2>

        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <h1 className="text-center text-2xl font-bold">
            รับพัสดุเข้าสู่ระบบ
          </h1>
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
            >
              <div className="md:col-span-5">
                <label className="text-gray-800 text-sm mb-2 block">
                  รหัสพัสดุ
                </label>
                <div className="relative flex items-center">
                  <input
                    name="parcel_code"
                    type="text"
                    value={parcelCode}
                    onChange={(e) => setParcelCode(e.target.value)}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="แสกนหรือกรอกรหัสพัสดุ"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  พนักงาน
                </label>
                <select
                  id="staff"
                  name="staffList"
                  form="staffForm"
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                >
                  <option value="" disabled>
                    เลือกพนักงาน
                  </option>
                  {staffData.staff.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.staff_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  ชื่อเจ้าของ
                </label>
                <div className="relative flex flex-col items-center">
                  <input
                    name="own_name"
                    type="text"
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="กรอกชื่อเจ้าของ"
                  />
                  {isDropdownVisible && filteredOwners.length > 0 && (
                    <ul className="flex flex-col z-10 w-full bg-white border border-gray-300 mt-1 rounded-md">
                      {filteredOwners.map((owner) => (
                        <li
                          key={owner.own_id}
                          onClick={() =>
                            handleSelectOwner(
                              owner.own_id,
                              owner.own_name,
                              owner.own_phone
                            )
                          }
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        >
                          {owner.own_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  เบอร์เจ้าของ
                </label>
                <div className="relative flex items-center">
                  <input
                    name="own_phone"
                    type="text"
                    required
                    value={selectedOwner.phone}
                    onChange={(e) =>
                      setSelectedOwner({
                        ...selectedOwner,
                        phone: e.target.value,
                      })
                    }
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="กรอกเบอร์โทรเจ้าของ"
                  />
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none"
                >
                  เพิ่มพัสดุ
                </button>
              </div>
              <div className="!mt-8">
                <button
                  onClick={reset}
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none"
                >
                  รีเซ็ต
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddParcel;
