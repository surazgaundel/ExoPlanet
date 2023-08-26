import React from 'react'

export default function Search() {
  return (
    <div>
        <form className="flex flex-col lg:flex-row justify-between items-center shadow-md px-2 py-1 gap-2 rounded-md mt-5">
            <div className=" flex flex-col md:flex-row justify-around w-[70%] md:w-[95%] lg:w-[80%] m-auto gap-2">
                {/* hostName */}
            <select className='select-container' name='hostName' id='sort'>
                <option value='price-ascend'>Host Name</option>
            </select>
            {/* discoveryMethod */}
            <select className='select-container' name='discoveryMethod' id='sort'>
                <option value='price-ascend'>Discovery Method</option>
            </select>
            {/* discoveryYear */}
            <select className='select-container' name='discoveryYear' id='sort'>
                <option value='price-ascend'>Discovery Year</option>
            </select>
            {/* discoveryFacility */}
            <select className='select-container' name='discoveryFacility' id='sort'>
                <option value='price-ascend'>Discovery Facility</option>
            </select>
            </div>
            <div className="flex gap-2">
                <button 
                className='button bg-blue hover:border-blue hover:text-blue'
                type='submit'>Search</button>
                <button
                className='button bg-red hover:border-red  hover:text-red'
                >Clear</button>
            </div>
        </form>
    </div>
  )
}
