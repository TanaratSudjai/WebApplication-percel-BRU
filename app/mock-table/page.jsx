"use client";
import React, { useState, useEffect } from "react";
import AuthWrapper from "../components/authComponents";

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
  }, []);

  const {
    sumParcel,
    unitStaff,
    unitOwners,
    unitParcels,
    unitParcelsSuccess,
    unitDelivers
  } = dashboardData;

  if (!dashboardData) {
    return (
      <div className="mx-auto flex h-[90vh] justify-center items-center w-full text-2xl">
        กำลังโหลดข้อมูล
      </div>
    );
  }

  return (
    <AuthWrapper>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">จำนวนพนักงาน</h2>
            <p className="text-2xl">{unitStaff}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">จำนวนเจ้าของพัสดุ</h2>
            <p className="text-2xl">{unitOwners}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">รายการรับพัสดุทั้งหมด</h2>
            <p className="text-2xl">{sumParcel}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">พัสดุที่ยังไม่ได้ส่งเจ้าของ</h2>
            <p className="text-2xl">{sumParcel}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">พัสดุที่ส่งเจ้าของเเล้ว</h2>
            <p className="text-2xl">{unitParcelsSuccess}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">รายการพัสดุส่งคืนเจ้าของ</h2>
            <p className="text-2xl">{unitDelivers}</p>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default DashboardPage;
