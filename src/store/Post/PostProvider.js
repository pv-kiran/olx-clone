import React, { createContext, useReducer } from 'react'

import axios from 'axios';
axios.defaults.withCredentials = true;

export const PostContext = createContext();


const initialState = {
    loading: false ,
    success: false ,
    posts: []
}

const reducer = (state , action) => {
    switch(action.type) {
        case 'POST_REQUEST' : 
           return {
             ...state ,
             loading: true ,
             posts: []
           }
        case 'POST_REQUEST_SUCCESS' : 
           return {
             ...state ,
             loading: false ,
             success: true ,
             posts: []
           }
         case 'GET_POST_SUCCESS' : 
           return {
             ...state ,
             loading: false ,
             posts: action.payload
           }   
        case 'POST_REQUEST_FAILURE' : 
           return {
             ...state ,
             loading: false ,
             success: false
           } 

        case 'POST_STATE_RESET' : 
           return {
             ...state ,
             loading: false ,
             success: false ,
             posts: []
           } 
         
        default :
          return state;

    }
}


function PostProvider({children}) {

  const [state , dispatch] = useReducer(reducer , initialState);


  const addPost = async (post) => {
     dispatch({type:'POST_REQUEST'});
     try {
        await axios.post('http://localhost:4000/post' , post , {withCredentials: true})
        dispatch({type:'POST_REQUEST_SUCCESS'})
     } catch(err) {
        dispatch({type:'POST_REQUEST_FAILURE'})
     }
  }

  const getPosts = async () => {
     dispatch({type:'POST_REQUEST'});
     try {
        const response = await axios.get('http://localhost:4000/post')
        const posts = response.data ;
        dispatch({type:'GET_POST_SUCCESS' , payload: posts.posts})
     } catch(err) {
        dispatch({type:'POST_REQUEST_FAILURE'})
     }
  }

  const getPostById = async (id) => {
     dispatch({type:'POST_REQUEST'});
     try {
        const response = await axios.get(`http://localhost:4000/post/${id}`, {withCredentials: true})
        const posts = response.data ;
        dispatch({type:'GET_POST_SUCCESS' , payload: posts.posts})
     } catch(err) {
        dispatch({type:'POST_REQUEST_FAILURE'})
     }
  }

  const postStateReset = () => {
   dispatch({type: 'POST_STATE_RESET'})
  }


  return (
    <PostContext.Provider value={{ ...state , addPost , postStateReset , getPosts , getPostById }}>
        {
            children
        }
    </PostContext.Provider>
  )
}

export default PostProvider