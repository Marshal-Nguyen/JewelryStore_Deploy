import React, { useEffect } from 'react';
import Sildebar from '../../components/Admin/SildebarLeftMenu';
import { RiAccountCircleLine } from "react-icons/ri";
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../../components';

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        const Authorization = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!Authorization || role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <div className='w-full flex h-[100vh]'>
                <div className='w-[240px] h-[100vh] flex-none bg-[#5D5FEF] overflow-y-auto '>
                    <Sildebar />
                </div>
                <div className='flex-auto border overflow-y-auto '>
                    <div className='h-full '>
                        <div className='w-full flex justify-end space-x-2 px-[30px] py-[15px]'>
                            <RiAccountCircleLine className='text-2xl text-gray-600' />
                            <span className='text-gray-600 font-medium'>Admin</span>
                        </div>
                        <div className='p-[20px]'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
