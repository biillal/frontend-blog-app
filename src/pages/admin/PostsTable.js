import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import avatar from '../../images/avatar.webp'
import './usersTable.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {useDispatch, useSelector} from "react-redux";
import { deletePost, getAllPosts, getAllPostsAdmin } from '../../redux/apiCall.js/postApiCall';
function PostsTable() {
    const {posts} = useSelector((state)=>state.posts);
    const dispatch = useDispatch()
    const deleteAccountHandler = (postId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deletePost(postId))
                } else {
                    swal("Something went wrong!");
                }
            });
    }
    useEffect(()=>{
        dispatch(getAllPostsAdmin())
    },[])
    return (
        <section className='table-container'>
            <AdminSidebar />
            <div className='admin-table-users'>
                <h2 className='admin-users-title'>Posts</h2>
                <span className='border-users'></span>
                <Table striped bordered hover variant="dark" className='table-users'>
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>image</th>
                            <th>User</th>
                            <th>Post Title</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((item,index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={item.image.url} style={{height:"30px"}} />
                                        </td>
                                        <td>
                                            <span className='name-users'>{item.user.username}</span>
                                        </td>
                                        <td>
                                            <span className='email-users'>{item.title}</span>
                                        </td>
                                        <td className='table-action-users'>
                                            <Link to={`/posts/details/${item._id}`} className='link-view'>View Post</Link>
                                            <button onClick={()=>deleteAccountHandler(item._id)} className='btn-delete'>Delete Post</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </Table>
            </div>
        </section >
    )
}

export default PostsTable
