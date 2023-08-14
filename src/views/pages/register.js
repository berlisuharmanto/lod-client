import React, { useEffect } from 'react'
import RegisterCard from '../components/RegisterCard';
import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) navigate('/');
  });

  return (
    <>
        <div className="h-screen">
            <RegisterCard/>
        </div>
    </>
  )
}
