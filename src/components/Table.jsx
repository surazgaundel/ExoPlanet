import { useMemo, useState } from 'react'
import { usePlanetContext } from '../context/context'
import { useReactTable,getCoreRowModel,flexRender,getPaginationRowModel,getSortedRowModel } from '@tanstack/react-table';
import {AiOutlineDoubleLeft,AiOutlineLeft,AiOutlineDoubleRight,AiOutlineRight,AiOutlineArrowUp,AiOutlineArrowDown} from 'react-icons/ai';
import {RxExternalLink} from 'react-icons/rx';
export default function Table() {
    const {results}=usePlanetContext();

    const data=useMemo(()=>results,[results]);

    const [sortItem,setSortItem]=useState([])

    const planetNameUrl='https://exoplanetarchive.ipac.caltech.edu/overview/'
    const columns =[
        {
            header:'Planet Name',
            accessorKey:'planet_name',
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
        getSortedRowModel:getSortedRowModel(),
        state:{
            sorting:sortItem,
        },
        onSortingChange:setSortItem,
    })

  return (
    <div className='flex flex-col items-around justify-center'>
        <span className='text-right text-xs'>**Click on header to sort items</span>
        <table className='table-auto'>
            {/* table header */}
            <thead>

            {table.getHeaderGroups().map((headerGroup,index) =>{
                return(
                    <tr key={`${index}${headerGroup.accessorKey}`}>
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
            </thead>

            {/* table body */}
            <tbody>
                {table.getRowModel().rows.map((row,index)=>(
                    <tr key={index}>
                        {row.getVisibleCells().map((cell,index)=>(
                            <td key={index}>
                                {cell.column.columnDef.accessorKey==='planet_name'?(
                                            <a href={`${planetNameUrl}${cell.getValue().split(' ').join('%20')}`} className='text-blue underline' target="_blank" rel="noopener noreferrer">
                                            {flexRender(cell.column.columnDef.cell,cell.getContext())} <span className="inline-block pl-1"><RxExternalLink/></span></a>
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
