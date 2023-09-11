import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../../../redux/slice/authSlice';
import swal from 'sweetalert';
import { registerUser } from '../../../redux/apiCall.js/authApiCall';

function Register() {
  const {registerMessage } = useSelector((state) => state.auth)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendFormHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("username is required")
    if (email.trim() === "") return toast.error("email is required")
    if (password.trim() === "") return toast.error("password is required")
    dispatch(registerUser({ username, email, password }))
  }

  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success",
    }).then(isOk=>{
      if(isOk){
        navigate('/login')
      }
    });
  }

  return (
    <section className="vh-100 bg-image"
      style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')", padding: "10px" }}>
      <div className="mask d-flex align-items-center gradient-custom-3" >
        <div className="container mt-5" >
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6" >
              <div className="card" style={{ borderRadius: "15px", height: "500px" }}>
                <div className="card-body p-4">
                  <h2 className="text-uppercase text-center mb-4">Create an account</h2>

                  <form onSubmit={sendFormHandler}>

                    <div className="form-outline mb-3">
                      <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={(e) => setUsername(e.target.value)} />
                      <label className="form-label" for="form3Example1cg">Your Name</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />
                      <label className="form-label" for="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input type="password" id="form3Example4cg" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                      <label className="form-label" for="form3Example4cg">Password</label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        style={{ width: "100%" }}
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center text-muted mt-4 mb-0">Have already an account? <Link to="/login"
                      className="fw-bold text-body"><u>Login here</u></Link></p>

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

export default Register
