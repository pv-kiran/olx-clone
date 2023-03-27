import React, { useContext } from 'react';
import { AuthContext } from './../store/Auth/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';



function ProtectedRoutes() {
  
  const {authState} = useContext(AuthContext);
  console.log(authState);
  

  return (
    authState?.user ? <Outlet></Outlet> : <Navigate to= '/signin'></Navigate>
  )
}

export default ProtectedRoutes