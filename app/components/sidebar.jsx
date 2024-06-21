import React from 'react'

function sidebar() {
  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 border-2">
        <div className="mb-2 p-4 mt-4">
            <h1 className="font-bold text-left text-2xl">Sidebar</h1>
        </div>
        <div className="text-left text-md h-5 w-5 mb-2 p-4 ">
            <ul >
                <li>Name</li>
                <li>Dashboard</li>
            </ul>
        </div>
    </div>
  )
}

export default sidebar
