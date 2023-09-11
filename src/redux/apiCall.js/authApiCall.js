import { authActions } from "../slice/authSlice";
import axios from 'axios'
import { toast } from "react-toastify";
//login user
export function loginUser(user){
    return async (dispatch,getState) =>{
        try {
             const {data} = await axios.post("https://blog-app-bu5e.onrender.com/api/auth/login",user)
             dispatch(authActions.login(data))
             localStorage.setItem('userInfo',JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    } 
}

//logout user
export function logoutUser(){
    return async (dispatch,getState) =>{
        dispatch(authActions.logout())
        localStorage.removeItem("userInfo")
    } 
}

//register user
export function registerUser(user){
    return async (dispatch,getState) =>{
        try {
             const {data} = await axios.post("https://blog-app-bu5e.onrender.com/api/auth/register",user)
             dispatch(authActions.register(data.message))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    } 
}


//verified account
export function verifyEmail(userId,token){
    return async (dispatch,getState) =>{
        try {
             await axios.get(`https://blog-app-bu5e.onrender.com/api/auth/${userId}/verify/${token}`)
             dispatch(authActions.setIsEmailVerified())
        } catch (error) {
            toast.error(error.response.data.message)
        }
    } 
}