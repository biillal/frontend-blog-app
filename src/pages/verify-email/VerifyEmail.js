import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './verifyEmail.css';
import {useDispatch, useSelector} from "react-redux";
import { verifyEmail } from '../../redux/apiCall.js/authApiCall';
function VerifyEmail() {
   const {isEmailVerified} = useSelector((state)=>state.auth)
   const dispatch = useDispatch()
   const {userId,token} = useParams()
   useEffect(()=>{
     dispatch(verifyEmail(userId,token))
   },[])
  return (
    <section className='verify-email'>
       {
        isEmailVerified ? 
        <>
          <i className='bi bi-patch-check verify-email-icons'></i>
          <h1 className='verify-email-title'>
            your email has been verified successfully
          </h1>
          <Link to="/login" className='varify-email-link'>
            go To Login Page
          </Link>
        </>
        :
        <>
          <h1 className='verify-email-not-found'>
            Not Found
          </h1>
        </>
       }
    </section>
  )
}

export default VerifyEmail
