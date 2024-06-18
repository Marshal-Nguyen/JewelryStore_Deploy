import React from 'react'
import { Outlet, useOutlet } from 'react-router-dom';
import DiamondManager from './DiamondManager';
export default function ProductManager() {
    const outlet = useOutlet();
    return (
        <div>
            {outlet ? outlet : <DiamondManager />}
        </div>
    )
}
