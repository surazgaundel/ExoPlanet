import React from 'react'
import { usePlanetContext } from '../context/context';
import Table from './Table';

const url='https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PS';
export default function List() {

  const {results} = usePlanetContext();

  if(results.length==0){
    return (
      <div className="flex flex-col items-center justify-center text-center gap-1 text-sm md:text-xl font-semibold h-[90vh] tracking-wide">
          <p>Exoplanets are planets outside the Solar System.</p>
          <p>Here you can query <a className='text-blue hover:text-red underline' href={url} target="_blank" rel="noopener noreferrer">NASA&apos;s Exoplanet Archive</a> and you love the most.</p>
      </div>
    )
  }

  return(
    <div className="flex flex-col mt-5 justify-center text-xs md:text-sm lg:text-base">
      <h1 className='text-xl'>{results.length} Planet{results.length>1?'s':''} Found.</h1>
      {results.length>0 && (
        <Table/>
      )}
    </div>
  )

}
