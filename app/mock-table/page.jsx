"use client";
import React, { useState, useEffect } from "react";
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
      <div className="mx-auto flex h-[90vh] justify-center items-center w-full text-2xl">
        กำลังโหลดข้อมูล
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
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
              <h2 className="text-xs sm:text-sm font-bold">
                รายการพัสดุส่งคืนเจ้าของ
              </h2>
              <p className="text-sm sm:text-md">{unitDelivers}</p>
            </div>
            <div className="bg-orange-200 mt-2 h-2 rounded"></div>
          </div>
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
      </div>
    </AuthWrapper>
  );
}

export default DashboardPage;
