import React, { useContext, useEffect } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import { AuthContext } from './../store/Auth/AuthProvider';





function Home(props) {

   const { authState } = useContext(AuthContext);
   console.log(authState);
   console.log(JSON.parse(localStorage.getItem('user')));

  

  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 
