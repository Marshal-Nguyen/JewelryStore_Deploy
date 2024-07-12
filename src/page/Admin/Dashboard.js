import React from 'react'
import P1 from './Dashboard/P1'
import P2 from './Dashboard/P2'
import PieChartCategory from './Dashboard/ChartCategory'
import P3 from './Dashboard/P3'
export default function Dashboard() {
    return (

        <>
            <div className=" bg-white"><P1 /></div>

            <div className=" bg-white">
                <P2 />
            </div>

            <div className=" bg-white"><P3 /></div>
        </>
    )
}
