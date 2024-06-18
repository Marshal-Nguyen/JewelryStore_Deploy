import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Staff = () => {
    const [originalListaccount, setOriginalListaccount] = useState([]);
    const [listaccount, setListaccount] = useState([]);
    const [listStaff, setListStaff] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const accountsPerPage = 10;

    useEffect(() => {
        getaccount();
        getStaff();
    }, []);

    const getStaff = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get(`https://jssatsproject.azurewebsites.net/api/staff/getall`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('... check staff', res);
            if (res && res.data && res.data.data) {
                const staffs = res.data.data;
                setListStaff(staffs);
            }
        } catch (error) {
            console.error('Error fetching staffs:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const getaccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get('https://jssatsproject.azurewebsites.net/api/account/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('... check account', res);
            if (res && res.data && res.data.data) {
                const account = res.data.data;
                setOriginalListaccount(account);
                setListaccount(account);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSearch = () => {
        if (searchQuery === '') {
            // If search query is empty, reset to original list of accounts
            setListaccount(originalListaccount);
        } else {
            const filteredaccounts = originalListaccount.filter((account) =>
                account.id.toString() === searchQuery // Convert id to string to ensure it can be searched
            );

            // Update state with filtered accounts
            setListaccount(filteredaccounts);
        }
        setSearchQuery('');
    };


    const handleIdClick = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get(`https://jssatsproject.azurewebsites.net/api/staff/getById?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res && res.data && res.data.data) {
                const staffDetails = res.data.data;
                setSelectedStaff(staffDetails);
                setIsModalOpen(true); // Open modal when staff details are fetched
            }
        } catch (error) {
            console.error('Error fetching staff details:', error);
        }
    };

    const indexOfLastaccount = currentPage * accountsPerPage;
    const indexOfFirstaccount = indexOfLastaccount - accountsPerPage;
    const currentaccounts = listaccount.slice(indexOfFirstaccount, indexOfLastaccount);
    const totalPages = Math.ceil(listaccount.length / accountsPerPage);
    const placeholders = Array.from({ length: accountsPerPage - currentaccounts.length });

    // Merge account and staff data based on id
    const mergedData = currentaccounts.map(account => {
        const staff = listStaff.find(staff => staff.id === account.id) || {};
        return { ...account, firstname: staff.firstname || '', lastname: staff.lastname || '' };
    });

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStaff(null);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                <h1 className="text-2xl font-bold text-center mb-4">Staff management list</h1>
                <div className="flex mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Id"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-[400px]"
                        />
                        <IoIosSearch className="absolute top-0 right-0 mr-3 mt-3 cursor-pointer text-gray-500" onClick={handleSearch} />
                    </div>
                </div>
                <div className="w-[1000px] overflow-hidden">
                    <table className="font-inter w-full table-auto border-separate border-spacing-y-1 text-left">
                        <thead className="w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-white sticky top-0">
                            <tr>
                                <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">ID</th>
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">Name</th>
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">Username</th>
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">Password</th>
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">Role Id</th>
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa] text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mergedData.map((item, index) => (
                                // hover:shadow-2xl
                                <tr key={index} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl" >
                                    <td className="rounded-l-lg pl-3 text-base font-normal text-[#637381] py-4">{item.id}</td>
                                    <td className="text-base font-normal text-[#637381] py-4">{item.firstname} {item.lastname}</td>
                                    <td className="text-base font-normal text-[#637381] py-4">{item.username}</td>
                                    <td className="text-base font-normal text-[#637381] py-4">{item.password}</td>
                                    <td className="text-base font-normal text-[#637381] py-4">
                                        {
                                            item.roleId === 2
                                                ? 'Admin'
                                                : item.roleId === 1
                                                    ? 'Seller'
                                                    : item.roleId === 4
                                                        ? 'Manager'
                                                        : item.roleId === 3
                                                            ? 'Cashier'
                                                            : item.roleId
                                        }
                                    </td>
                                    <td className="text-base font-normal text-[#637381] py-4">
                                        <button className="my-2 border border-white bg-[#4741b1d7] text-white rounded-md transition duration-200 ease-in-out hover:bg-[#1d3279] active:bg-[#4741b174] focus:outline-none" onClick={() => handleIdClick(item.id)}>
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {placeholders.map((_, index) => (
                                <tr key={`placeholder-${index}`} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)]">
                                    <td className="rounded-l-lg pl-3 text-base font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base font-normal text-[#637381] py-4">-</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                <div className="flex justify-center my-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={clsx(
                                "mx-1 px-3 py-1 rounded",
                                { "bg-blue-500 text-white": currentPage === i + 1 },
                                { "bg-gray-200": currentPage !== i + 1 }
                            )}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                {/* Modal for displaying staff details */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Staff Details"
                    className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <h2 className="text-xl font-bold mb-4">Staff Details</h2>
                    {selectedStaff && (
                        <div>
                            <p><strong>ID:</strong> {selectedStaff.id}</p>
                            <p><strong>Name:</strong> {selectedStaff.firstname} {selectedStaff.lastname}</p>
                            <p><strong>Phone:</strong> {selectedStaff.phone}</p>
                            <p><strong>Email:</strong> {selectedStaff.email}</p>
                            <p><strong>Address:</strong> {selectedStaff.address}</p>
                            <p><strong>Gender:</strong> {selectedStaff.gender}</p>
                            {/* Add more details as needed */}
                            <div className='flex'>
                                {/* <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded ml-14 my-1 " style={{ width: '5rem' }}>Edit</button> */}
                                <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded " style={{ width: '5rem' }}>Close</button>
                            </div>

                        </div>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default Staff;
