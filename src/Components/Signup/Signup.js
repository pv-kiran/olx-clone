import React, { useContext, useEffect, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../store/User/UserProvider';


export default function Signup() {

  const [user, setUser] = useState({fullName: '' , email: '' , password: ''});


  const {success , registerUser , userStateReset} = useContext(UserContext);
  const navigate = useNavigate();

  

  const handleOnChange = (e) => {
    const {name , value} = e.target;
    setUser((user) => {
        return {
          ...user ,
          [name] : value
        }
    })
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user);
    // console.log(user);
  }

  useEffect(() => {

    if(success) {
       navigate('/signin');
       userStateReset()
    }

  } , [success])



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="fullName"
            value={user.fullName}
            onChange = {(e) => handleOnChange(e) }
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={user.email}
            onChange = {(e) => handleOnChange(e) }
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
            onChange = {(e) => handleOnChange(e) }
          />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <Link to='/signin'>Login</Link>
      </div>
    </div>
  );
}
