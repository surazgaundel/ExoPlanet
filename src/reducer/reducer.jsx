/* eslint-disable no-case-declarations */


const reducer=(state,action)=>{

    switch(action.type){
        case 'ADD_DATA':
            let data=action.payload;
            
            let allPlanetData=[...data];

            let allHostName=new Set(allPlanetData.map(planetData=>{
                return(planetData.hostname)
            }))
            let allDiscoveryMethod=new Set(allPlanetData.map(planetData=>{
                return(planetData.discoverymethod)
            }))
            let allDiscoveryYear=new Set(allPlanetData.map(planetData=>{
                return(planetData.disc_year)
            }))
            let allDiscoveryFacility=new Set(allPlanetData.map(planetData=>{
                return(planetData.disc_facility)
            }))
            return {
                ...state,
                allData:[...action.payload],
                hostNameList:['Host Name',...allHostName],
                discoveryMethodList:['Discovery Method',...allDiscoveryMethod],
                discoveryYearList:['Discovery Year',...allDiscoveryYear],
                discoverFacilityList:['Discovery Facility',...allDiscoveryFacility]
            }
        case 'GET_SEARCH_VALUE':
            // eslint-disable-next-line no-case-declarations
            const {name,value}=action.payload;
            return{...state,filters:{...state.filters,[name]:value}}

        case 'FIND_RESULTS':
            const {allData,filters}=state;
            const tempArray = allData.filter(item => {
                return (
                    (filters.hostName === '' || item.hostname === filters.hostName) &&
                    (filters.discoveryMethod === '' || item.discoverymethod === filters.discoveryMethod) &&
                    (filters.discoveryYear === '' || item.disc_year === filters.discoveryYear) &&
                    (filters.discoveryFacility === '' || item.disc_facility === filters.discoveryFacility)
                );
            });
            console.log(tempArray);
            return {...state,results:tempArray}    
        
        case 'CLEAR_SEARCH':
            return{
                ...state,
                results:[],
                filters:{
                    hostName:'',
                    discoveryMethod:'',
                    discoveryYear:'',
                    discoveryFacility:'',
                }
            }

        default:
            return {...state};
    }
}


export default reducer;