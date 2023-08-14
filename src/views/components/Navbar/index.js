import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

export default function Index() {
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
    navigate('/login');
  }

  return (
    <>
        <nav className="flex items-center justify-between flex-wrap bg-gray-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <a href='/' className="font-semibold text-xl tracking-tight">LOD Agency</a>
            </div>
            <div className="flex justify-end">
                <div className="block p-2">
                    <a href="/cart" className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                        Keranjang
                    </a>
                </div>
                <div className="block p-2">
                    <button onClick={(e) => handleLogout(e)} className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    </>
  )
}
