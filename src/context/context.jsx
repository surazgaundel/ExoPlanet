/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import Papa from 'papaparse';
import reducer from "../reducer/reducer";
import {toast} from 'react-toastify';


const initialState={
    allData:[],
    hostNameList:[],
    discoveryMethodList:[],
    discoveryYearList:[],
    discoverFacilityList:[],
    filters:{
        hostName:'',
        discoveryMethod:'',
        discoveryYear:'',
        discoveryFacility:'',
    },
    results:[],
    button:''
}
const PlanetContext=createContext();


export const usePlanetContext=()=>{
    return(useContext(PlanetContext))
}

export const PlanetProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState);
    
    // toast option for Notification
    const toastOptions={
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
    }

    //fetch data.
    const fetchAllPlanet=async()=>{
        try{
            const response=await fetch('/src/utils/Data.csv');
            const result=await response.text();
            Papa.parse(result,{
                header:true,
                skipEmptyLines:true,
                complete:(results)=>{
                    dispatch({type:'ADD_DATA',payload:results.data})
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

    //get search value
    const getSearchValue=(e)=>{
        const name=e.target.name
        const value=e.target.value;
        dispatch({type:'GET_SEARCH_VALUE',payload:{name,value}})
    }
    
    //get results array based on search value
    const getResults=(e)=>{
        e.preventDefault();
        const {filters}=state;
        const array=Object.values(filters);
        const allEmptyStrings = array.every(item => item === '');
        if(!allEmptyStrings){
            toast.success("Search query submitted!!", toastOptions);
            dispatch({type:'FIND_RESULTS'})
        }else{
            toast.error('Choose at least one filter value!',toastOptions)
        }
    }


    //clear search value
    const clearSearch=(e)=>{
        e.preventDefault();
        toast.warn("Search query cleared!!", toastOptions);
        dispatch({type:'CLEAR_SEARCH'});
    }


    return(<PlanetContext.Provider value={{...state,getSearchValue,getResults,clearSearch}}>
        {children}
        
    </PlanetContext.Provider>)

}
