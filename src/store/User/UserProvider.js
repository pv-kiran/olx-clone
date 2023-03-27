import React, {  useReducer,  createContext } from 'react'
import axios from 'axios'


export const UserContext = createContext();

const reducer = (state , action) => {
    switch(action.type) {
        case 'USER_REQUEST' :
            return {
                ...state ,
                loading: true 
            }
        case 'USER_REQUEST_SUCCESS' :
            return {
                ...state ,
                loading: false ,
                success: true
            }
        case 'USER_REQUEST_FAILURE' :
            return {
                ...state ,
                loading: false ,
                success: false
            }
        case 'USER_LOGIN_SUCCESS' : 
            return {
               ...state ,
               loading: false ,
               success: true ,
               loggedInUser: action.payload
            }
        case 'USER_STATE_RESET' :
            return {
                ...state,
                loading: false ,
                success: false
            }    
        default :
           return state
    } 
}

const initialState = {
    loading: false ,
    success: false ,
    loggedInUser: {}
}


const UserProvider = ({ children }) => {
    

  const [state, dispatch] = useReducer(reducer,initialState)

  const registerUser = async (user) => {
     dispatch({type:'USER_REQUEST'});
     try {
        await axios.post('http://localhost:4000/auth/register' , user)
        dispatch({type:'USER_REQUEST_SUCCESS'})
     } catch(err) {
        dispatch({type:'USER_REQUEST_FAILURE'})
     }
  }


  const logginUser = async (user) => {
     dispatch({type:'USER_REQUEST'});
     try {
        const response = await axios.post('http://localhost:4000/auth/login' , user)
        const loggedInUser = response.data; 
        dispatch({type:'USER_LOGIN_SUCCESS' , payload: loggedInUser })
     } catch(err) {
        dispatch({type:'USER_REQUEST_FAILURE'})
     }
  }

  const userStateReset = () => {
    dispatch({type: 'USER_STATE_RESET'});
  }
  
  return (
    <UserContext.Provider value={{ ...state , registerUser , logginUser , userStateReset }}>
      {children}
    </UserContext.Provider>
  )
}


export  default  UserProvider ; 
