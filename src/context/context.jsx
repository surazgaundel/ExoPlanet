import { createContext, useContext, useEffect, useReducer, useState } from "react";
import Papa from 'papaparse';
// import Data from '../utils/Data1.csv'

// console.log(Data)
const PlanetContext=createContext();

export const usePlanetContext=()=>{
    return(useContext(PlanetContext))
}

export const PlanetProvider=({children})=>{

    const[allData,setAllData]=useState([]);

    const fetchAllPlanet=async()=>{
        try{
            const response=await fetch(Data);
            const result=await response.text();
            console.log(result);
            Papa.parse(result,{
                header:true,
                skipEmptyLines:true,
                complete:(results)=>{
                    setAllData(results.data);

                }
                
            });
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchAllPlanet();
    },[])

    console.log(allData)

    return(<PlanetContext.Provider value='hello'>
        {children}
    </PlanetContext.Provider>)

}
