import React from 'react'
import { useAuthHeader } from 'react-auth-kit';
import { toast } from 'react-toastify';

export default function Index({item}) {
    const [quantity, setQuantity] = React.useState(item.quantity)
    const [totalPrice, setTotalPrice] = React.useState(item.totalPrice)
    const authHeader = useAuthHeader();

    const increment = () => {
        setQuantity(quantity + 1)
        setTotalPrice(item.menu.price * (quantity + 1))

        fetch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader()
                },
                body: JSON.stringify({
                    quantity: quantity + 1
                    }),
                })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return response.json().then((data) => {
                            throw new Error(data.message);
                        });
                    }
                }
            )
            .catch((error) => {
                toast.error(error.message);
            }
        );
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
            setTotalPrice(item.menu.price * (quantity - 1))

            fetch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader()
                    },
                    body: JSON.stringify({
                        quantity: quantity - 1
                        }),
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            return response.json().then((data) => {
                                throw new Error(data.message);
                            });
                        }
                    }
                )
                .catch((error) => {
                    toast.error(error.message);
                }
            );
        }
    }

    const remove = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader()
                },
                body: JSON.stringify({
                    quantity: quantity - 1
                    }),
                })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return response.json().then((data) => {
                            throw new Error(data.message);
                        });
                    }
                }
            )
            .catch((error) => {
                toast.error(error.message);
            }
        );
    }

    return (
        <>
            {
                <div key={item.id} className='w- full border-solid border-2 flex justify-between items-center mt-2'>
                    <div className="flex flex-col m-2 w-full">
                        <div className="flex flex-row">
                            <div className="font-bold">{item.menu.name}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="font-bold">Harga Total:</div>
                            <div className="ml-2">{ totalPrice ? totalPrice : item.totalPrice}</div>
                        </div>
                        <div className="flex flex-row justify-between flex-wrap w-full">
                            <div className="flex flex-col font-bold w-1/4 justify-center">Jumlah:</div>
                            <div className="flex justify-center items-center w-3/4">
                                <div className="flex">
                                    <button onClick={(e) => decrement()} className="bg-gray-700 border-solid border-gray-700 border-2 p-2 text-white rounded">
                                        Kurang
                                    </button>
                                    <div className="flex border-solid border-gray-700 border-2 p-2 ml-2 mr-2 rounded w-10 justify-center">
                                        <h1> { quantity ? quantity : item.quantity} </h1>
                                    </div>
                                    <button onClick={(e) => increment()} className="bg-gray-700 border-solid border-gray-700 border-2 p-2 text-white rounded">
                                        Tambah
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col align-items-center m-2">
                        <button onClick={(e) => remove()} className="font-bold text-red-500 m-2">
                            Hapus
                        </button>
                    </div>
                </div>
            }
        </>
    )
}
