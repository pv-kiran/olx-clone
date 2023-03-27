import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../store/Auth/AuthProvider';



function PublicRoutes() {

  const {authState} = useContext(AuthContext);
  console.log(authState);

  return (
    !authState?.user ? <Outlet></Outlet> : <Navigate to= '/'></Navigate>
  )
}

export default PublicRoutes