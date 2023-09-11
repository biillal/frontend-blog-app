import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginUser } from '../../../redux/apiCall.js/authApiCall';
import { login } from '../../../redux/slice/authSlice';

function Login() {
  const {error} = useSelector((state)=>state.auth)
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sendFormHandler = (e) =>{
    e.preventDefault();
    if(email.trim() === "") return toast.error("email is required")
    if(password.trim() === "") return toast.error("password is required")
    dispatch(loginUser({email,password}))

    
  }
  return (
    <section class="vh-100 bg-image"
      style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')", padding: "10px" }}>
      <div class="mask d-flex align-items-center gradient-custom-3" style={{ marginTop: "20px" }} >
        <div class="container mt-5" >
          <div class="row d-flex justify-content-center align-items-center ">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6" >
              <div class="card" style={{ borderRadius: "15px", height: "470px" }}>
                <div class="card-body p-4">
                  <h2 class="text-uppercase text-center mb-4">Login</h2>

                  <form onSubmit={sendFormHandler}>
                    <div class="form-outline mb-3">
                      <input type="email" id="form3Example3cg" class="form-control form-control-lg" onChange={(e)=>setEmail(e.target.value)} />
                      <label class="form-label" for="form3Example3cg">Your Email</label>
                    </div>

                    <div class="form-outline mb-3">
                      <input type="password" id="form3Example4cg" class="form-control form-control-lg" onChange={(e)=>setPassword(e.target.value)}  />
                      <label class="form-label" for="form3Example4cg">Password</label>
                    </div>


                    <div class="form-check d-flex justify-content-center mb-3">
                      <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg"  />
                      <label class="form-check-label" for="form2Example3g">
                        I agree password <Link to="#!" class="text-body"><u>Forget Password</u></Link>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button type="submit"
                        style={{width:"100%"}}
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                    </div>

                    <p class="text-center text-muted mt-4 mb-0">We d'ont Have an account? <Link to="/register"
                      class="fw-bold text-body"><u>Create an account</u></Link></p>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
