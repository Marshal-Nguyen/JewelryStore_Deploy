
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { format } from 'date-fns';
import axios from "axios";
import clsx from 'clsx';
import { toast } from 'react-toastify';

const PromotionRequest = () => {
    const [originalListPromotion, setOriginalListPromotion] = useState([]);
    const [listPromotion, setListPromotion] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const promotionsPerPage = 10;

    useEffect(() => {
        getPromotion();
        getCategory();
    }, []);

    const getCategory = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get('https://jssatsproject.azurewebsites.net/api/productcategory/getall', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res && res.data && res.data.data) {
                const categories = res.data.data;
                setCategories(categories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getPromotion = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get('https://jssatsproject.azurewebsites.net/api/promotionRequest/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res && res.data && res.data.data) {
                const promotions = res.data.data;
                setOriginalListPromotion(promotions);
                setListPromotion(promotions);
            }
        } catch (error) {
            console.error('Error fetching promotions:', error);
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
        let filteredPromotions = originalListPromotion;

        if (searchQuery) {
            filteredPromotions = filteredPromotions.filter((promotion) =>
                promotion.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setListPromotion(filteredPromotions);
    };

    const getNamefromDescription = (value) => {
        const newlinePosition = value.indexOf('\n');
        return newlinePosition !== -1 ? value.substring(0, newlinePosition) : value;
    }

    const getDescription = (value) => {
        const newlinePosition = value.indexOf('\n');
        return newlinePosition !== -1 ? value.substring(newlinePosition + 1) : '';
    }

    const openModal = (requestId) => {
        setSelectedRequestId(requestId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRequestId(null);
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const staffId = localStorage.getItem('staffId');

            if (!token || !staffId) {
                throw new Error("Token or staffId not found");
            }

            // Fetch the current promotion details from the listPromotion state
            const promotionToUpdate = listPromotion.find(promo => promo.requestId === selectedRequestId);

            if (!promotionToUpdate) {
                throw new Error("Promotion request not found");
            }

            // Construct the payload with only approvedBy and status
            const payload = {
                ...promotionToUpdate,  // Keep existing fields as they are
                approvedBy: staffId,    // Update approvedBy
                status: newStatus      // Update status rejected approved
            };

            // Send the PUT request to update the promotion request
            const res = await axios.put(`https://jssatsproject.azurewebsites.net/api/promotionrequest/UpdatePromotionRequest?id=${selectedRequestId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // // If status is 'approved', create a new promotion
            if (newStatus === 'approved') {
                const { description, discountRate, startDate, endDate, categories } = promotionToUpdate;


                const createPromotionPayload = {
                    name: getNamefromDescription(description),
                    description: getDescription(description),
                    discountRate,
                    startDate,
                    endDate,
                    categoriIds: promotionToUpdate.categories.map(category => category.id),
                    status: 'active'
                };
                console.log('>>>check new promotion approved', createPromotionPayload)
                const createPromotionRes = await axios.post('https://jssatsproject.azurewebsites.net/api/promotion/createpromotion', createPromotionPayload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                //Assuming create promotion API returns the created promotion details
                if (createPromotionRes && createPromotionRes.data) {
                    // toast.success('Promotion created successfully');
                } else {
                    throw new Error('Failed to create promotion');
                }
            }

            toast.success('Status updated successfully');

            closeModal();
            getPromotion(); // Refresh promotion list after update
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };



    const indexOfLastPromotion = currentPage * promotionsPerPage;
    const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
    const currentPromotions = listPromotion.slice(indexOfFirstPromotion, indexOfLastPromotion);

    const totalPages = Math.ceil(listPromotion.length / promotionsPerPage);
    const placeholders = Array.from({ length: promotionsPerPage - currentPromotions.length });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                <h1 className="text-2xl font-bold text-center mb-4">Promotion Request List</h1>
                <div className="flex mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name"
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
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">Description</th>
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa] text-center">Discount Rate</th>
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">From</th>
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">To</th>
                                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa] text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPromotions.map((item, index) => (
                                <tr key={index} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                                    <td className="rounded-l-lg pl-3 text-sm font-normal text-[#637381] py-4">{item.requestId}</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">{getNamefromDescription(item.description)}</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">{getDescription(item.description)}</td>
                                    <td className="text-sm font-normal text-[#637381] text-center py-4">{item.discountRate}</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">{format(new Date(item.startDate), 'dd/MM/yyyy')}</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">{format(new Date(item.endDate), 'dd/MM/yyyy')}</td>
                                    <td className="text-sm font-normal text-[#637381] text-center">
                                        {item.status === 'approved'
                                            ? (<span className="text-green-500 ">Approved</span>)
                                            : item.status === 'rejected' ? (
                                                <span className="text-red-500">Rejected</span>
                                            ) : (<button
                                                className="my-2 border border-white bg-[#4741b1d7] text-white rounded-md transition duration-200 ease-in-out hover:bg-[#1d3279] active:bg-[#4741b174] focus:outline-none"
                                                onClick={() => openModal(item.requestId)} // Open modal with requestId on button click
                                            >
                                                {item.status}
                                            </button>)
                                        }
                                        {/* <button
                                            className="my-2 border border-white bg-[#4741b1d7] text-white rounded-md transition duration-200 ease-in-out hover:bg-[#1d3279] active:bg-[#4741b174] focus:outline-none"
                                            onClick={() => openModal(item.requestId)} // Open modal with requestId on button click
                                        >
                                            {item.status}
                                        </button> */}

                                    </td>
                                </tr>
                            ))}
                            {placeholders.map((_, index) => (
                                <tr key={`placeholder-${index}`} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)]">
                                    <td className="rounded-l-lg pl-3 text-sm font-normal text-[#637381] py-4">-</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">-</td>
                                    <td className="text-sm font-normal text-[#637381] text-center py-4">-</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">-</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">-</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">-</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">-</td>
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

            {showModal && (
                <StatusUpdateModal
                    onClose={closeModal}
                    requestId={selectedRequestId}
                    handleStatusUpdate={handleStatusUpdate}
                />
            )}
        </div>
    );
};

const StatusUpdateModal = ({ onClose, requestId, handleStatusUpdate }) => {
    const [newStatus, setNewStatus] = useState('approved');

    const handleSubmit = () => {
        handleStatusUpdate(newStatus);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
                <h2 className="text-lg font-semibold mb-4">Update Promotion Request Status</h2>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Response: </label>
                    <select
                        id="status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Update
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromotionRequest;
