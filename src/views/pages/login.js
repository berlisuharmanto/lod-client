import React, { useEffect } from 'react'
import LoginCard from '../components/LoginCard';
import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  
  useEffect(() => {
    if (isAuthenticated()) navigate('/');
  });
  return (
    <>
        <div className="h-screen">
          <LoginCard/>
        </div>
    </>
  )
}
