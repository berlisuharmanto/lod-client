import React from 'react'
import { RequireAuth } from "react-auth-kit";
import { Route } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  return (
    <RequireAuth loginPath={'/login'}>
        {children}
    </RequireAuth>
  )
}
