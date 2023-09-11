import { profileActions } from "../slice/profileSlice";
import { authActions } from "../slice/authSlice";
import axios from 'axios';
import { toast } from "react-toastify";

// get profile
export function getProfile(userId){
    return async(dispatch)=>{
        try {
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/users/profile/${userId}`)
            dispatch(profileActions.setProfile(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
// upload photo profile
export function uploadPhoto(newPhot){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.post(`https://blog-app-bu5e.onrender.com/api/users/profile/profile-photo-upload`,newPhot,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-type" : "multipart/form-data"
                }
            })
            
            dispatch(profileActions.setProfilePhoto(data.profilePhoto))
            dispatch(authActions.setPhoto(data.profilePhoto))
            toast.success(data.message)

            // modified photo in localstorage user
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.profilePhoto = data?.profilePhoto
            localStorage.setItem("userInfo",JSON.stringify(user))
        } catch (error) {
            console.log(getState().auth.user.token)
            toast.error(error.response.data.message)
        }
    }
}
// update profile
export function updateProfile(userId,profile){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.put(`https://blog-app-bu5e.onrender.com/api/users/profile/${userId}`,profile,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            
            dispatch(profileActions.updateProfile(data))
            dispatch(authActions.setUsername(data.username))
            toast.success(data.message)

            // modified username in localstorage user
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.username = data?.username
            localStorage.setItem("userInfo",JSON.stringify(user))
        } catch (error) {
            console.log(getState().auth.user.token)
            toast.error(error.response.data.message)
        }
    }
}
// update profile
export function deleteProfile(userId){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.delete(`https://blog-app-bu5e.onrender.com/api/users/profile/${userId}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            
            dispatch(profileActions.setDeleteProfile())
            toast.success(data?.message)
            setTimeout(()=>dispatch(profileActions.clearDeleteProfile()),2000)
        } catch (error) {
            console.log(getState().auth.user.token)
            toast.error(error.response.data.message)
        }
    }
}
// count profile
export function countProfile(){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/users/count`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileActions.setUsersCount(data?.count))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
// get all profile
export function fetchAllProfiles(){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/users/profile`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileActions.setProfiles(data?.users))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}