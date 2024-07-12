
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment'; // Import moment.js for date manipulation
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const P2 = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [datesInRange, setDatesInRange] = useState([]);
    const [selectedRange, setSelectedRange] = useState('week');
    const [chartData, setChartData] = useState({
        series: [],
        labels: []
    });
    const [chartData2, setChartData2] = useState({
        series: [],
        labels: []
    });

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

            fetchData(startDate, endDate);
        }
        // else {
        //     alert('Please enter both start date and end date.');
        // }
    };
    useEffect(() => {
        handleCalculateDates();
    }, [startDate, endDate]);

    const fetchData = async (startDate, endDate) => {
        // Format startDate to 00:00
        const formattedStartDate = new Date(startDate);
        formattedStartDate.setHours(0, 0, 0, 0);
        formattedStartDate.setHours(formattedStartDate.getHours() + 7); // Add 7 hours
        let startDateString;
        if (!isNaN(formattedStartDate.getTime())) {
            startDateString = formattedStartDate.toISOString().slice(0, 19);;
            // console.log("endDateString (ISO 8601):", endDateString);
        }

        // Format endDate to 23:59
        const formattedEndDate = new Date(endDate);
        formattedEndDate.setHours(23, 59, 59, 999);
        formattedEndDate.setHours(formattedEndDate.getHours() + 7); // Add 7 hours
        // const endDateString = formattedEndDate.toISOString().slice(0, 19); // Remove milliseconds and timezone
        let endDateString;
        if (!isNaN(formattedEndDate.getTime())) {
            endDateString = formattedEndDate.toISOString().slice(0, 19);;
            // console.log("endDateString (ISO 8601):", endDateString);
        }
        try {
            const response = await axios.get(`https://jssatsproject.azurewebsites.net/api/Staff/getTop6ByMonth?startDate=${startDateString}&endDate=${endDateString}`);
            if (response.data && response.data.data) {
                const seriesData = response.data.data.map(item => item.TotalRevenue);
                const labelsData = response.data.data.map(item => item.Firstname);

                setChartData({
                    series: seriesData,
                    labels: labelsData
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData2 = async (startDate, endDate) => {
        // Format startDate to 00:00
        const formattedStartDate = new Date(startDate);
        formattedStartDate.setHours(0, 0, 0, 0);
        formattedStartDate.setHours(formattedStartDate.getHours() + 7); // Add 7 hours
        let startDateString;
        if (!isNaN(formattedStartDate.getTime())) {
            startDateString = formattedStartDate.toISOString().slice(0, 19);;
            // console.log("endDateString (ISO 8601):", endDateString);
        }

        // Format endDate to 23:59
        const formattedEndDate = new Date(endDate);
        formattedEndDate.setHours(23, 59, 59, 999);
        formattedEndDate.setHours(formattedEndDate.getHours() + 7); // Add 7 hours
        let endDateString;
        if (!isNaN(formattedEndDate.getTime())) {
            endDateString = formattedEndDate.toISOString().slice(0, 19);;
            // console.log("endDateString (ISO 8601):", endDateString);
        }

        try {
            const response = await axios.get(`https://jssatsproject.azurewebsites.net/api/SellOrderDetail/CountProductsSoldByCategory?startDate=${startDateString}&endDate=${endDateString}`);
            if (response.data && response.data.data) {
                const seriesData = response.data.data.map(item => item.Quantity);
                const labelsData = response.data.data.map(item => item.Category);
                setChartData2({
                    series: seriesData,
                    labels: labelsData
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData(startDate, endDate);
        fetchData2(startDate, endDate);
    }, [startDate, endDate]);

    const [options, setOptions] = useState({
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        labels: chartData.labels
    });
    const [options2, setOptions2] = useState({
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options2: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        labels: chartData2.labels
    });

    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            labels: chartData.labels
        }));
    }, [chartData.labels]);
    useEffect(() => {
        setOptions2(prevOptions => ({
            ...prevOptions,
            labels: chartData2.labels
        }));
    }, [chartData2.labels]);
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

        fetchData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
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

        fetchData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
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
        <div className="flex justify-center items-center flex-col space-y-4 border border-gray-300 shadow-lg my-4  rounded-md">
            <div className="flex items-center space-x-2 ml-auto pr-4 pt-4">
                {/* <div className="flex flex-col space-y-2">
                    <select
                        value={selectedRange}
                        onChange={handleRangeChange}
                        className="border border-gray-300 rounded-md p-2"
                    >
                        <option value="week">Day</option>
                        <option value="month">Month</option>
                    </select>
                </div> */}

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
                {/* <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded"
                    onClick={handleCalculateDates}
                >
                    Calculate
                </button> */}
            </div>

            <div className="w-full flex space-x-4 p-2">
                <div className="w-2/3">
                    <div className="border border-gray-300 shadow-lg pb-20">
                        <ResponsiveContainer width="90%" height={400} className='mx-2 mt-10'>
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
                <div className="w-1/3">
                    <div className="flex flex-col space-y-4">
                        <div className="border border-gray-300 shadow-lg p-4">
                            <ReactApexChart options={options} series={chartData.series} type="donut" height={200} />
                        </div>
                        <div className="border border-gray-300 shadow-lg p-4">
                            <ReactApexChart options={options2} series={chartData2.series} type="donut" height={200} />
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default P2;
