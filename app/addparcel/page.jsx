"use client";
import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import AuthWrapper from "../components/authComponents";
import Swal from "sweetalert2";

function AddParcel() {
  const [ownData, setOwnData] = useState([]);
  const [cateData, setCateData] = useState({dataparcel_category: []});
  const [staffData, setStaffData] = useState({ staff: [] });
  const [companyData, setCompanyData] = useState({ datacompany: [] });
  const [inputValue, setInputValue] = useState("");
  const [phoneValue, setPhoneValue] = useState(""); // State for phone number input
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState({ id: "", phone: "" });
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedCateData, setSelectedCateData] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [parcelCode, setParcelCode] = useState("");
  const inputRef = useRef(null);

  const fetchOwnData = async () => {
    try {
      const response = await axios.get("/api/owner");
      setOwnData(response.data.owners);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    }
  };

  const fetchCategoryParcel = async () => {
    try {
      const response = await axios.get("/api/parcel_category");
      setCateData(response.data);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await axios.get("/api/staff");
      setStaffData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get("/api/company");
      setCompanyData(response.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    fetchOwnData();
    fetchStaffData();
    fetchCompanyData();
    fetchCategoryParcel();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(ownData)) {
      setFilteredOwners(
        ownData
          .filter((owner) =>
            owner.own_name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 3)
      );
    }
  }, [inputValue, ownData]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectedOwner({ id: "", phone: "" });
    setPhoneValue("");
  };

  const handlePhoneChange = (e) => {
    setPhoneValue(e.target.value);
    setSelectedOwner({ id: "", phone: "" });
  };

  const handleSelectOwner = (id, name, phone) => {
    setInputValue(name);
    setPhoneValue(phone);
    setSelectedOwner({ id, phone });
    setFilteredOwners([]);
    setDropdownVisible(false);
  };

  const handleInputFocus = () => {
    setDropdownVisible(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdownVisible(false), 100);
  };

  const handleAddOwner = async (name, phone) => {
    try {
      const response = await axios.post("/api/owner", {
        name: name,
        phone: phone,
      });

      console.log("API Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        const newOwner = response.data;
        console.log("New owner has been added:", newOwner);

        return newOwner;
      } else {
        console.error("Failed to add new owner.");
        return null;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "เบอร์โทรศัพท์นี้ได้มีอยู่ในระบบอยู่แล้ว!",
      });
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let ownerId = selectedOwner.id;
    if (!ownerId) {
      const newOwner = await handleAddOwner(inputValue, phoneValue);
      console.log("New owner:", newOwner);
      if (newOwner && newOwner.newOwner && newOwner.newOwner.own_id) {
        ownerId = newOwner.newOwner.own_id;
        console.log("New owner ID:", ownerId);
      }
    }

    const parcelData = {
      Rid: parcelCode,
      owner: ownerId,
      staff: parseInt(selectedStaff),
      company: parseInt(selectedCompany),
      sta_id: 1,
      category_parcel:parseInt(selectedCateData)
    };

    try {
      const response = await axios.post("/api/parcel", parcelData);

      if (response.status === 200) {
        console.log("Parcel data submitted successfully");
        reset();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 500,
        });
      } else {
        console.error("Failed to submit parcel data");
      }
    } catch (error) {
      console.error("Error submitting parcel data:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const reset = () => {
    setInputValue("");
    setPhoneValue("");
    setSelectedOwner({ id: "", phone: "" });
    setSelectedStaff("");
    setSelectedCompany("");
    setParcelCode("");

    fetchOwnData();
    fetchStaffData();
    fetchCompanyData();
  };

  return (
    <AuthWrapper>
      <div className="p-4 sm:p-6 bg-white border min-h-screen flex justify-center w-full">
        <div className="container mx-auto">
          <div className="bg-white rounded p-4 sm:p-6 md:p-8 mb-6 min-h-[80vh]">
            <h1 className="text-center text-xl sm:text-2xl font-bold mb-6">
              รับพัสดุเข้าสู่ระบบ
            </h1>
            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              >
                <div className="col-span-full">
                  <label className="text-gray-800 text-sm mb-2 block">
                    รหัสพัสดุ
                  </label>
                  <div className="relative flex items-center">
                    <input
                      ref={inputRef}
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


                <div className="col-span-full sm:col-span-1">
                  <label className="text-gray-800 text-sm mb-2 block">
                    ชื่อบริษัท
                  </label>
                  <select
                    id="company"
                    name="companyList"
                    form="companyForm"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="" disabled>
                      เลือกบริษัท
                    </option>
                    {companyData.datacompany.map((company) => (
                        <option key={company.com_id} value={company.com_id}>
                          {company.com_name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-span-full sm:col-span-1">
                  <label className="text-gray-800 text-sm mb-2 block">
                    พนักงาน
                  </label>
                  <select
                    id="staff"
                    name="staffList"
                    form="staffForm"
                    required
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

                <div className="col-span-full sm:col-span-1">
                  <label className="text-gray-800 text-sm mb-2 block">
                    ชื่อเจ้าของ
                  </label>
                  <div className="relative flex flex-col items-center">
                    <input
                      name="own_name"
                      type="text"
                      required
                      value={inputValue}
                      onChange={handleInputChange}
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

                <div className="col-span-full sm:col-span-1">
                  <label className="text-gray-800 text-sm mb-2 block">
                    เบอร์เจ้าของ
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="own_phone"
                      type="text"
                      required
                      value={phoneValue}
                      onChange={handlePhoneChange}
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="กรอกเบอร์โทรเจ้าของ"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-1">
                  <label className="text-gray-800 text-sm mb-2 block">
                    รหัสประเภทพัสดุ
                  </label>
                  <select
                    id="staff"
                    name="staffList"
                    form="staffForm"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    value={selectedCateData}
                    onChange={(e) => setSelectedCateData(e.target.value)}
                  >
                    <option value="" disabled>
                      เลือกรหัสประเภทพัสดุ
                    </option>
                    {cateData.dataparcel_category.map((cateData) => (
                      <option key={cateData.parcel_category_id} value={cateData.parcel_category_id}>
                        {cateData.categoryparcel_name}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="col-span-full sm:col-span-1">
                  <label className="text-gray-800 text-sm mb-2 block">
                    สถานะของเจ้าของ
                  </label>
                  <select
                    id="staff"
                    name="staffList"
                    form="staffForm"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    
                    onChange={(e) => (e.target.value)}
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    
                      <option>
                        นักศึกษา
                      </option>
                    
                  </select>
                </div>

                

                

                <div className="col-span-full sm:col-span-1 mt-4 sm:mt-8">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-[#60d0ac] hover:bg-emerald-600 focus:outline-none"
                  >
                    เพิ่มพัสดุ
                  </button>
                </div>

                <div className="col-span-full sm:col-span-1 mt-4 sm:mt-8">
                  <button
                    type="button"
                    onClick={reset}
                    className="w-full sm:w-1/2 py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-rose-600 hover:bg-red-700 focus:outline-none flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    รีเซ็ต
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default AddParcel;
