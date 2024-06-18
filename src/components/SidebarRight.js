import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import  addProduct, deleteProduct  from '../../../'

import { deleteProduct, deleteCustomer, deleteProductAll, deletePromotion } from '../store/slice/cardSilec'

import { MdDeleteOutline } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import styles from '../style/cardForList.module.css'
import clsx from 'clsx'
import Popup from 'reactjs-popup';

import { toast } from 'react-toastify';
import axios from 'axios';

const SidebarRight = () => {
  const dispatch = useDispatch()
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString())
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date().toISOString());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const CartProduct = useSelector(state => state.cart.CartArr);
  const CusPoint = useSelector(state => state.cart.CusPoint);
  // const CartPromotion = useSelector(state => state.cart.CartPromotion);

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    if (CusPoint && CusPoint[0] && CusPoint[0].phone) {
      setcustomerPhoneNumber(CusPoint[0].phone);
    }
    const calculateTotal = () => {
      let totalValue = 0;
      CartProduct.forEach((product) => {
        totalValue += product.productValue * product.quantity
      });
      setTotal(totalValue);
    };
    calculateTotal();
    const calculateDiscount = () => {
      let totalDiscount = 0;
      CartProduct.forEach((product) => {
        totalDiscount += product.productValue * product.quantity * product.discountRate
      });
      setDiscount(totalDiscount);
    };
    calculateDiscount();
  }, [CartProduct][CusPoint]);


  const totalInvoice = total - discount
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const toastSpectial = () => {
    toast.warning('Sent Special Discount')
  }
  const toastSpectia2 = () => {
    toast.warning('Wrong Value')
  }
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    if (!isChecked) {
      setIsChecked(true);
      toastSpectial();
    }
  };
  const [customerPhoneNumber, setcustomerPhoneNumber] = useState('')
  const [staffId, setstaffId] = useState(null)
  const [createDate,setcreateDate] = useState(new Date().toISOString());
  useEffect(() => {
    const interval1 = setInterval(() => {
      setcreateDate(new Date().toISOString())
    }, 1000);
    return () => clearInterval(interval1);
  }, []);
  const [description, setdescription] = useState('')
  const [productCodesAndQuantity, setproductCodesAndQuantity] = useState(null)
  const [productCodesAndPromotionIds, setproductCodesAndPromotionIds] = useState(null)

  const [specialDiscountRequestId, setspecialDiscountRequestId] = useState(null)
  const [isSpecialDiscountRequested, setisSpecialDiscountRequested] = useState(false)

  const [discountRejectedReason, setdiscountRejectedReason] = useState(null)
  const [specialDiscountRequestStatus, setspecialDiscountRequestStatus] = useState(null)
  const [specialDiscountRate, setspecialDiscountRate] = useState(null)
  const [point, setpoint] = useState("")

  useEffect(() => {
    const codesAndQuantity = CartProduct.reduce((acc,product) => {
      acc[product.code] = product.quantity;
      return acc;
    }, {});
    // const productcodesAndPromotion = CartProduct.reduce((pr,product) => {
    //   pr[product.code] = product.promotionId;
    //   return pr;
    // }, {});
    // setproductCodesAndPromotionIds('');
    setproductCodesAndQuantity(codesAndQuantity);
  }, [CartProduct]);
  const handSubmitOrder = async () => {
    let data = {
      customerPhoneNumber: customerPhoneNumber,
      staffId: 4,
      createDate: createDate,
      description: description,
      discountPoint:0,
      productCodesAndQuantity: productCodesAndQuantity,
      productCodesAndPromotionIds: productCodesAndPromotionIds,
      isSpecialDiscountRequested: isSpecialDiscountRequested,
      specialDiscountRate: specialDiscountRate,
      specialDiscountRequestId: specialDiscountRequestId,
      discountRejectedReason: discountRejectedReason,
      specialDiscountRequestStatus: specialDiscountRequestStatus,
    }
    // console.log(data)
    // console.log(JSON.stringify(data, null, 2))
   let res = await axios.post('https://jssatsproject.azurewebsites.net/api/SellOrder/CreateOrder',data);
   console.log(res)
  }

  const [pointRate, setPointRate] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const handleRateChange = (event) => {
    const value = parseFloat(event.target.value);
    if (value < 0 || value > 1) {
      setIsInvalid(true);
      toastSpectia2()
    } else {
      setIsInvalid(false);
      setPointRate(value);
      setspecialDiscountRate(value);
      setisSpecialDiscountRequested(true);
    }
  };


  return (<>


    <div className='flex justify-center '>
      <div className='shadow-md shadow-gray-600 pt-[10px] rounded-t-2xl w-[90%] h-[34em] bg-[#f3f1ed] mt-[20px]'>
        <div className='flex justify-end'>
          {/* <select className="ml-[15px] relative text-black bg-transparent outline-none border border-white text-sm font-semibold rounded-md block w-[50%] p-1">
            <option>Sell</option>
            <option>Buy</option>
          </select> */}
          <div className='flex justify-end px-[15px] text-black font-thin'>{currentTime}</div>
        </div>
        <div className='flex justify-start px-[15px] text-black'>
          <p className='font-light'>Address:</p>
          <span className='w-full flex justify-center font-serif'>Jewelry Store</span>
        </div>
        <div className='flex items-center px-[15px] text-[#000]'>
          <p className='w-[260px] font-light '>Customer Phone:</p>
          {CusPoint && CusPoint[0] && CusPoint[0].phone && (
            <>
              <span id="phone" className='w-full flex items-center justify-between' >
                {CusPoint[0].phone}
                <span onClick={() => dispatch(deleteCustomer())} className='cursor-pointer rounded-md bg-[#fff] px-1 py-1'><MdDeleteOutline size='17px' color='#ef4e4e' /></span></span>
            </>

          )}

        </div>
        <div className='grid grid-cols-3 border border-x-0 border-t-0 mx-[10px] border-b-black pb-[2px] mb-2'>
          <div className='col-start-1 col-span-2 flex pl-[5px]'>Item</div>
          <div className='col-start-3 ml-6 flex justify-start'>Price</div>
        </div>

        <div id='screenSeller' className=' h-[45%] overflow-y-auto mb-2'>
          {CartProduct && CartProduct.map((item, index) => {
            return (

              <div key={`ring-${index}`} className='grid grid-cols-6 '>
                <div className='col-start-1 col-span-4 flex px-[10px] text-sm'>{item.name}</div>
                <div className='col-start-5 flex ml-[65px] justify-end text-[#d48c20] px-[10px]'>{formatPrice(item.productValue * item.quantity)}</div>
                <span onClick={() => dispatch(deleteProduct(item))} className='col-start-6 ml-8 w-[20px] flex items-center cursor-pointer rounded-md'><MdDeleteOutline size='17px' color='#ef4e4e' /></span>
                {!item.startDate && (
                  <div className='col-start-1 col-span-6 flex px-[14px] text-xs text-red-600 mt-[-6px]'>x{item.quantity}</div>
                )}

              </div>
            )
          })}
        </div>

        {/* <div className=' mx-[5px] py-2 mb-2 h-[10%] overflow-y-auto border border-red-500 rounded-md'>
        
          {CartPromotion && CartPromotion.map((item, index) => {
             return (<>
              <div className='grid grid-cols-6 overflow-y-auto'>
                
              <div className='col-start-1 col-span-4 flex px-[10px] text-sm'>{item.name}</div>      
              <div className='col-start-5 flex ml-[65px] justify-end text-[#d48c20] px-[10px]'>{formatPrice(10)}</div>
              <span onClick={() => dispatch(deletePromotion(item))} className='col-start-6 ml-8 w-[20px] flex items-center cursor-pointer rounded-md'><MdDeleteOutline size='17px' color='#ef4e4e' /></span>
              
              </div>
            </>
               )
          })} 
                 
          </div> */}
        <div className='border mx-[15px] border-x-0 border-b-0 border-t-black grid grid-cols-2 py-2'>
          <div className='font-bold'>PAYMENT</div>
          <input value={description} onChange={(even) => setdescription(even.target.value)} className="w-42 h-full border-none rounded-md outline-none text-sm bg-[#ffff] text-red font-semibold  pl-2" type="text" name="point" id="" placeholder="Note" />
        </div>
        <div className='px-[15px] grid grid-cols-2 grid-rows-2'>
          <div className='row-start-1 font-thin'>Total:</div>
          <div className='col-start-2 flex justify-end'>{formatPrice(total.toFixed())}</div>

          <div className='row-start-2 font-thin'>Discount:</div>
          <div className='col-start-2 flex justify-end'>{formatPrice(discount)}</div>
        </div>
        {CusPoint && CusPoint[0] && (
          <div className='px-[15px] grid grid-cols-2 pb-2' >
            <div className='font-thin'>Point: {formatPrice(CusPoint[0].totalPoint)}</div>
            <input value={point} onChange={(even) => setpoint(even.target.value)} className="w-42 h-full border-none rounded-md outline-none text-sm bg-[#f3f1ed] text-red font-semibold  pl-2" type="number" name="point" min="-9" max={CusPoint[0].totalPoint} id="inputPoint" placeholder="Use Point" />
            <div className='font-thin'>Special Discount:</div>
            <div className='flex items-center justify-center gap-2'>
              <input
                className={`w-42 h-full border-none rounded-md outline-none text-sm bg-[#f3f1ed] text-red font-semibold pl-2 ${isInvalid ? 'border-red-500' : ''
                  }`}
                type="number"
                name="pointRate"
                min="0"
                max="1"
                value={pointRate}
                onChange={handleRateChange}
                placeholder="Rate"
              />
              {/* {isInvalid && (
                // <span className="text-red-500 mt-1">
                //   Invalid
                // </span>
              )} */}
            </div>          
            </div>
        )}
        <div className='bg-[#87A89E] h-[50px] grid grid-cols-3 mt-2 '>

          <div className='mx-[15px] flex items-center font-bold text-lg'>{formatPrice(totalInvoice)}<span>.đ</span></div>
          {/* <div className='col-start-2 flex justify-end items-center mr-[15px]'>
            <a type='submit' href='/' className=" m-0 border border-[#ffffff] bg-[#3f6d67] text-white px-4 py-1 rounded-md transition duration-200 ease-in-out hover:bg-[#5fa39a7e] active:bg-[#ffff] focus:outline-none">Cancel</a>
          </div> */}
          <div className='col-start-3 flex gap-2 justify-end items-center mr-[15px]'>
            <span onClick={() => {
              dispatch(deleteCustomer());
              dispatch(deleteProductAll());
            }} className='col-start-6 ml-8 w-[20px] flex items-center cursor-pointer rounded-md bg-[#fef7f7] py-1 hover:bg-[#ffffff]'><MdDeleteOutline size='20px' color='#ef4e4e' /></span>

            <button type='submit' 
            onClick={() => {handSubmitOrder(); 
                  dispatch(deleteCustomer());
              dispatch(deleteProductAll());}} className=" m-0 border border-[#ffffff] bg-[#3f6d67] text-white px-4 py-1 rounded-md transition duration-200 ease-in-out hover:bg-[#5fa39a7e] active:bg-[#ffff] focus:outline-none">Invoice</button>

          </div>
        </div>
      </div>
    </div>
    <div className=''>
      <button className="border border-[#ffffff] bg-[#3f6d67e3] text-white rounded-md transition duration-200 ease-in-out hover:bg-[#5fa39a7e] active:bg-[#ffff] focus:outline-none">Temporary</button>
      <Popup trigger={ <button className="border border-[#ffffff] bg-[#3f6d67e3] text-white  rounded-md transition duration-200 ease-in-out hover:bg-[#5fa39a7e] active:bg-[#ffff] focus:outline-none">
        
          List Temporary
        
      </button>} position="right center">
      {close => (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-[#6f85ab61] overflow-y-auto'>
        <div className='bg-[#fff] my-[70px] mx-auto rounded-md w-[50%] shadow-[#b6b0b0] shadow-md'>
          <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-md font-semibold text-gray-900">
            List Temporary
            </h3>
            <a className='cursor-pointer text-black text-[24px] py-0' onClick={close}>&times;</a>
          </div>
          <form className="p-4 md:p-5">
          <div className=''>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Customer Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Phone Number
                    </th>
                    <th scope="col" class="px-6 py-3">
                      ID Invoice
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>

                    <th scope="col" class="px-6 py-3">
                      Special Discount
                    </th>

                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                      08191913101
                    </td>
                    <td class="px-6 py-4">
                      I_001
                    </td>
                    <td class="flex py-4 gap-1 items-center justify-center">
                      <button className='m-0 p-3 bg-green-500'><VscGitStashApply /></button>
                      <button className='m-0 p-3 bg-red-500'><MdDeleteOutline /></button>
                    </td>

                    <td class="px-14 py-4 ">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          onClick={handleCheckboxClick}
                          type="checkbox"
                          checked={isChecked}
                          className="sr-only peer"
                        />
                        <div
                          className={`peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-500 w-8 h-8 shadow-md ${isChecked
                            ? 'bg-emerald-600 after:content-["✔️"]'
                            : 'after:content-["✖️"]'
                            } after:rounded-full after:absolute after:outline-none after:h-6 after:w-6 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75`}
                        ></div>
                      </label>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </form>
          </div>
      </div>
        )}
                      </Popup>
    </div>

    {/* <div id="popupListTemporary" className={clsx(styles.overlay)}>
      <div className={clsx(styles.popup)}>
        <a className={clsx(styles.close)} href='#'>&times;</a>
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900">
            List Temporary
          </h3>
        </div>
      
        <form className="p-4 md:p-5">
          <div className=''>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Customer Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Phone Number
                    </th>
                    <th scope="col" class="px-6 py-3">
                      ID Invoice
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>

                    <th scope="col" class="px-6 py-3">
                      Special Discount
                    </th>

                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                      08191913101
                    </td>
                    <td class="px-6 py-4">
                      I_001
                    </td>
                    <td class="flex py-4 gap-1 items-center justify-center">
                      <button className='m-0 p-3 bg-green-500'><VscGitStashApply /></button>
                      <button className='m-0 p-3 bg-red-500'><MdDeleteOutline /></button>
                    </td>

                    <td class="px-14 py-4 ">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          onClick={handleCheckboxClick}
                          type="checkbox"
                          checked={isChecked}
                          className="sr-only peer"
                        />
                        <div
                          className={`peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-500 w-8 h-8 shadow-md ${isChecked
                            ? 'bg-emerald-600 after:content-["✔️"]'
                            : 'after:content-["✖️"]'
                            } after:rounded-full after:absolute after:outline-none after:h-6 after:w-6 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75`}
                        ></div>
                      </label>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </form>
      </div>
    </div> */}




  </>
  )
}

export default SidebarRight