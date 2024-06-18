import React, { useEffect, useState } from 'react'
import { fetchAllCustomer } from '../../apis/jewelryService'
import styles from '../../style/cardForList.module.css'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { addCustomer } from '../../store/slice/cardSilec'
import axios from 'axios';
import Popup from 'reactjs-popup';

const Customer = () => {


  const dispatch = useDispatch();
  const [listCustomer, setListCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    let res = await fetchAllCustomer();
    if (res && res.data && res.data.data) {
      setListCustomer(res.data.data);
    }
  };

  const filteredCustomers = listCustomer.filter((customer) =>
  (customer.id.toString().includes(searchTerm) ||
    customer.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm))
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const [firstname, setfirstname] = useState()
  const [lastname, setlastname] = useState()
  const [phone, setphone] = useState()
  const [email, setemail] = useState()
  const [gender, setgender] = useState()
  const [address, setaddress] = useState()
  const handSubmitOrder = async () => {
    let data = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      gender: gender,
      address: address,
    }
    let res = await axios.post('https://jssatsproject.azurewebsites.net/api/customer/Createcustomer',data);
    console.log(res)
  }

  return (
    <>

      

        <div className='h-[70px] px-[30px] mt-5 mb-2 w-full'>
          <form className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Item, ID in here..."
                required
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </form>
          
          <Popup trigger={<button type="button" className="m-0 mb-2 flex justify-center items-center bg-[#00AC7C] text-white gap-1 cursor-pointer tracking-widest rounded-md hover:bg-[#00ac7b85] duration-300 hover:gap-2 hover:translate-x-3">

            Add
            <svg class="w-5 h-5" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" stroke-linejoin="round" stroke-linecap="round" ></path>
            </svg>
          
        </button>} position="right center">
        {close => (
          <div className='fixed top-0 bottom-0 left-0 right-0 bg-[#6f85ab61] overflow-y-auto'>
                            <div className='bg-[#fff] my-[70px] mx-auto rounded-md w-[40%] shadow-[#b6b0b0] shadow-md'>
                              <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
                              <h3 className="text-lg font-semibold text-gray-900">
                Create New Customer
              </h3>
                                <a className='cursor-pointer text-black text-[24px] py-0' onClick={close}>&times;</a>
                              </div>
                               {/* <!-- Modal body --> */}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-start-1">
                  <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                  <input value={firstname} onChange={(even) => setfirstname(even.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="John" required="" />
                </div>
                <div className="col-start-2">
                  <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                  <input value={lastname} onChange={(even) => setlastname(even.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Wick" required="" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                  <input value={phone} onChange={(even) => setphone(even.target.value)} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="0101010101" required="" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input value={email} onChange={(even) => setemail(even.target.value)} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="jewelryStore@gmail.com" required="" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <input value={address} onChange={(even) => setaddress(even.target.value)} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Jewelry Store" required="" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                  <select onChange={(even)=> setgender(even.target.value)} className='border border-gray-300 bg-gray-50 rounded-md w-full h-[41.6px] font-normal text-gray-400'>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <input hidden className='border border-gray-300 bg-gray-50 rounded-md w-fit h-[41.6px] font-normal text-gray-400' value='0' />
              </div>
              <button onClick={() => handSubmitOrder()} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Add new customer
              </button>
            </form>
                              </div>
                              </div>
          )}
          </Popup>

        <div className='h-[80vh] flex justify-center'>
        <div className="w-[800px] overflow-hidden overflow-y-auto">
          <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-y-scroll text-left md:overflow-auto">
          <thead className=" w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-white">
          <tr className="">
            <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36]">Customer ID</th>
            <th className="whitespace-nowrap py-3 pl-1 text-sm font-normal text-[#212B36]">First Name</th>
            <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">Last Name</th>
            <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">PhoneNumber</th>
            <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">Total Point</th>
            <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">Action</th>
          </tr>
         </thead>
            <tbody>
              {filteredCustomers.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl"
                  >
                    <td className="rounded-l-lg text-sm font-normal text-[#637381] flex justify-center py-4">{item.id}</td>
                    <td className=" text-sm font-normal text-[#637381]">{item.firstname}</td>
                    <td className=" text-sm font-normal text-[#637381]">{item.lastname}</td>
                    <td className=" text-sm font-normal text-[#637381]">{item.phone}</td>
                    <td className=" text-sm font-normal text-[#637381]">{item.totalPoint}</td>
                    <td className=" text-sm font-normal text-[#637381]">
                      <button
                        onClick={() => dispatch(addCustomer(item))}
                        className="my-2 mx-0 border border-white bg-[#4741b1d7] text-white rounded-md transition duration-200 ease-in-out hover:bg-[#1d3279] active:bg-[#4741b174] focus:outline-none"
                      >
                        Apply
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
        </div>


        {/* <div id="popup1" className={clsx(styles.overlay)}>
          <div className={clsx(styles.popup)}>
            <a className={clsx(styles.close)} href='#'>&times;</a>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Customer
              </h3>


            </div>
           
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-start-1">
                  <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                  <input value={firstname} onChange={(even) => setfirstname(even.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="John" required="" />
                </div>
                <div className="col-start-2">
                  <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                  <input value={lastname} onChange={(even) => setlastname(even.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Wick" required="" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                  <input value={phone} onChange={(even) => setphone(even.target.value)} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="0101010101" required="" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input value={email} onChange={(even) => setemail(even.target.value)} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="jewelryStore@gmail.com" required="" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <input value={address} onChange={(even) => setaddress(even.target.value)} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Jewelry Store" required="" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                  <select onChange={(even)=> setgender(even.target.value)} className='border border-gray-300 bg-gray-50 rounded-md w-full h-[41.6px] font-normal text-gray-400'>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <input hidden className='border border-gray-300 bg-gray-50 rounded-md w-fit h-[41.6px] font-normal text-gray-400' value='0' />
              </div>
              <button onClick={() => handSubmitOrder()} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Add new customer
              </button>
            </form>
          </div>
        </div> */}

     

    </>)
}

export default Customer