"use client";
import { useSession } from "next-auth/react";

const HelloOwnerPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Hello, {session.user.name}!</h1>
        <p>Phone: {session.user.phone}</p>
      </div>
    </div>
  );
};

export default HelloOwnerPage;
