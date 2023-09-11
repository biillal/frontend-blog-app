import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from './slice/authSlice';
import { profileReducer } from './slice/profileSlice';
import { postReducer } from './slice/postSlice';
import { categoryReducer } from './slice/categorySlice';
import { commentReducer } from './slice/commentSlice';
export const store = configureStore({
    reducer:{
       auth:authReducer,
       profile:profileReducer,
       posts:postReducer,
       categories:categoryReducer,
       comments:commentReducer
    }
})