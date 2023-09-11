import { categoryActions } from "../slice/categorySlice";
import axios from 'axios';
import { toast } from "react-toastify";
export function fetchCategory(){
    return async(dispatch)=>{
        try {
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/categories`);
            dispatch(categoryActions.setCategory(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function createCategory(newCategory){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.post(`https://blog-app-bu5e.onrender.com/api/categories`,newCategory,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(categoryActions.addCategoty(data))
            toast.success("category created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function deleteFromCategory(categotyId){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.delete(`https://blog-app-bu5e.onrender.com/api/categories/${categotyId}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(categoryActions.addCategoty(data.categotyId))
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}