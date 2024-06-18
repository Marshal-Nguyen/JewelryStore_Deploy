import React from 'react'
import Revenue from './Dashboard/Revenue'
import TestChart from './Dashboard/CountOrder'
import PieChartCategory from './Dashboard/ChartCategory'
import TooltipChart from './Dashboard/TooltipChart'
export default function Dashboard() {
    return (

        <>
            <div><Revenue /></div>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <TestChart />
                </div>
                <div className="flex-1">
                    <PieChartCategory />
                </div>
            </div>


            <div><TooltipChart /></div>
        </>
    )
}
