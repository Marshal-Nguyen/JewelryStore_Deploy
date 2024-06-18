import React from 'react'
import logo from '../../assets/logo.png'
import { sidebarMenuManager } from '../../ultis/MenuOfManager/MenuManage'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './SildebarLeftMenu.css'
import { toast } from 'react-toastify'
import { BiLogOut } from "react-icons/bi";// logout

const SildebarManager = () => {
    const [isReportOpen, setIsReportOpen] = useState(null);
    const [isOpen, setIsOpen] = useState();
    const handleReportOpenToggle = (menuItem) => {
        setIsReportOpen((prevState) => {
            if (prevState === menuItem) {
                return null;
            } else {
                return menuItem;
            }
        });
    };
    const handleLogOut = () => {
        localStorage.clear();
        toast.success('Log out success!!!')
    }
    // className='mt-[20px] w-[60px] object-contain'
    return (
        <div className='container_sidebarleft flex flex-col'>
            <div className="w-full mb-6 h-[70px] py-[50px] flex flex-col gap-2 font-serif text-white text-[25px] justify-center items-center">
                <img className='mt-[20px] w-[60px] object-contain' src={logo} />
                <span>Jewelry Store</span>
            </div>
            <div className='flex flex-col'>
                {sidebarMenuManager.map(item => (
                    <div key={item.path} className='silderleft'>

                        <NavLink
                            to={item.path}
                            end={item.end}
                            value={item.text}
                            ClassName='active'
                            onClick={
                                item.text === 'Report'
                                    ? () => handleReportOpenToggle('report')
                                    : item.text === 'Manage'
                                        ? () => handleReportOpenToggle('manage')
                                        : item.text === 'Product'
                                            ? () => handleReportOpenToggle('productManager')
                                            : item.text === 'Promotion'
                                                ? () => handleReportOpenToggle('promotion')
                                                : () => handleReportOpenToggle('')
                            }
                        >
                            {item.iconAdmin}
                            <span className='ml-4'>{item.text}</span>
                            {isReportOpen === 'report' && item.text === 'Report'
                                ? item.iconAdmin3
                                : isReportOpen === 'manage' && item.text === 'Manage'
                                    ? item.iconAdmin3
                                    : isReportOpen === 'productManager' && item.text === 'Product'
                                        ? item.iconAdmin3
                                        : item.iconAdmin2}
                        </NavLink>

                        {isReportOpen === 'report' && item.text === 'Report' && item.subMenu.length > 0 && (
                            <div className='dropdown'>
                                {item.subMenu.map((subItem) => (
                                    <NavLink
                                        to={subItem.path}
                                        key={subItem.path}
                                        ClassName='active-1'
                                    >
                                        {subItem.iconAdmin}
                                        <span className='ml-4'>{subItem.text}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}

                        {isReportOpen === 'manage' && item.text === 'Manage' && item.subMenu.length > 0 && (
                            <div className='dropdown'>
                                {item.subMenu.map((subItem) => (
                                    <NavLink
                                        to={subItem.path}
                                        key={subItem.path}
                                        ClassName='active-1'
                                    >
                                        {subItem.iconAdmin}
                                        <span className='ml-4'>{subItem.text}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                        {isReportOpen === 'productManager' && item.text === 'Product' && item.subMenu.length > 0 && (
                            <div className='dropdown'>
                                {item.subMenu.map((subItem) => (
                                    <NavLink
                                        to={subItem.path}
                                        key={subItem.path}
                                        ClassName='active-1'
                                    >
                                        {subItem.iconAdmin}
                                        <span className='ml-4'>{subItem.text}</span>
                                    </NavLink>
                                ))}

                            </div>
                        )}
                        {isReportOpen === 'promotion' && item.text === 'Promotion' && item.subMenu.length > 0 && (
                            <div className='dropdown'>
                                {item.subMenu.map((subItem) => (
                                    <NavLink
                                        to={subItem.path}
                                        key={subItem.path}
                                        ClassName='active-1'
                                    >
                                        {subItem.iconAdmin}
                                        <span className='ml-4'>{subItem.text}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <NavLink to='/login' onClick={() => handleLogOut()}><BiLogOut size={24} color="white" /> Logout</NavLink>

            </div>
        </div >
    )
}
export default SildebarManager