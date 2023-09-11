import { postActions } from "../slice/postSlice";
import { commentActions } from "../slice/commentSlice";
import axios from 'axios';
import { toast } from "react-toastify";
export function createComments(newComment){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.post(`https://blog-app-bu5e.onrender.com/api/comments`,newComment,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            console.log(data)
            dispatch(postActions.addCommentToPost(data.comment))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function updateComment(commentId,comment){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.put(`https://blog-app-bu5e.onrender.com/api/comments/${commentId}`,comment,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            console.log(data)
            dispatch(postActions.updateCommentpost(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function deleteComment(commentId){
    return async(dispatch,getState)=>{
        try {

            console.log('dazdbazoui')
            await axios.delete(`https://blog-app-bu5e.onrender.com/api/comments/${commentId}`, {
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(postActions.deleteCommentPost(commentId))
            dispatch(commentActions.deleteComment(commentId))

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


export function fetchAllComments(){
    return async(dispatch,getState)=>{
        try {

            console.log('dazdbazoui')
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/comments`, {
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(commentActions.setComments(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}