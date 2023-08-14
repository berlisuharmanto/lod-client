import React from 'react'

export default function Index() {
  return (
    <>
      <div className="h-screen">
        <div className="flex flex-col justify-center items-center h-full">
          <img src="./NotFound.jpg" alt="" className="w-1 opacity-0" />
          <div className="font-bold text-2xl text-center text-gray-700 p-3">
            404 Not Found
          </div>
          <div className="font-bold text-2xl text-center text-gray-700 p-3">
            Halaman yang anda cari tidak ditemukan
          </div>
          <a href="/" className="border-solid rounded bg-blue-500 hover:bg-blue-500 text-white font-bold p-3 mt-3">
            Kembali ke Home
          </a>
        </div>
      </div>
    </>
  )
}
