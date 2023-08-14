import React from 'react';
import Layout from './Layout';
import CheckoutCard from '../components/CheckoutCard';
import UserData from '../components/UserData';
import currencify from '../../utils/currency';
import NotFound from './Error/NotFound';
import { useLocation } from 'react-router-dom';

export default function Checkout() {
    const location = useLocation();
    const response = location.state?.data;

    if (!response) {
        return <NotFound />;
    }

  return (
    <>
        <Layout>
            <div className="h-full">
                <div className="flex justify-center items-center m-5">
                    <div className="w-4/5 border-solid border-gray-700 border-2 rounded p-3">
                        {
                            response.transactionList.length === 0 && <div className="font-bold">Keranjang masih kosong</div>
                        }
                        {
                            response.transactionList.map((item) => {
                                return (
                                    <CheckoutCard key={item.id} item={item}/>
                                )
                            })
                        }
                        <div className="flex flex-row flex-wrap justify-between mt-2">
                            <div className="flex flex-col w-4/5">
                                Total
                            </div>
                            <div className="flex flex-col">
                                Rp
                            </div>
                            <div className="flex flex-col">
                                {currencify(response.totalPrice).substring(2)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center flex-col">
                    <div className="w-full">
                        <UserData user={response.user}/>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )
}
