import React from 'react'
import { NavLink } from 'react-router-dom'
import { hover } from '@testing-library/user-event/dist/hover'
import { useState } from 'react'
import logo_v2_seller from '../../assets/logo_v2_seller.png'
import { sidebarMenuCashier } from '../../ultis/MenuOfCashier/MenuCashier'
import { BiLogOut } from "react-icons/bi";// logout
import { toast } from 'react-toastify'

const notActive =
  'py-4 px-[25px] font-[300] font-sans italic flex gap-3 items-center text-white text-[14px]';
const activeStyle =
  'py-4 justify-center  w-[90%] ml-[10px] rounded-2xl font-thin font-serif italic flex gap-3 items-center text-white text-[14px] bg-[#90A0F4]';

const notActiveJew =
  'py-2  font-[300] font-sans italic flex gap-3 items-center text-white text-[14px]';
const activeStyleJew =
  'py-1 gap-4 w-[94%] rounded-xl font-thin font-serif italic flex  text-white text-[14px] bg-[#33333330] mt-[10px]';

const Cs_SidebarLeft = () => {
  const [isOrderSubmenuOpen, setIsOrderSubmenuOpen] = useState(false);

  const handleOrderSubmenuToggle = () => {
    setIsOrderSubmenuOpen(!isOrderSubmenuOpen);
  };

  const handleMenuItemClick = (item) => {
    if (item.text !== 'Order') {
      setIsOrderSubmenuOpen(false);
    }
    // Xử lý sự kiện nhấp vào menu item ở đây
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success('Log out success!!!')
  }

  return (
    <div className="container_sidebarleft flex flex-col">
      <div className="w-full mb-6 h-[70px] pt-[70px] pb-[80px] flex flex-col gap-2 font-serif text-white text-[25px] justify-center items-center">
        <img className="mt-[20px] w-[70px] object-contain" src={logo_v2_seller} alt="logo" />
        <span>Jewelry Store</span>
      </div>

      <div className="flex flex-col pb-16">
        {sidebarMenuCashier.map((item) => (
          <div key={item.path}>
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center p-4 text-white transition-colors ${isActive || (item.text === 'Order' && isOrderSubmenuOpen)
                  ? activeStyle
                  : notActive
                }`
              }
              onClick={item.text === 'Order' ? handleOrderSubmenuToggle : () => handleMenuItemClick(item)}>
              {item.icons}
              <span className="ml-4">{item.text}</span>
            </NavLink>
            {/* {item.text === 'Order' && isOrderSubmenuOpen && (
              <div className="pl-8">
                {item.subMenu.map((subItem) => (
                  <NavLink
                    to={subItem.path}
                    key={subItem.path}
                    className={({ isActive }) =>
                      `flex items-center p-4 text-black transition-colors ${isActive ? activeStyleJew : notActiveJew
                      }`
                    }>
                    {subItem.icons}
                    <span className="ml-4">{subItem.text}</span>
                  </NavLink>
                ))}
              </div>
            )} */}
          </div>
        ))}
        <NavLink to='/login' onClick={handleLogOut} className="mt-auto items-center text-white">
          <BiLogOut size={24} className="mr-2" /> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Cs_SidebarLeft;