import React, { useEffect } from 'react';
import SildebarManager from '../../components/Manager/SildebarLeftManager';
import { RiAccountCircleLine } from "react-icons/ri";
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
import DiamondManager from './Product/DiamondManager';
export default function Manager() {
    const navigate = useNavigate();
    const outlet = useOutlet();
    useEffect(() => {
        const Authorization = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!Authorization || role !== 'manager') {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <div className='w-full flex h-[100vh]'>
                <div className='w-[240px] h-[100vh] flex-none bg-[#5D5FEF] overflow-y-auto '>
                    <SildebarManager />
                </div>
                <div className='flex-auto border overflow-y-auto '>
                    <div className='h-full '>
                        <div className='w-full flex justify-end space-x-2 px-[30px] py-[15px]'>
                            <RiAccountCircleLine className='text-2xl text-gray-600' />
                            <span className='text-gray-600 font-medium'>Manager</span>
                        </div>
                        <div className='p-[20px]'>
                            {outlet ? outlet : <DiamondManager />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
