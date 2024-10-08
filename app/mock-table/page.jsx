"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AuthWrapper from "../components/authComponents";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const {
    sumParcel,
    unitStaff,
    unitOwners,
    unitParcels,
    unitParcelsSuccess,
    unitDelivers,
  } = dashboardData;

  if (!dashboardData) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  const data = [
    {
      name: "ข้อมูลทั้งหมด",
      ส่งเจ้าของเเล้ว: unitParcelsSuccess,
      ยังไม่ส่งคืน: unitParcels,
      พัสดุทั้งหมด: sumParcel,
      เจ้าของพัสดุ: unitOwners,
    },
  ];

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const [parcelData, setParcelData] = useState({ dataParcel: [] });

  const fetchParcelData = async () => {
    try {
      const response = await axios.get("/api/make_report"); // Replace with your API endpoint
      const data = response.data;
      setParcelData(data); // Ensure data matches the structure of your response
    } catch (error) {
      console.error("Error fetching parcel data:", error);
    }
  };

  useEffect(() => {
    fetchParcelData();
  }, []);

  function Dailyreport() {
    const { dataParcel } = parcelData;

    const doc = new jsPDF();

    // Fetch the font from the public directory
    const fontUrl = "/THSarabunNew.ttf";

    fetch(fontUrl)
      .then((response) => response.arrayBuffer())
      .then((font) => {
        const base64Font = arrayBufferToBase64(font);
        doc.addFileToVFS("THSarabunNew.ttf", base64Font);
        doc.addFont("THSarabunNew.ttf", "THSarabun", "normal");
        doc.setFont("THSarabun");

        // Add the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();
        const dateTimeString = `${formattedDate} ${formattedTime}`;

        doc.setFontSize(16);
        doc.text("วันที่/เวลา", 133, 10);
        doc.text(dateTimeString, 190, 10, { align: "right" });

        // Add the title
        doc.setFontSize(20);
        doc.text("รายงานประจำวัน", 100, 20, { align: "center" });

        // Define table headers and rows
        const tableColumn = [
          "รหัสพัสดุ",
          "ชื่อบริษัท",
          "ชื่อเจ้าของ",
          "สถานะ",
          "เบอร์โทร",
        ];
        const tableRows = [];

        parcelData.dataParcel.forEach((parcel) => {
          const parcelData = [
            parcel.par_real_id || "N/A",
            parcel.Company?.com_name || "N/A",
            parcel.Owner?.own_name || "N/A",
            parcel.Owner?.ownertype?.ownertype_name || "N/A",
            parcel.Owner?.own_phone || "N/A",
          ];
          tableRows.push(parcelData);
        });

        // Generate the table
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 25,
          headStyles: {
            fillColor: [255, 255, 255], // Black background
            textColor: [0, 0, 0], // White text
          },
          styles: {
            font: "THSarabun", // Set the Thai font
            fontSize: 12, // Adjust font size
            cellPadding: 3, // Optional: Adjust padding
          },
        });

        doc.save("daily_parcel_report.pdf");
        fetchParcelData();
      })
      .catch((error) => {
        console.error("Error loading font or generating PDF:", error);
      });
  }
  ////

  /////
  return (
    <AuthWrapper>
      <div className="container mx-auto p-4 w-full min-h-screen border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
              <h2 className="text-xs sm:text-sm font-bold">จำนวนพนักงาน</h2>
              <p className="text-sm sm:text-md">{unitStaff}</p>
            </div>
            <div className="bg-blue-200 mt-2 h-2 rounded"></div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
              <h2 className="text-xs sm:text-sm font-bold">
                จำนวนเจ้าของพัสดุ
              </h2>
              <p className="text-sm sm:text-md">{unitOwners}</p>
            </div>
            <div className="bg-green-200 mt-2 h-2 rounded"></div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
              <h2 className="text-xs sm:text-sm font-bold">
                รายการรับพัสดุทั้งหมด
              </h2>
              <p className="text-sm sm:text-md">{sumParcel}</p>
            </div>
            <div className="bg-red-200 mt-2 h-2 rounded"></div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
              <h2 className="text-xs sm:text-sm font-bold">
                พัสดุที่ยังไม่ได้ส่งเจ้าของ
              </h2>
              <p className="text-sm sm:text-md">{unitParcels}</p>
            </div>
            <div className="bg-yellow-200 mt-2 h-2 rounded"></div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
              <h2 className="text-xs sm:text-sm font-bold">
                พัสดุที่ส่งเจ้าของเเล้ว
              </h2>
              <p className="text-sm sm:text-md">{unitParcelsSuccess}</p>
            </div>
            <div className="bg-purple-200 mt-2 h-2 rounded"></div>
          </div>
          {/* <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
              <h2 className="text-xs sm:text-sm font-bold">
                รายการพัสดุส่งคืนเจ้าของ
              </h2>
              <p className="text-sm sm:text-md">{unitDelivers}</p>
            </div>
            <div className="bg-orange-200 mt-2 h-2 rounded"></div>
          </div> */}
        </div>

        <div className="mt-8">
          <div className="h-[300px] sm:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ส่งเจ้าของเเล้ว" fill="#00C49F" barSize={30} />
                <Bar dataKey="ยังไม่ส่งคืน" fill="#f73030" barSize={30} />
                <Bar dataKey="พัสดุทั้งหมด" fill="#5dbfe3" barSize={30} />
                <Bar dataKey="เจ้าของพัสดุ" fill="#ffa341" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <button
            onClick={Dailyreport}
            className="p-2 bg-green-300 rounded-md hover:bg-green-200 hover:scale-105 transform transition-transform duration-200 ease-in-out shadow-lg hover:shadow-xl active:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            พิมพ์รายงานประจำวัน
          </button>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default DashboardPage;
