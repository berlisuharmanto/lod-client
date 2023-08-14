import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Index({user}) {
  const navigate = useNavigate();

  return (
    <>
        <div className="flex flex-col justify-center items-center ml-5 mt-2 mr-5">
            <div className="flex-row w-4/5 border-solid border-gray-700 border-2 rounded p-3">
                <div id="card" className="border-solid border-b-2 flex justify-between w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between flex-wrap">
                            <div className="flex">
                                Nama
                            </div>
                            <div className="flex justify-end">
                                {user.name}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between flex-wrap">
                            <div className="flex">
                                Email
                            </div>
                            <div className="flex justify-end">
                                {user.email}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between flex-wrap">
                            <div className="flex">
                                Alamat
                            </div>
                        </div>
                        <div className="flex flex-row justify-between flex-wrap text-gray-700">
                            <div className="flex break-all">
                                {user.address}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/5">
                <div id="card" className="">
                    <button onClick={(e) => {
                        navigate('/');
                        toast.success('Pesanan selesai');}} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5" type="button">
                        Kembali ke halaman utama
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
