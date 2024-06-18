import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom' // giúp cho chạy đc các router con trong router cha
import { Header, SidebarLeft, SidebarRight } from '../../components'
// import Home from './Home'
import style from '../../style/scroll.module.css'

const Public = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const Authorization = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!Authorization || role !== 'seller') {
      navigate('/login');
    }
  }, [navigate]);
  return (


    <div className='w-full flex h-[100vh] '>
      <div className='w-[240px] overflow-y-scroll flex-none bg-[#5D5FEF] '>
        <SidebarLeft></SidebarLeft>
      </div>


<div className='flex-auto border '>
          {/* <div className='h-[70px] px-[30px] flex items-center mb-2'><Header/></div> */}
          <div className='h-[95%] flex justify-center'><Outlet/></div>
        </div>

      <div className='w-[400px] flex-none bg-[#56565821]'>
        <SidebarRight></SidebarRight>
      </div>
    </div>


  )
}

export default Public