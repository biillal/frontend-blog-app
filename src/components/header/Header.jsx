import React, { useState } from 'react';
import './header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/apiCall.js/authApiCall';


function Header() {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [drapdawn, setDrapdawn] = useState(false)
    const logoutuser = () => {
        dispatch(logoutUser())
        navigate('/login')
    }
    return (
        <Navbar collapseOnSelect expand="lg" className='navs' sticky='top'>
            <Container>
                <Navbar.Brand href="/" className='logo'><span>BLOG</span> <i class="bi bi-pencil"></i></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className=" me-auto" style={{ display: "flex", justifyContent: "flex-end", width: "600px" }} >
                        <Link to='/' className='links' ><i class="bi bi-house"></i><span>Home</span></Link>
                        <Link to='/posts' className='links' ><i class="bi bi-stickies"></i><span>Posts</span></Link>
                        {
                            user &&
                            <Link to='/posts/create' className='links' ><i class="bi bi-journal-plus"></i><span>Create</span></Link>
                        }
                        {
                            user?.isAdmin &&
                            <Link to='/admin-dashboard' className='links' ><i class="bi bi-person-check"></i><span>Admin Dashboard</span></Link>
                        }
                    </Nav>
                    <Nav className='nvs2' style={{ display: "flex", justifyContent: "flex-start", width: "200px" }}>
                        {
                            user ?
                                <>
                                    <div className="header-right-user-info">
                                        <span onClick={() => setDrapdawn(prev => !prev)} className="header-right-user-username">{user?.username}</span>
                                        <img src={user.profilePhoto.url}
                                            alt="user photo"
                                            className='header-right-user-photo'
                                            onClick={() => setDrapdawn(prev => !prev)}
                                        />
                                        {
                                            drapdawn &&
                                            <div className="header-right-drapdawn">
                                                <Link to={`/profile/${user._id}`} className="header-drapdawn-item">
                                                    <i className="bi bi-file-person" ></i>
                                                    <span onClick={() => setDrapdawn(prev => !prev)}>Profile </span>
                                                </Link>
                                                <div onClick={logoutuser} className="header-drapdawn-item">
                                                    <i className='bi bi-box-arrow-in-left'></i>
                                                    <span onClick={() => setDrapdawn(prev => !prev)}>Logout</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </> : (
                                    <>
                                        <Link to='/login' className='btn'>
                                            <i className="bi bi-box-arrow-in-right"></i> <span>Login</span>
                                        </Link>
                                        <Link to='/register' className='btn'>
                                            <i className="bi bi-person"></i> <span>Register</span>
                                        </Link>
                                    </>
                                )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header









