import React from 'react'
import { useUser } from "./Context/User.context.jsx";
import { Navigate, Outlet } from 'react-router-dom';


function ProtectedRoute() {
    const {loading, isAuthenticated} = useUser()

    if(loading) return <h1>Cargando...</h1>
    if (!loading && !isAuthenticated) return <Navigate to='/' replace />
  return (
    <Outlet/>
  )
}

export default ProtectedRoute