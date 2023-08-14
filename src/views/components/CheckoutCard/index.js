import React from 'react'
import currencify from '../../../utils/currency'
import { useLocation } from 'react-router-dom';

export default function Index({item}) {
  const location = useLocation();

  return (
    <>
        <div id="card" className="border-solid border-b-2 flex justify-between w-full">
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between flex-wrap">
                    <div className="flex">
                        Pesanan
                    </div>
                    <div className="flex justify-end">
                        {location.pathname === '/checkout' ? item.menu.name : item.name} ({item.quantity})
                    </div>
                </div>
                <div className="flex flex-row justify-between flex-wrap">
                    <div className="flex w-4/5">
                        Harga
                    </div>
                    <div className="flex">
                        Rp
                    </div>
                    <div className="flex justify-end">
                        {location.pathname === '/checkout' ? currencify(item.menu.price).substring(2) : currencify(item.price).substring(2)}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
