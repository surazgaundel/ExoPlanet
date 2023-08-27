import React, { useMemo, useState } from 'react'
import { usePlanetContext } from '../context/context'
import { useReactTable,getCoreRowModel,flexRender,getPaginationRowModel } from '@tanstack/react-table';
import {AiOutlineDoubleLeft,AiOutlineLeft,AiOutlineDoubleRight,AiOutlineRight,AiOutlineArrowUp,AiOutlineArrowDown} from 'react-icons/ai';
export default function Table() {
    const {results}=usePlanetContext();

    const data=useMemo(()=>results,[]);

    const [sortItem,setSortItem]=useState([])

    const planetNameUrl='https://exoplanetarchive.ipac.caltech.edu/overview/'
    const columns =[
        {
            header:'Planet Name',
            accessorKey:'planet_name',
            url:planetNameUrl
        },
        {
            header:'Host Name',
            accessorKey:'hostname'
        },
        {
            header:'Discovery Method',
            accessorKey:'discoverymethod'
        },
        {
            header:'Discovery Year',
            accessorKey:'disc_year'
        },
        {
            header:'Discovery Facility',
            accessorKey:'disc_facility'
        },
    ]

    const table=useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        state:{
            sorting:sortItem,
        },
        onSortingChange:setSortItem,
    })

  return (
    <div className='flex flex-col items-around justify-center'>
        <table className='table-auto'>
            {/* table header */}
            {table.getHeaderGroups().map((headerGroup) =>{
                return(
                <tr key={headerGroup.accessorKey}>
                    {
                        headerGroup.headers.map((header,index)=>{
                            return(
                                <th key={index} onClick={header.column.getToggleSortingHandler()}>
                                    <div className='container flex gap-2 cursor-pointer items-center '>
                                    <p>{flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}</p>
                                    <p>{
                                        {asc:<AiOutlineArrowUp/>,desc:<AiOutlineArrowDown/>}
                                        [header.column.getIsSorted()??null]
                                    }</p>
                                    </div>
                                </th>
                            )
                        })
                    }
                </tr>
                )
            })}

            {/* table body */}
            <tbody>
                {table.getRowModel().rows.map(row=>(
                    <tr key={row.accessorKey}>
                        {row.getVisibleCells().map((cell,index)=>(
                            <td key={index}>
                                {cell.column.columnDef.accessorKey==='planet_name'?(
                                            <a href={`${cell.column.columnDef.url}${flexRender(cell.column.columnDef.cell,cell.getContext())}`} className='text-blue underline' target="_blank" rel="noopener noreferrer">
                                            {flexRender(cell.column.columnDef.cell,cell.getContext())}</a>
                                ):
                                (flexRender(cell.column.columnDef.cell,cell.getContext()))
                            }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        {/* button */}
        <div className="flex items-center justify-center gap-3 my-3">
            <button className="button pagination-button" disabled={!table.getCanPreviousPage()} onClick={()=>table.setPageIndex(0)}><AiOutlineDoubleLeft/></button>
            <button className="button pagination-button" disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage()}><AiOutlineLeft/></button>
            <button className="button pagination-button" disabled={!table.getCanNextPage()} onClick={()=>table.nextPage()}><AiOutlineRight/></button>
            <button className="button pagination-button" disabled={!table.getCanNextPage()} onClick={()=>table.setPageIndex(table.getPageCount()-1)}><AiOutlineDoubleRight/></button>
        </div>
    </div>
  )
}
