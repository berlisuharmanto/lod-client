import React from 'react'
import Navbar from '../../components/Navbar';

export default function index({children}) {
  return (
    <>
        <Navbar/>
        <div className="h-screen">
          {children}
        </div>
    </>
  )
}
