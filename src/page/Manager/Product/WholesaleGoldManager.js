import React, { useEffect, useState } from 'react'
import { fetchAllRing } from '../../../apis/jewelryService'
import clsx from 'clsx'
import { IoIosSearch } from "react-icons/io";
import logo from '../../../assets/img/seller/WhGold.jpg'
import axios from "axios";
import Modal from 'react-modal';

const WholesaleGoldManager = () => {
    const [originalListProduct, setOriginalListProduct] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedWholeGold, setSelectedWholeGold] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ProductsPerPage = 10;

    useEffect(() => {
        getProduct();
    }, []);

    const handleDetailClick = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get(`https://jssatsproject.azurewebsites.net/api/product/getbycode?code=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res && res.data && res.data.data) {
                const details = res.data.data[0];
                setSelectedWholeGold(details);
                console.log('>>> check ressss', res)
                setIsModalOpen(true); // Open modal when staff details are fetched
            }

        } catch (error) {
            console.error('Error fetching staff details:', error);
        }
    };

    const getProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const res = await axios.get(`https://jssatsproject.azurewebsites.net/api/product/getall`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('... check staff', res);
            if (res && res.data && res.data.data) {
                const allProducts = res.data.data;
                const diamondProducts = allProducts.filter(product => product.category === 'Whole gold');
                setListProduct(diamondProducts);
                setOriginalListProduct(diamondProducts);
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

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSearch = () => {
        let filteredProduct = originalListProduct;

        if (searchQuery) {
            filteredProduct = filteredProduct.filter((product) =>
                product.code.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setListProduct(filteredProduct);
        setSearchQuery('')
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWholeGold(null);
    };

    const indexOfLastProduct = currentPage * ProductsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
    const currentProducts = listProduct.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(listProduct.length / ProductsPerPage);
    const placeholders = Array.from({ length: ProductsPerPage - currentProducts.length });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                <h1 className="text-2xl font-bold text-center mb-4">List of whole gold</h1>
                <div className="flex mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by code"
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
                                <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-bold text-[#212B36] bg-[#f6f8fa]">ID</th>
                                <th className="whitespace-nowrap py-3 text-sm font-bold text-[#212B36] bg-[#f6f8fa]">Category</th>
                                <th className="whitespace-nowrap py-3 text-sm font-bold text-[#212B36] bg-[#f6f8fa]">Code</th>
                                <th className="whitespace-nowrap py-3 text-sm font-bold text-[#212B36] bg-[#f6f8fa]">Name</th>
                                <th className="whitespace-nowrap py-3 text-sm font-bold text-[#212B36] bg-[#f6f8fa] pl-7"> {/* Adjust the padding value as needed */}
                                    Img
                                </th>
                                <th className="whitespace-nowrap py-3 text-sm font-bold text-[#212B36] bg-[#f6f8fa]">Price</th>
                                <th className="whitespace-nowrap py-3 text-sm font-bold text-[#212B36] bg-[#f6f8fa] text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody >
                            {currentProducts.map((item, index) => (
                                <tr key={index} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                                    <td className="rounded-l-lg pl-3 text-sm font-normal text-[#637381]">{item.id}</td>
                                    <td className="text-sm font-normal text-[#637381]">{item.category}</td>
                                    <td className="text-sm font-normal text-[#637381]">{item.code}</td>
                                    <td className="text-sm font-normal text-[#637381]">{item.name}</td>
                                    <td className="text-sm font-normal text-[#637381]"> <img src={logo} className="w-20 h-20" /> </td>
                                    <td className="text-sm font-normal text-[#637381]">{formatCurrency(item.productValue)}</td>
                                    <button
                                        className="my-2 border border-white bg-[#4741b1d7] text-white rounded-md transition duration-200 ease-in-out hover:bg-[#1d3279] active:bg-[#4741b174] focus:outline-none"
                                        onClick={() => handleDetailClick(item.code)}
                                    >
                                        Detail
                                    </button>

                                </tr>
                            ))}
                            {placeholders.map((_, index) => (
                                <tr key={`placeholder-${index}`} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)]">
                                    <td className="rounded-l-lg pl-3 text-sm font-normal text-[#637381] py-4">-</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">-</td>
                                    <td className="text-sm font-normal text-[#637381] py-4">-</td>
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
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Staff Details"
                    className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >

                    {selectedWholeGold && (
                        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                                <h2 className="text-xl font-bold mb-4">{selectedWholeGold.name}</h2>

                                {/* <p><strong>ID:</strong> {selectedDiamond.id}</p> */}
                                <p className="text-sm text-gray-700 mb-2"><strong>ID:</strong> {selectedWholeGold.id}</p>
                                <p className="text-sm text-gray-700 mb-2"><strong>Code:</strong> {selectedWholeGold.code}</p>
                                <p className="text-sm text-gray-700 mb-2"><strong>Category:</strong>{selectedWholeGold.category}</p>
                                <p className="text-sm text-gray-700 mb-2"><strong>Material:</strong> {selectedWholeGold.materialName}</p>
                                <p className="text-sm text-gray-700 mb-2"><strong>Material Weight:</strong> {selectedWholeGold.materialWeight}</p>

                                <p className="text-sm text-gray-700 mb-2"><strong>Price Rate: </strong>{selectedWholeGold.priceRate}</p>
                                <h1 ><strong>Price:</strong> {formatCurrency(selectedWholeGold.productValue)}</h1>
                                <div className='flex'>
                                    <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" style={{ width: '5rem' }}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default WholesaleGoldManager