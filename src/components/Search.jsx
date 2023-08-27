import React, { createRef } from 'react'
import { usePlanetContext } from '../context/context';

export default function Search() {
    const {
        hostNameList,
        discoveryMethodList,
        discoveryYearList,
        discoverFacilityList,
        getSearchValue,
        getResults,
        clearSearch,
        filters:{
            hostName,
            discoveryMethod,
            discoveryYear,
            discoveryFacility,
        }
    } = usePlanetContext();


    return (
        <div>
            <form className="flex flex-col lg:flex-row justify-between items-center shadow-lg px-2 py-1 gap-2 rounded-md mt-5">
                <div className=" flex flex-col md:flex-row justify-around w-[70%] md:w-[95%] lg:w-[80%] m-auto gap-2">
                {/* hostName */}
                <select value={hostName} className='select-container' name='hostName' id='sort' onChange={getSearchValue}>
                {hostNameList && hostNameList.map((name,index)=>{
                    return(
                            <option key={index}>{name}</option>
                            )
                        })}
                </select>
                {/* discoveryMethod */}
                <select value={discoveryMethod} className='select-container' name='discoveryMethod' id='sort' onChange={getSearchValue}>
                {discoveryMethodList && discoveryMethodList.map((method,index)=>{
                    return(
                            <option key={index}>{method}</option>
                            )
                        })}
                </select>
                {/* discoveryYear */}
                <select value={discoveryYear} className='select-container' name='discoveryYear' id='sort' onChange={getSearchValue}>
                {discoveryYearList && discoveryYearList.map((year,index)=>{
                    return(
                            <option key={index}>{year}</option>
                            )
                        })}
                </select>
                {/* discoveryFacility */}
                <select value={discoveryFacility}  className='select-container' name='discoveryFacility' id='sort' onChange={getSearchValue}>
                {discoverFacilityList && discoverFacilityList.map((facility,index)=>{
                    return(
                            <option key={index}>{facility}</option>
                            )
                        })}
                </select>
                </div>
                {/* button component */}
                <div className="flex gap-2">
                    <button 
                    onClick={getResults}
                    className='button text-white bg-blue hover:border-blue hover:text-blue'
                    type='submit'>Search</button>
                    <button
                    onClick={clearSearch}
                    className='button text-white bg-red hover:border-red  hover:text-red'
                    >Clear</button>
                </div>
            </form>
        </div>
    )
}
