import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
const api = import.meta.env.VITE_API_BASE_URL


export const Add = () => {
  const [inputValue,setInputValue] = useState()

  
  function handleClick() {
    if (!inputValue || inputValue.trim() === "") {
      return alert("Please enter a task!");
    }
    
    axios.post(`${api}/task`,{task:inputValue})
    .then(result => {location.reload()})
    .catch(err => console.log(`Error : ${err}`))

  }

  return (
    <div className='flex items-center relative mt-6 w-[60vh]'>
      <input className='px-3 py-2 w-full rounded-xl border border-green-600 outline-none' type="text" id='todoValue' onChange={(e) => setInputValue(e.target.value)} placeholder='Enter a todo ...' />
      <button className='cursor-pointer p-2 w-16 bg-green-600 text-white rounded-xl absolute right-0'
        onClick={handleClick}>Add</button>
    </div>
  )
}
