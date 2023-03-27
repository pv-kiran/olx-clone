import React, { useContext, useEffect, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';

import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../../store/User/UserProvider';
import { AuthContext } from '../../store/Auth/AuthProvider';




function Login() {

  const [user, setUser] = useState({email:'' , password:''});

  const {success , logginUser , userStateReset , loggedInUser} = useContext(UserContext);

  const { setAuthState } = useContext(AuthContext);

  // console.log(useContext(UserContext));
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const {name , value} = e.target ;
    setUser((user) => {
      return {
         ...user ,
         [name] : value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    logginUser(user);
  }

  useEffect(() => {
    console.log(user);
     if(success) {
       localStorage.setItem('user' , JSON.stringify(loggedInUser));
       userStateReset();
       setAuthState();
       navigate('/');
     }
  } , [success])


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={user.email}
            onChange = {(e) => {
              handleOnChange(e)
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={user.password}
            onChange = {(e) => {
              handleOnChange(e)
            }}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
