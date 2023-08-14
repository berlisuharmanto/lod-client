import React, { useState } from 'react'
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Index() {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    }

  const handleCheckout = (e) => {
    e.preventDefault();
    
    fetch (`${process.env.REACT_APP_API_URL}/cart/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
        body: JSON.stringify({
            address : address
        })
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            return response.json().then((data) => {
                throw new Error(data.message);
            });
        }
    })
    .then(data => {
        navigate('/checkout-success', { state: { data: data.data, menu: data.data.transactionList } });
    })
    .catch((error) => {
        toast.error(error.message);
    });
  }

  return (
    <>
        <form className="flex flex-col w-full" onSubmit={(e) => handleCheckout(e)}>
            <div className="flex flex-row pb-2">
                <label htmlFor="address">Alamat pengiriman</label>
            </div>
            <div className="flex flex-row w-full">
                <textarea name="address" id="address" cols="30" className='w-full border-solid border-2 border-gray-700 rounded p-2' rows="5" defaultValue={address ? address : authUser().address} onChange={handleAddressChange}></textarea>
            </div>
            <button onClick={(e) => handleCheckout(e)} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5" type="submit">
                Checkout
            </button>
        </form>
    </>
  )
}
