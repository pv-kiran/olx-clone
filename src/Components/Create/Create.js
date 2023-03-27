import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { PostContext } from '../../store/Post/PostProvider';
import { useNavigate } from 'react-router-dom';



const Create = () => {

  const { loading , success , addPost , postStateReset} = useContext(PostContext);

  const [post, setPost] = useState({name:'' , category: '' , price: '' , file: ''});

  const [file, setFile] = useState('');

  const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        // setFile(URL.createObjectURL(e.target.files[0]));
        setPost((post) => {
          return {
            ...post ,
            file: e.target.files[0]
          }
        })
        setFile(URL.createObjectURL(e.target.files[0]));
  }

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name , value} = e.target;
    setPost((prevPost) => {
      return {
        ...prevPost ,
        [name] : value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name' , post.name);
    formData.append('category' , post.category)
    formData.append('price' , post.price);
    formData.append('image' , post.file )
    console.log(formData);
    // console.log(post);
    addPost(formData);
  }

  useEffect(() => {

    if(success) {
       navigate('/');
       postStateReset()
    }

  } , [success])
  


  return (
    <Fragment>
      <Header />
        <div className="centerDiv">
          <form encType="multipart/form-data" onSubmit={(e) => {
            handleSubmit(e)
          }}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="name"
              value={post.name}
              onChange={(e) => {
                 handleChange(e)
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={post.category}
              onChange={(e) => {
                 handleChange(e)
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="price" 
              value={post.price}
              onChange={(e) => {
                 handleChange(e)
              }}
            />
            <br />
            <br />
            <input type="file" onChange={(e) => {
                handleFileChange(e)
            }}/>
            <br />
            <img className='post_img' alt="Posts" width="200px" height="200px" 
             src={file}>

            </img>
            <button className="uploadBtn" type='submit'>
              {
                loading ? 'Loading ..... !!! ' : 'upload and Submit'
              }
            </button>
          </form>
          <br />
          
          {/* <form>
            <br />
            <input type="file" />
            <br />
            <button className="uploadBtn" type='submit'>upload and Submit</button>
          </form> */}
        </div>
     
    </Fragment>
  );
};

export default Create;
