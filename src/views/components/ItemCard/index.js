import React, { useState } from 'react'
import { useAuthHeader } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Index({items}) {
    const [menu, setMenu] = useState();

    const navigate = useNavigate();

    const authHeader = useAuthHeader();
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader()
                },
                body: JSON.stringify({
                    menuId: menu.id,
                    quantity: 1
                    }),
                })
                .then((response) => {
                    if (response.status === 201) {
                        return response.json();
                    } else {
                        return response.json().then((data) => {
                            throw new Error(data.message);
                        });
                    }
                })
                .then((data) => {
                    toast.success(`${menu.name} added to cart`);
                    navigate('/cart');
                }
            )
            .catch((error) => {
                toast.error(error.message);
            }
        );
    }

  return (
    <>
        {items.map((item, index) => (
            <form key={item.id} onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e); 
                    }} className='w-full border-solid border-2 mt-2'>
                <div className="flex flex-col m-2">
                    <div className="flex flex-row">
                        <div className="font-bold">{item.name}</div>
                    </div>
                    <div className="flex flex-row">
                        <div className="font-bold">Harga:</div>
                        <div className="ml-2">{item.price}</div>
                    </div>
                    <div className="flex flex-row">
                        <p>
                            {item.description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row justify-center m-2">
                    <button onClick={(e) => setMenu(item)} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Tambah ke keranjang
                    </button>
                </div>
            </form>
        ))}
    </>
  )
}
