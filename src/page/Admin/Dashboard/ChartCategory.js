import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default class PieChartCategory extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

    render() {
        return (
            <ResponsiveContainer width="100%" height={400} className="flex items-center justify-center">
                <PieChart width={400} height={400} className="text-center">
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        );
    }
}
// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const PieChartCategory = () => {
//     const [state, setState] = useState({
//         series: [44, 41, 17, 15],
//         options: {
//             chart: {
//                 type: 'donut',
//             },
//             responsive: [
//                 {
//                     breakpoint: 48,
//                     options: {
//                         chart: {
//                             width: 20, // Reduce the width of the chart
//                         },
//                         legend: {
//                             position: 'bottom',
//                         },
//                     },
//                 },
//             ],
//         },
//     });

//     return (
//         <div className="w-full md:w-1/2 lg:w-1/3"> {/* Wrap the chart in a responsive container */}
//             <div id="chart" className="p-8"> {/* Add padding around the chart */}
//                 <ReactApexChart
//                     options={state.options}
//                     series={state.series}
//                     type="text"
//                     className="w-full h-auto"
//                 />
//             </div>
//             <div id="html-dist"></div>
//         </div>
//     );
// };

// export default PieChartCategory;