import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import AdminSidebar from './AdminSidebar';
import { deleteComment, fetchAllComments } from '../../redux/apiCall.js/commentApiCall';

function CommentTable() {
    const {comments} = useSelector((state)=>state.comments)
    const dispatch = useDispatch()
    const deleteCommentHandler = (comId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((isOk) => {
                if (isOk) {
                    dispatch(deleteComment(comId))
                } else {
                    swal("Something went wrong!");
                }
            });
    }
    useEffect(()=>{
        dispatch(fetchAllComments())
    },[])
    return (
        <section className='table-container'>
            <AdminSidebar />
            <div className='admin-table-users'>
                <h2 className='admin-users-title'>Categories</h2>
                <span className='border-users'></span>
                <Table striped bordered hover variant="dark" className='table-users'>
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>user</th>
                            <th>comment</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comments?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span className='email-users'>{item?.user?.username}</span>
                                        </td>
                                        <td>
                                            <span className='email-users'>{item?.text}</span>
                                        </td>
                                        <td >
                                            <button onClick={() => deleteCommentHandler(item._id)} className='btn-delete'>Delete Category</button>
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

export default CommentTable
