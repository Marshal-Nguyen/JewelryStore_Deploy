import React, { useState, useEffect } from 'react'
import styles from '../../style/cardForList.module.css'
import clsx from 'clsx'
import { BsCash } from "react-icons/bs";

const Cs_Complete = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [display, setDisplay] = useState('0');

  function updateDisplay(value) {
    let currentValue = document.getElementById('display').value;

    // Check if the last character in the current value is an operator
    const lastCharIsOperator = ['+', '-', '*', '/', '.'].includes(currentValue.slice(-1));

    // Check if the current value is '0' and the entered value is an operator
    if (currentValue === '0') {
        if (['+', '-', '*', '/', '.'].includes(value)) {
            document.getElementById('display').value = '0' + value;
        }else{
            document.getElementById('display').value = value;
        }
    } else if (lastCharIsOperator && ['+', '-', '*', '/', '.'].includes(value)) {
        // If the last character is an operator and the entered value is an operator, do nothing
        return;
    } else {
        document.getElementById('display').value += value;
    }
}

function clearDisplay() {
    // Clear the input display and set it to '0'
    document.getElementById('display').value = '0';
}

function calculate() {
    try {
        // Get the current expression in the display
        let expression = document.getElementById('display').value;

        // Evaluate the expression using JavaScript eval function
        let result = eval(expression);

        // Update the display with the result
        document.getElementById('display').value = result;
    }
    catch(err) {
        document.getElementById('display').value = "Invalid Input";
    }
}

  return (<>
    <div className='flex justify-center '>
      <div className='shadow-md shadow-gray-600 pt-[10px] rounded-t-2xl w-[90%] h-[33em] bg-[#e9ddc26d] mt-[20px]'>
        <div className='flex justify-end px-[15px] text-black font-thin'>{currentTime.toLocaleString()}</div>
        <div className='flex justify-start px-[15px] text-black'>
          <p className='font-light'>Name:</p>
          <span className='w-full flex justify-center font-serif'>Truong Giang</span>
        </div>
        <div className='flex  px-[15px] text-black'>
          <p className='w-[260px] font-light '>ID Invoice:</p>
          <span className='w-full flex font-serif'>I_00001</span>
        </div>
        <div className='grid grid-cols-3 border-x-0 border-t-0 border mx-[10px] border-b-black pb-[2px]'>
          <div className='col-start-1 col-span-2 flex pl-[5px]'>Item</div>
          <div className='col-start-3 ml-6 flex justify-start'>Price</div>
        </div>
        <div id='screenSeller' className='grid-cols-3 h-[45%] overflow-y-auto'>

        </div>
        <div className='border border-x-0 border-b-0 mx-[15px] border-t-black py-2'>
          <div className='font-bold'>PAYMENT</div>
        </div>
        <div className='px-[15px] grid grid-cols-2 grid-rows-3 pb-2 '>
          <div className='row-start-1 font-thin'>Subtotal:</div>
          <div className='col-start-2 flex justify-end'>9.000.000</div>
          <div className='row-start-2 font-thin'>Tax:</div>
          <div className='col-start-2 flex justify-end'>1.000.000</div>
          <div className='row-start-3 font-thin'>Point:</div>
          <div className='col-start-2 flex justify-end text-red-500'>1.000.000</div>
        </div>
        <div className='bg-[#87A89E] h-[50px] grid grid-cols-2 '>
          <div className='mx-[15px] flex items-center font-bold text-lg'>9.000.000 <span>.đ</span></div>
          <div className='col-start-2 flex justify-end items-center mr-[15px]'>
            <a href='#popup1' className=" m-0 border border-[#ffffff] bg-[#3f6d67] text-white px-4 py-1 rounded-md transition duration-200 ease-in-out hover:bg-[#5fa39a7e] active:bg-[#ffff] focus:outline-none">Pay Bill</a>
          </div>
        </div>
      </div>

      <div id="popup1" className={clsx(styles.overlay)}>
        <div className={clsx(styles.popup)} style={{ width: '50%' }}>
          <a className={clsx(styles.close)} href='#'>&times;</a>
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900">
              Payment
            </h3>
          </div>
          {/* <!-- Modal body --> */}
          <form className="p-4 md:p-5">
            <div className="grid gap-4 grid-cols-2">
              <div className='row-start-1 col-start-1 h-[100px]'>
                <h5 className='font-bold '>Customer Info</h5>
                <div id='inforCustomer' className='text-[12px]'>
                  <p className='bg-gray-100 px-2 py-1 rounded-md mb-1'>Name: Nguyen Giang</p>
                  <p className='bg-gray-100 px-2 py-1 rounded-md'>ID Invoice: I_0001</p>
                </div>
              </div>
              <div className='row-start-1 col-start-2 h-[100px]'>
                <h5 className='font-bold'>Select a payment method</h5>
                <select class="mt-[10px] w-[100%] px-2 bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150">
                  <option><BsCash/> Cash</option>
                  <option>Visa</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className='col-start-1 rounded-md bg-gray-100 p-[10px] relative'>
                <h3 className='font-bold border border-x-0 border-t-0 border-black'>Transaction Details</h3>
                <div className='overflow-y-scroll'>
                  {/* Hiển thị thông tin */}
                  Screen
                </div>
                <div className='absolute bottom-5 w-[95%] border border-x-0 border-b-0 border-black grid grid-cols-2 grid-rows-3'>
                  <div className='row-start-1 col-start-1 font-thin'>Item</div>
                  <div className='row-start-1 col-start-2 flex justify-end mr-5'>$</div>
                  <div className='row-start-2 col-start-1 font-thin'>Tax(5%)</div>
                  <div className='row-start-2 col-start-2 flex justify-end mr-5'>$</div>
                  <div className='row-start-3 col-start-1 font-bold'>Total</div>
                  <div className='row-start-3 col-start-2 flex justify-end mr-5'>$</div>
                </div>
              </div>
              {/* <div className='col-start-2 rounded-md bg-gray-100 p-[10px] overflow-y-scroll'>
                

              </div> */}
              {/* <div class="h-screen flex flex-col justify-center items-center col-start-2 overflow-y-scroll "> */}
                <div class="w-[22rem] h-[500px] bg-[#f6f8f9] rounded-3xl p-4 shadow-2xl dark:bg-[#17181a]">
                  <div class="h-[100px]">
                    <textarea type="text" id="display" class="h-full w-full text-3xl font-bold bg-transparent border border-none outline-none resize-none dark:text-white" disabled>0</textarea>
                  </div>

                  <div class="flex space-x-2 mt-3">
                    <input type="button" onClick={() => clearDisplay()} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#2d191e] dark:text-red-500" value="C" />
                    <input type="button" onClick={() => updateDisplay('(')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="(" />
                    <input type="button" onClick={() => updateDisplay(')')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value=")" />
                    <input type="button" onClick={() => updateDisplay('/')} class="w-20 h-14 text-white bg-[#ff9500] hover:bg-[#e68600] shadow-md font-bold py-1 px-2 rounded-2xl" value="/" />
                  </div>

                  <div class="flex space-x-2 mt-3">
                    <input type="button" onClick={() => updateDisplay('7')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="7" />
                    <input type="button" onClick={() => updateDisplay('8')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="8" />
                    <input type="button" onClick={() => updateDisplay('9')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="9" />
                    <input type="button" onClick={() => updateDisplay('+')} class="w-20 h-14 text-white bg-[#ff9500] hover:bg-[#e68600] shadow-md font-bold py-1 px-2 rounded-2xl" value="+" />
                  </div>

                  <div class="flex space-x-2 mt-3">
                    <input type="button" onClick={() => updateDisplay('4')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="4" />
                    <input type="button" onClick={() => updateDisplay('5')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="5" />
                    <input type="button" onClick={() => updateDisplay('6')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="6" />
                    <input type="button" onClick={() => updateDisplay('*')} class="w-20 h-14 text-white bg-[#ff9500] hover:bg-[#e68600] shadow-md font-bold py-1 px-2 rounded-2xl" value="x" />
                  </div>

                  <div class="flex space-x-2 mt-3">
                    <input type="button" onClick={() => updateDisplay('3')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="3" />
                    <input type="button" onClick={() => updateDisplay('2')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="2" />
                    <input type="button" onClick={() => updateDisplay('1')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="1" />
                    <input type="button" onClick={() => updateDisplay('-')} class="w-20 h-14 text-white bg-[#ff9500] hover:bg-[#e68600] shadow-md font-bold py-1 px-2 rounded-2xl" value="-" />
                  </div>

                  <div class="flex space-x-2 mt-3">
                    <input type="button" onClick={() => updateDisplay('0')}class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="" />
                    <input type="button" onClick={() => updateDisplay('0')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="0" />
                    <input type="button" onClick={() => updateDisplay('.')} class="w-20 h-14 text-black bg-[#e9f0f4] hover:bg-gray-200 shadow-md font-bold py-1 px-2 rounded-2xl dark:bg-[#222427] dark:text-white" value="." />
                    <input type="button" onClick={() => calculate()} class="w-20 h-14 text-white bg-green-500 hover:bg-green-600 shadow-md font-bold py-1 px-2 rounded-2xl" value="=" />
                  </div>
                </div>
              {/* </div> */}
            </div>
            <div className=''>

            </div>
            <div className=''>

            </div>

            <button type="submit" className="text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4 text-center">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  </>)
}

export default Cs_Complete