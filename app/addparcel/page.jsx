"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AuthWrapper from "../components/authComponents";
import Swal from "sweetalert2";

function AddParcel() {
  const [ownData, setOwnData] = useState([]);
  const [cateData, setCateData] = useState({ dataparcel_category: [] });
  const [staffData, setStaffData] = useState({ staff: [] });
  const [companyData, setCompanyData] = useState({ datacompany: [] });
  const [ownerTypeData, setOwnerTypeData] = useState({ typedata: [] });

  const [inputValue, setInputValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [phoneValue, setPhoneValue] = useState(""); // State for phone number input
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenC, setDropdownOpenC] = useState(false);
  const [dropdownOpenS, setDropdownOpenS] = useState(false);

  const [selectedOwner, setSelectedOwner] = useState({
    id: "",
    phone: "",
    ownertype_id: "",
  });
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedCateData, setSelectedCateData] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [parcelCode, setParcelCode] = useState("");
  const inputRef = useRef(null);

  const fetchOwnerType = async () => {
    try {
      const res = await axios.get("/api/ownertype");
      setOwnerTypeData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

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
    fetchOwnerType();
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
    setSelectedOwner({ id: "", phone: "", ownertype_id: "" });
    setPhoneValue("");
    setTypeValue("");
  };

  const handlePhoneChange = (e) => {
    setPhoneValue(e.target.value);
    setSelectedOwner({ id: "", phone: "", ownertype_id: "" });
  };

  const handleTypeChange = (e) => {
    setTypeValue(e.target.value);
  };

  const handleSelectOwner = (id, name, phone, ownertype_id) => {
    setInputValue(name);
    setPhoneValue(phone);
    setTypeValue(ownertype_id);
    setSelectedOwner({ id, phone, ownertype_id: "" });
    setFilteredOwners([]);
    setDropdownVisible(false);
  };

  const handleInputFocus = () => {
    setDropdownVisible(true);
  };

  const handleinputBlurforOwner = () => {
    setTimeout(() => setDropdownVisible(false), 300);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdownOpen(false), 300);
  };
  const handleInputBlurC = () => {
    setTimeout(() => setDropdownOpenC(false), 300);
  };
  const handleInputBlurS = () => {
    setTimeout(() => setDropdownOpenS(false), 300);
  };

  const handleAddOwner = async (name, phone, ownertype_id) => {
    try {
      const response = await axios.post("/api/owner", {
        name: name,
        phone: phone,
        type: parseInt(ownertype_id),
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
      const newOwner = await handleAddOwner(inputValue, phoneValue, typeValue);
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
      category_parcel: parseInt(selectedCateData),
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
    setSelectedOwner({ id: "", phone: "", ownertype_id: "" });
    setSelectedStaff("");
    setSelectedCompany("");
    setParcelCode("");
    setTypeValue("");
    setSelectedCateData("");

    fetchOwnData();
    fetchStaffData();
    fetchCompanyData();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <AuthWrapper>
      <div className="p-8 sm:p-6 bg-white border min-h-screen flex justify-center w-full">
        <div className="container mx-auto w-full sm:w-full md:w-full lg:w-full xl:w-[60%] 2xl:">
          <div className="bg-white rounded p-8 sm:p-6 md:p-8 mb-6 min-h-[80vh]">
            <h1 className="text-center text-xl sm:text-2xl font-bold mb-6">
              รับพัสดุเข้าสู่ระบบ
            </h1>
            <div className="w-full container mx-auto max-w-md sm:max-w-full md:max-w-full">
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              >
                <div className="col-span-full">
                  <label className="text-black text-xl mb-2 block font-bold">
                    กรอกข้อมูลพัสดุ
                  </label>
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

                <div className="col-span-full sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
                  <label className="text-gray-800 text-sm mb-2 block">
                    รหัสประเภทพัสดุ
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onBlur={handleInputBlur}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {selectedCateData
                        ? cateData.dataparcel_category.find(
                            (cateItem) =>
                              cateItem.parcel_category_id === selectedCateData
                          )?.categoryparcel_name
                        : "เลือกรหัสประเภทพัสดุ"}
                    </button>

                    {dropdownOpen && (
                      <ul className="absolute w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                        {cateData.dataparcel_category.map((cateItem) => (
                          <li
                            key={cateItem.parcel_category_id}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                              selectedCateData === cateItem.parcel_category_id
                                ? "bg-gray-200"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedCateData(cateItem.parcel_category_id);
                              setDropdownOpen(false);
                            }}
                          >
                            {cateItem.categoryparcel_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="col-span-full sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
                  <label className="text-gray-800 text-sm mb-2 block">
                    ชื่อบริษัท
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onBlur={handleInputBlurC}
                      onClick={() => setDropdownOpenC(!dropdownOpenC)}
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {selectedCompany
                        ? companyData.datacompany.find(
                            (company) => company.com_id === selectedCompany
                          )?.com_name
                        : "เลือกบริษัท"}
                    </button>

                    {dropdownOpenC && (
                      <ul className="absolute w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                        {companyData.datacompany.map((company) => (
                          <li
                            key={company.com_id}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                              selectedCompany === company.com_id
                                ? "bg-gray-200"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedCompany(company.com_id);
                              setDropdownOpenC(false);
                            }}
                          >
                            {company.com_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <hr />
                </div>

                <div className="col-span-full">
                  <label className="text-black text-xl mb-2 block font-bold">
                    เลือกพนักงาน
                  </label>
                  <label className="text-gray-800 text-sm mb-2 block">
                    พนักงาน
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onBlur={handleInputBlurS}
                      onClick={() => setDropdownOpenS(!dropdownOpenS)}
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {selectedStaff
                        ? staffData.staff.find(
                            (staff) => staff.id === selectedStaff
                          )?.staff_name
                        : "เลือกพนักงาน"}
                    </button>

                    {dropdownOpenS && (
                      <ul className="absolute w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                        {staffData.staff.map((staff) => (
                          <li
                            key={staff.id}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                              selectedStaff === staff.id ? "bg-gray-200" : ""
                            }`}
                            onClick={() => {
                              setSelectedStaff(staff.id);
                              setDropdownOpenS(false);
                            }}
                          >
                            {staff.staff_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <hr />
                </div>

                <style jsx>
                  {`
                    hr {
                      border: none;
                      height: 1px;
                      /* Set the hr color */
                      color: #333; /* old IE */
                      background-color: #333; /* Modern Browsers */
                    }
                  `}
                </style>

                <div className="col-span-full ">
                  <label className="text-black text-xl mb-2 block font-bold">
                    กรอกข้อมูลเจ้าของ
                  </label>
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
                      onBlur={handleinputBlurforOwner}
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
                                owner.own_phone,
                                owner.ownertype_id
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

                <div className="col-span-full sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
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

                <div className="col-span-full sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
                  <label className="text-gray-800 text-sm mb-2 block">
                    สถานะของเจ้าของ
                  </label>
                  <select
                    name="type"
                    id="type"
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    required
                    value={typeValue}
                    onChange={handleTypeChange}
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    {ownerTypeData.typedata.map((typedata) => (
                      <option
                        key={typedata.ownertype_id}
                        value={typedata.ownertype_id}
                      >
                        {typedata.ownertype_name}
                      </option>
                    ))}
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
