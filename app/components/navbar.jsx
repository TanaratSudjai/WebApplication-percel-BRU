import React from "react";
import Image from "next/image";

function navbar() {
  return (
    <div className="h-[15%] w-full sticky bg-blue-500">
      <div className="w-full items-center flex justify-between p-3">
        <h1 className="text-center text-2xl font-bold text-white ml-[100px]">
          Parcel
        </h1>
        <h1 className="text-center text-xl font-bold text-white mr-[100px]">
          user
        </h1>
      </div>
    </div>
  );
}

export default navbar;
