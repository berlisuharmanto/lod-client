import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import CartCard from '../components/CartCard'
import { useAuthHeader } from 'react-auth-kit';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([]);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

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
            <div className="h-screen m-3">
                <div className="flex justify-center font-bold text-2xl text-center text-gray-700 p-3">
                    Keranjang
                </div>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="flex-row w-full">
                        {
                            items.length === 0 && <div className="font-bold">Keranjang masih kosong</div>
                        }
                        {
                            items.map((item) => {
                                return (
                                    <CartCard key={item.id} item={item}/>
                                )
                            })
                        }
                    </div>
                    <span className="border-solid border-2 border-gray-500 w-full m-2"></span>
                    <div className="flex-row w-full">
                        <div className="font-bold">
                            Total Harga: Rp. {totalPrice}
                        </div>
                    </div>

                    <div className="flex flex-row w-full justify-end">
                        <button onClick={items.length === 0 ? (e) => toast.error('Tidak ada pesanan') : (e) => navigate('/checkout')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                            Checkout
                        </button>
                    </div>
                </div>
                
            </div>
        </Layout>
    </>
  )
}
