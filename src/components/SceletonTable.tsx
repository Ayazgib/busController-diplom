import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import '../App.css'
import '../reset.css'
import {Skeleton} from "@mui/material";

export interface SceletonTableProps {
    cellCount: number,
    rowCount: number,
}

function SceletonTable(props: any) {
   const [rowArr, setRowArr] = useState<number []>([])
   const [cellArr, setCellArr] = useState<number []>([])

    useEffect(() => {
        let rowArr  = [];
        for (let i = 0; i < props.rowCount - 1; i ++) {
            rowArr.push(i);
        }

        let cellArr  = [];
        for (let i = 0; i < props.cellCount; i ++) {
            cellArr.push(i);
        }

        setRowArr(rowArr);
        setCellArr(cellArr)

    } ,[])

    return (

            <table className='app_table'>
                <tbody>
                    <tr key='-1'>
                        {
                            cellArr.map(cell => {
                                return <th key={cell}>
                                    <Skeleton key={cell+Math.random()} animation="wave"/>
                                    <Skeleton key={cell+Math.random()} animation="wave"/>
                                    <Skeleton key={cell+Math.random()} animation="wave"/>
                                </th>
                            })
                        }
                    </tr>
                    {
                        rowArr.map(row => {
                            return <tr key={row}>
                                {
                                    cellArr.map(cell => {
                                        return <td key={cell+Math.random()}>
                                            <Skeleton key={cell+Math.random()} animation="wave" />
                                            <Skeleton key={cell+Math.random()} animation="wave" />
                                            <Skeleton key={cell+Math.random()} animation="wave" />
                                        </td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
    );
}

export default SceletonTable;
