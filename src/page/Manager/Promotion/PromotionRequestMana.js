
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { format } from 'date-fns';
import axios from "axios";
import clsx from 'clsx';
import { toast } from 'react-toastify';

const PromotionRequestMana = () => {
  const [originalListPromotion, setOriginalListPromotion] = useState([]);
  const [listPromotion, setListPromotion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const [newPromotion, setNewPromotion] = useState({
    discountRate: '',
    description: '',
    startDate: '',
    endDate: '',
    managerID: localStorage.getItem('staffId'),
    createdAt: new Date().toISOString(),
    categoriIds: []
  });
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
    setSearchQuery('');
    setListPromotion(filteredPromotions);
  };

  const handleAddPromotion = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'categoriIds') {
      const categoryId = value;
      let updatedcategoriIds = [...newPromotion.categoriIds];

      if (checked) {
        if (!updatedcategoriIds.includes(categoryId)) {
          updatedcategoriIds.push(categoryId);
        }
      } else {
        updatedcategoriIds = updatedcategoriIds.filter(id => id !== categoryId);
      }

      setNewPromotion(prevPromotion => ({
        ...prevPromotion,
        categoriIds: updatedcategoriIds,
      }));
    } else {
      setNewPromotion(prevPromotion => ({
        ...prevPromotion,
        [name]: value
      }));
    }
  };

  const handleCreatePromotion = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found");
      }

      const promotionToSend = {
        ...newPromotion,
        categoriIds: newPromotion.categoriIds.map(id => parseInt(id))
      };

      const res = await axios.post('https://jssatsproject.azurewebsites.net/api/promotionrequest/CreatePromotionRequest', promotionToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res && res.data) {
        getPromotion();
        setIsModalOpen(false);
        setNewPromotion({
          discountRate: '',
          description: '',
          startDate: '',
          endDate: '',
          managerID: localStorage.getItem('staffId'),
          createdAt: new Date().toISOString(),
          categoriIds: []
        });
      }
    } catch (error) {
      console.error('Error creating promotion:', error);
    }
    toast.success('Create request successfully !')
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setNewPromotion({
      discountRate: '',
      description: '',
      startDate: '',
      endDate: '',
      managerID: localStorage.getItem('staffId'),
      createdAt: new Date().toISOString(),
      categoriIds: []
    });

  };

  const getNamefromDescription = (value) => {
    // Tìm vị trí của dấu '\n'
    const newlinePosition = value.indexOf('\n');
    // Nếu có dấu '\n' trong chuỗi, lấy phần trước nó
    return newlinePosition !== -1 ? value.substring(0, newlinePosition) : value;
  }

  const getDescription = (value) => {
    // Tìm vị trí của dấu '\n'
    const newlinePosition = value.indexOf('\n');
    // Nếu có dấu '\n' trong chuỗi, lấy phần sau nó
    return newlinePosition !== -1 ? value.substring(newlinePosition + 1) : '';
  }


  const indexOfLastPromotion = currentPage * promotionsPerPage;
  const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
  const currentPromotions = listPromotion.slice(indexOfFirstPromotion, indexOfLastPromotion);

  const totalPages = Math.ceil(listPromotion.length / promotionsPerPage);
  const placeholders = Array.from({ length: promotionsPerPage - currentPromotions.length });



  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">Promotion Request List</h1>
        <div className="flex mb-4 items-center">
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={handleAddPromotion}
            >
              Add new promotion
            </button>
          </div>
          <div className="relative w-[400px] ml-auto">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <IoIosSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700" onClick={handleSearch} />
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
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36] bg-[#f6f8fa]">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPromotions.map((item, index) => (
                <tr key={index} className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                  <td className="rounded-l-lg pl-3 text-sm font-normal text-[#637381] py-4">{item.requestId}</td>
                  <td className="text-sm font-normal text-[#637381] py-4">{getNamefromDescription(item.description)}  </td>
                  <td className="text-sm font-normal text-[#637381] py-4">{getDescription(item.description)}</td>
                  <td className="text-sm font-normal text-[#637381] text-center py-4">{item.discountRate} </td>
                  <td className="text-sm font-normal text-[#637381] py-4">{format(new Date(item.startDate), 'dd/MM/yyyy')}</td>
                  <td className="text-sm font-normal text-[#637381] py-4">{format(new Date(item.endDate), 'dd/MM/yyyy')}</td>
                  <td className="text-sm font-normal text-[#637381] py-4">
                    {item.status === 'approved'
                      ? (<span className="text-green-500 ">Approved</span>)
                      : item.status === 'rejected' ? (
                        <span className="text-red-500">Rejected</span>
                      ) : item.status
                    }
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

      {/* Modal for adding new promotion */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[500px]">

            <h2 className="text-lg font-semibold mb-4">Add New Promotion</h2>
            <form onSubmit={handleCreatePromotion}>

              <div className="mb-4">
                <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700">Discount Rate (%)</label>
                <input
                  type="number"
                  id="discountRate"
                  name="discountRate"
                  value={newPromotion.discountRate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newPromotion.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newPromotion.startDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newPromotion.endDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Add selection for categories */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={category.id}
                        name="categoriIds"
                        value={category.id.toString()}
                        checked={newPromotion.categoriIds.includes(category.id.toString())}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor={category.id.toString()}>{category.name}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-0"
                >
                  Create Promotion
                </button>
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Close
                </button>
              </div>


            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionRequestMana;

