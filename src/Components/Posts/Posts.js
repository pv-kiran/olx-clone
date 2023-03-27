import React, { useContext, useEffect } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { PostContext } from './../../store/Post/PostProvider';
import { useNavigate } from 'react-router-dom';



function Posts() {

  

  const { loading  , posts ,getPosts } = useContext(PostContext);

  // console.log(posts);
  // console.log(loading);

  useEffect(() => {
    getPosts();
    console.log('Hello ...!!');
  } , [])

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/post/${id}`);
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {
          posts?.map((post) => {
            return(
              
               <div className="card" onClick={() => {
                handleClick(post._id)
               }}>
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={post.image} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {post.price}</p>
                    <p className="kilometer">{post.name}</p>
                    <p className="name">{post.category}</p>
                  </div>
               </div>
            )
          })
        }
        </div>
        
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Posts;
