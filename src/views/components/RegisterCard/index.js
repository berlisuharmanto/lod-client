import React, { useState } from 'react'
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Index() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const signIn = useSignIn();
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch (`${process.env.REACT_APP_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email : email,
                password : password
            })
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                return response.json().then((data) => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            signIn({
                token: data.token,
                expiresIn: data.token_expired,
                tokenType: 'Bearer',
                authState: data.data
            });
            toast.success('Login success');
            navigate('/');
        })
        .catch((error) => {
            setErrorMessage(error.message);
        });
    }

  return (
    <>
        <div className="flex items-center justify-center h-full">
            <div className="max-w-md w-full border-solid border-2 border-gray-500 rounded">
                <div className="flex justify-center font-bold text-2xl text-center text-gray-700 p-3">
                    Register
                </div>
                <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                    <form className="mb-4" onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="fullname">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Ex: Berli Suharmanto" onChange={handleNameChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Ex: berli.suharmanto88@gmail.com" onChange={handleEmailChange}/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3
                                leading-tight focus:outline-none focus:shadow-outline" id="password" type="password"
                                placeholder="******************" onChange={handlePasswordChange}/>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                                focus:outline-none focus:shadow-outline" type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                    {
                        errorMessage !== '' &&
                        <div className="text-center text-red-500 text-sm mt-2">
                            {errorMessage}
                        </div>
                    }
                    <div className="text-center">
                        <p className="text-gray-500 text-xs">
                            &copy;2023 Berli Suharmanto. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
