import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './View.css';
import { PostContext } from './../../store/Post/PostProvider';



function View() {
  const {id} = useParams();
  const {getPostById , posts} = useContext(PostContext);
  console.log(id);
  console.log(posts);

  useEffect(() => {
    getPostById(id);
  } , [])

  return (
    <React.Fragment>
       {
         posts.map((post) => {
           return (
            <div className="viewParentDiv">
                <div className="imageShowDiv">
                        <img
                          src={post.image}
                          alt=""
                        />
                </div>
                <div className="rightSection">
                        <div className="productDetails">
                          <p>&#x20B9; {post.price} </p>
                          <p>{post.category}</p>
                          {/* <p>Two Wheeler</p> */}
                          <span>Tue May 04 2021</span>
                        </div>
                        <div className="contactDetails">
                          <p>Seller details</p>
                          <p>{post.name}</p>
                          <p>1234567890</p>
                        </div>
                </div>
            </div>
           )
         })
       }
    </React.Fragment>
  );
}
export default View;
