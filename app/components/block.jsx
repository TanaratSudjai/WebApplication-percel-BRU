"use client"

import React from 'react'

function block() {
    const getApi = async () =>{
        const api  = await fetch('/api/post')
        const data = await api.json()
        console.log(data.message);
    } 

  return (
    <div>
        <button class="p-2 bg-blue-200 mx-auto rounded-md" onClick={getApi}>call api</button>
    </div>
  )
}

export default block
