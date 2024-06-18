import React, { useEffect, useState } from 'react';
import { fetchAllCustomer } from '../../../apis/jewelryService';
import axios from 'axios';
import clsx from 'clsx';
import { IoIosSearch } from 'react-icons/io';

const CustomerMana = () => {
    const [originalListCustomer, setOriginalListCustomer] = useState([]);
    const [listCustomer, setListCustomer] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const customersPerPage = 10;

    useEffect(() => {
        getCustomer();
    }, []);

    const getCustomer = async () => {
        let res = await fetchAllCustomer();
        if (res && res.data && res.data.data) {
            const customers = res.data.data;
            setOriginalListCustomer(customers);
            setListCustomer(customers);
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
            setListCustomer(originalListCustomer);
        } else {
            const filteredCustomers = originalListCustomer.filter((customer) =>
                customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setListCustomer(filteredCustomers);
        }
    };

    const handleEditClick = (customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedCustomer({ ...selectedCustomer, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const res = await axios.put(
                `https://jssatsproject.azurewebsites.net/api/Customer/UpdateCustomer?id=${selectedCustomer.id}`,
                selectedCustomer
            );
            if (res.status === 200) {
                const updatedCustomers = originalListCustomer.map((customer) =>
                    customer.id === selectedCustomer.id ? selectedCustomer : customer
                );
                setOriginalListCustomer(updatedCustomers);
                setListCustomer(updatedCustomers);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Failed to update customer:', error);
        }
    };

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = listCustomer.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const totalPages = Math.ceil(listCustomer.length / customersPerPage);
    const placeholders = Array.from({ length: customersPerPage - currentCustomers.length });

    const renderModal = () => {
        if (!isModalOpen || !selectedCustomer) return null;
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-xl mb-4">Edit Customer</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={selectedCustomer.firstname}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={selectedCustomer.lastname}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={selectedCustomer.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={selectedCustomer.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Gender</label>
                            <select
                                name="gender"
                                value={selectedCustomer.gender}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveChanges}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                <h1 className="text-2xl font-bold text-center mb-4">Customer Management List</h1>
                <div className="flex mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by phone number"
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
                                <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">Customer ID</th>
                                <th className="whitespace-nowrap py-3 text-base  font-normal text-[#212B36] bg-[#f6f8fa]">Full Name</th>
                                <th className="whitespace-nowrap py-3 text-base  font-normal text-[#212B36] bg-[#f6f8fa]">PhoneNumber</th>
                                <th className="whitespace-nowrap py-3 text-base  font-normal text-[#212B36] bg-[#f6f8fa]">Gender</th>
                                <th className="whitespace-nowrap py-3 text-base  font-normal text-[#212B36] bg-[#f6f8fa]">Total Point</th>
                                <th className="whitespace-nowrap py-3 text-base  font-normal text-[#212B36] bg-[#f6f8fa] text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers.map((item, index) => (
                                <tr key={index} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                                    <td className="rounded-l-lg pl-3 text-sm font-normal text-[#637381]">{item.id}</td>
                                    <td className="text-base  font-normal text-[#637381]">{item.firstname} {item.lastname}</td>
                                    <td className="text-base  font-normal text-[#637381]">{item.phone}</td>
                                    <td className="text-base  font-normal text-[#637381]">{item.gender}</td>
                                    <td className="text-base  font-normal text-[#637381]">{item.totalPoint}</td>
                                    <td className="text-base  font-normal text-[#637381]">
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            className="my-2 border border-white bg-[#4741b1d7] text-white rounded-md transition duration-200 ease-in-out hover:bg-[#1d3279] active:bg-[#4741b174] focus:outline-none"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {placeholders.map((_, index) => (
                                <tr key={`placeholder-${index}`} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)]">
                                    <td className="rounded-l-lg pl-3 text-base  font-normal text-[#637381]">-</td>
                                    <td className="text-base  font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base  font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base  font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base  font-normal text-[#637381] py-4">-</td>
                                    <td className="text-base  font-normal text-[#637381] py-4">-</td>
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
            </div>
            {renderModal()}
        </div>
    );
};

export default CustomerMana;

