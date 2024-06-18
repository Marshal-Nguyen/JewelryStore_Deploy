
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { format } from 'date-fns'; // Import format function from date-fns
import axios from "axios";
import clsx from 'clsx';

const PromotionList = () => {
  const [originalListPromotion, setOriginalListPromotion] = useState([]);
  const [listPromotion, setListPromotion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromotion, setSelectedPromotion] = useState(null); // State to hold selected promotion
  const promotionsPerPage = 10;

  useEffect(() => {
    getPromotion();
  }, []);

  const getPromotion = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found");
      }
      const res = await axios.get('https://jssatsproject.azurewebsites.net/api/promotion/getAll', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('... check promotion', res);
      if (res && res.data && res.data.data) {
        const promotions = res.data.data;
        setOriginalListPromotion(promotions);
        setListPromotion(promotions);
      }
    } catch (error) {
      console.error('Error fetching promotions:', error);
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
    let filteredPromotions = originalListPromotion;

    if (searchQuery) {
      filteredPromotions = filteredPromotions.filter((promotion) =>
        promotion.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setListPromotion(filteredPromotions);
    setSearchQuery('')
  };

  const handleDetailClick = (promotion) => {
    setSelectedPromotion(promotion); // Set selected promotion for detail view
  };

  const indexOfLastPromotion = currentPage * promotionsPerPage;
  const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
  const currentPromotions = listPromotion.slice(indexOfFirstPromotion, indexOfLastPromotion);

  const totalPages = Math.ceil(listPromotion.length / promotionsPerPage);
  const placeholders = Array.from({ length: promotionsPerPage - currentPromotions.length });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">Promotion List</h1>
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
                <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">Promotion ID</th>
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">Full Name</th>
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa] text-center">Discount Rate</th>
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">From</th>
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">To</th>
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPromotions.map((item, index) => (
                <tr key={index} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                  <td className="rounded-l-lg pl-3 text-sm font-normal text-[#637381]">{item.id}</td>
                  <td className="text-sm font-normal text-[#637381]">{item.name}</td>
                  <td className="text-sm font-normal text-[#637381] text-center">{item.discountRate} </td>
                  <td className="text-sm font-normal text-[#637381]">{format(new Date(item.startDate), 'dd/MM/yyyy')}</td>
                  <td className="text-sm font-normal text-[#637381]">{format(new Date(item.endDate), 'dd/MM/yyyy')}</td>
                  <td className="text-sm font-normal text-[#637381]">
                    <button
                      className="my-2 border border-white bg-[#4741b1d7] text-white rounded-md transition duration-200 ease-in-out hover:bg-[#1d3279] active:bg-[#4741b174] focus:outline-none"
                      onClick={() => handleDetailClick(item)}
                    >
                      Detail
                    </button>
                  </td>
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

      {/* Modal for Promotion Detail */}
      {selectedPromotion && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{selectedPromotion.name}</h2>
            <p className="text-sm text-gray-700 mb-2">ID: {selectedPromotion.id}</p>
            <p className="text-sm text-gray-700 mb-2">Discount Rate: {selectedPromotion.discountRate}</p>
            <p className="text-sm text-gray-700 mb-2">Description: {selectedPromotion.description}</p>
            <p className="text-sm text-gray-700 mb-2">Start Date: {format(new Date(selectedPromotion.startDate), 'dd/MM/yyyy')}</p>
            <p className="text-sm text-gray-700 mb-2">End Date: {format(new Date(selectedPromotion.endDate), 'dd/MM/yyyy')}</p>
            <div >
              <p className="text-sm text-gray-700 mb-2">Categories:</p>
              <ul className="list-disc list-inside">
                {selectedPromotion.categories.map((category, index) => (
                  <li key={index} className="text-sm">{category.name}</li>
                ))}
              </ul>
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={() => setSelectedPromotion(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionList;

