import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import CheckoutCard from '../components/CheckoutCard'
import AddressForm from '../components/AddressForm'
import currencify from '../../utils/currency'
import { useAuthHeader, useSignOut } from 'react-auth-kit';
import { toast } from 'react-toastify';

export default function Checkout() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [items, setItems] = useState([]);
    const authHeader = useAuthHeader();
    const signOut = useSignOut();
  
    useEffect(() => {
        fetchItems();
    });
  
    const fetchItems = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader()
            },
        }).then(async (response) => {
          if (response.status === 200) {
              return response.json();
          } else {
              const data = await response.json();
              if (response.status === 401) {
                    signOut();
                }
              throw new Error(data.message);
          }
      })
        .then((data) => {
            setItems(data.data.data);
            let price = 0;
            for (const item of data.data.data) {
              price += item.totalPrice;
            }
            setTotalPrice(price);
        })
        .catch((error) => {
            toast.error(error.message);
        });
    }

  return (
    <>
        <Layout>
            <div className="h-full">
                <div className="flex justify-center items-center m-5">
                    <div className="w-4/5 border-solid border-gray-700 border-2 rounded p-3">
                        {
                            items.length === 0 && <div className="font-bold">Keranjang masih kosong</div>
                        }
                        {
                            items.map((item) => {
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
                                {totalPrice ? currencify(totalPrice).substring(2) : 0}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center m-5 h-3/5 flex-col">
                    <div className="w-4/5">
                        <AddressForm/>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )
}
