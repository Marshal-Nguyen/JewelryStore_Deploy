
// import React, { useState } from 'react';
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import moment from 'moment'; // Import moment.js for date manipulation
// import axios from 'axios';

// const TestChart = () => {
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [datesInRange, setDatesInRange] = useState([]);

//     const formatCurrency = (value) => {
//         return new Intl.NumberFormat('vi-VN', {
//             style: 'currency',
//             currency: 'VND',
//             minimumFractionDigits: 0
//         }).format(value);
//     };

//     const handleCalculateDates = () => {
//         if (startDate && endDate) {
//             const start = moment(startDate);
//             const end = moment(endDate);
//             let dates = [];

//             while (start <= end) {
//                 const dateObj = {
//                     date: start.format('YYYY-MM-DD'),
//                     start: moment(start).startOf('day').toISOString(),
//                     end: moment(start).endOf('day').toISOString(),
//                     revenue: 0 // Initialize revenue to 0
//                 };
//                 dates = [...dates, dateObj];
//                 start.add(1, 'days');
//             }

//             setDatesInRange(dates);

//             dates.forEach((dateObj, index) => {
//                 fetchRevenue(dateObj, index);
//             });
//         } else {
//             alert('Please enter both start date and end date.');
//         }
//     };

//     const fetchRevenue = async (dateObj, index) => {
//         const apiUrl = `https://jssatsproject.azurewebsites.net/api/sellorder/SumTotalAmountOrderByDateTime?startDate=${dateObj.start}&endDate=${dateObj.end}`;

//         try {
//             const response = await axios.get(apiUrl);
//             const revenue = response.data.data;

//             setDatesInRange(prevDates => {
//                 const updatedDates = [...prevDates];
//                 updatedDates[index].revenue = revenue;
//                 return updatedDates;
//             });
//         } catch (error) {
//             console.error('Error fetching revenue:', error);
//         }
//     };

//     const handleSetDefaultDates = () => {
//         const end = moment().endOf('day'); // End of today
//         const start = moment().subtract(7, 'days').startOf('day'); // 7 days ago, start of the day

//         setStartDate(start.format('YYYY-MM-DD'));
//         setEndDate(end.format('YYYY-MM-DD'));

//         const dates = [];
//         let current = start.clone();
//         while (current <= end) {
//             dates.push({
//                 date: current.format('YYYY-MM-DD'),
//                 start: current.startOf('day').toISOString(),
//                 end: current.endOf('day').toISOString(),
//                 revenue: 0 // Initialize revenue to 0
//             });
//             current.add(1, 'days');
//         }

//         setDatesInRange(dates);
//         dates.forEach((dateObj, index) => {
//             fetchRevenue(dateObj, index);
//         });
//     };

//     const handleSetMonthDates = () => {
//         const end = moment().endOf('month');
//         const start = moment().startOf('year');

//         setStartDate(start.format('YYYY-MM-DD'));
//         setEndDate(end.format('YYYY-MM-DD'));

//         const dates = [];
//         let current = start.clone();
//         while (current <= end) {
//             dates.push({
//                 date: current.format('YYYY-MM'),
//                 start: current.startOf('month').toISOString(),
//                 end: current.endOf('month').toISOString(),
//                 revenue: 0 // Initialize revenue to 0
//             });
//             current.add(1, 'months');
//         }

//         setDatesInRange(dates);
//         dates.forEach((dateObj, index) => {
//             fetchRevenue(dateObj, index);
//         });
//     };

//     return (
//         <div className="flex justify-center items-center flex-col space-y-4">
//             <h2 className="text-2xl font-bold mb-4">Date Range Component</h2>

//             <div className="flex flex-col space-y-2">
//                 <label className="text-lg">Start Date:</label>
//                 <input
//                     type="date"
//                     className="border border-gray-300 rounded-md p-2"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                 />
//             </div>

//             <div className="flex flex-col space-y-2">
//                 <label className="text-lg">End Date:</label>
//                 <input
//                     type="date"
//                     className="border border-gray-300 rounded-md p-2"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                 />
//             </div>

//             <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleCalculateDates}
//             >
//                 Calculate Dates
//             </button>

//             <button
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//                 onClick={handleSetDefaultDates}
//             >
//                 Week
//             </button>

//             <button
//                 className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleSetMonthDates}
//             >
//                 Month
//             </button>

//             <div className="w-full">
//                 <ResponsiveContainer width="100%" height={400}>
//                     <LineChart data={datesInRange} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="date" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>

//     );
// };

// export default TestChart;


import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment'; // Import moment.js for date manipulation
import axios from 'axios';

const TestChart = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [datesInRange, setDatesInRange] = useState([]);
    const [selectedRange, setSelectedRange] = useState('week');

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleCalculateDates = () => {
        if (startDate && endDate) {
            const start = moment(startDate);
            const end = moment(endDate);
            let dates = [];

            while (start <= end) {
                const dateObj = {
                    date: start.format('YYYY-MM-DD'),
                    start: moment(start).startOf('day').toISOString(),
                    end: moment(start).endOf('day').toISOString(),
                    revenue: 0 // Initialize revenue to 0
                };
                dates = [...dates, dateObj];
                start.add(1, 'days');
            }

            setDatesInRange(dates);

            dates.forEach((dateObj, index) => {
                fetchRevenue(dateObj, index);
            });
        } else {
            alert('Please enter both start date and end date.');
        }
    };

    const fetchRevenue = async (dateObj, index) => {
        const apiUrl = `https://jssatsproject.azurewebsites.net/api/sellorder/SumTotalAmountOrderByDateTime?startDate=${dateObj.start}&endDate=${dateObj.end}`;

        try {
            const response = await axios.get(apiUrl);
            const revenue = response.data.data;

            setDatesInRange(prevDates => {
                const updatedDates = [...prevDates];
                updatedDates[index].revenue = revenue;
                return updatedDates;
            });
        } catch (error) {
            console.error('Error fetching revenue:', error);
        }
    };

    const handleSetDefaultDates = () => {
        const end = moment().endOf('day'); // End of today
        const start = moment().subtract(7, 'days').startOf('day'); // 7 days ago, start of the day

        setStartDate(start.format('YYYY-MM-DD'));
        setEndDate(end.format('YYYY-MM-DD'));

        const dates = [];
        let current = start.clone();
        while (current <= end) {
            dates.push({
                date: current.format('YYYY-MM-DD'),
                start: current.startOf('day').toISOString(),
                end: current.endOf('day').toISOString(),
                revenue: 0 // Initialize revenue to 0
            });
            current.add(1, 'days');
        }

        setDatesInRange(dates);
        dates.forEach((dateObj, index) => {
            fetchRevenue(dateObj, index);
        });
    };

    const handleSetMonthDates = () => {
        const end = moment().endOf('month');
        const start = moment().startOf('year');

        setStartDate(start.format('YYYY-MM-DD'));
        setEndDate(end.format('YYYY-MM-DD'));

        const dates = [];
        let current = start.clone();
        while (current <= end) {
            dates.push({
                date: current.format('YYYY-MM'),
                start: current.startOf('month').toISOString(),
                end: current.endOf('month').toISOString(),
                revenue: 0 // Initialize revenue to 0
            });
            current.add(1, 'months');
        }

        setDatesInRange(dates);
        dates.forEach((dateObj, index) => {
            fetchRevenue(dateObj, index);
        });
    };

    const handleRangeChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedRange(selectedValue);

        if (selectedValue === 'week') {
            handleSetDefaultDates();
        } else if (selectedValue === 'month') {
            handleSetMonthDates();
        }
    };

    useEffect(() => {
        handleSetDefaultDates();
    }, []);

    return (
        <div className="flex justify-center items-center flex-col space-y-4 border border-gray-300 shadow-lg p-4 rounded-md">
            <div className="flex items-center space-x-2">
                <div className="flex flex-col space-y-2">
                    <select
                        value={selectedRange}
                        onChange={handleRangeChange}
                        className="border border-gray-300 rounded-md p-2"
                    >
                        <option value="week">Day</option>
                        <option value="month">Month</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded"
                    onClick={handleCalculateDates}
                >
                    Calculate
                </button>


            </div>
            <div className="w-full">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={datesInRange} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TestChart;
