import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import avatar from '../../images/avatar.webp'
import './usersTable.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProfiles } from '../../redux/apiCall.js/profileApiCall';
import {deleteProfile} from '../../redux/apiCall.js/profileApiCall'
function UsersTable() {
    const { profiles } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const deleteAccountHandler = (userId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((isOk) => {
                if (isOk) {
                    dispatch(deleteProfile(userId))
                } else {
                    swal("Something went wrong!");
                }
            });
    }
    useEffect(() => {
        dispatch(fetchAllProfiles())
    }, [])
    return (
        <section className='table-container'>
            <AdminSidebar />
            <div className='admin-table-users'>
                <h2 className='admin-users-title'>Users</h2>
                <span className='border-users'></span>
                <Table striped bordered hover variant="dark" className='table-users'>
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Email</th>
                            <th >Action</th>
                        </tr>
                    </thead>


                    <tbody>
                        {
                            profiles?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={item?.profilePhoto.url} className="img-user-table" />
                                            <span className='name-users'>{item?.username}</span>
                                        </td>
                                        <td>
                                            <span className='email-users'>{item?.email}</span>
                                        </td>
                                        <td className='table-action-users'>
                                            <Link to={`/profile/${item?._id}`} className='link-view'>View Profile</Link>
                                            <button onClick={()=>deleteAccountHandler(item._id)} className='btn-delete'>Delete User</button>
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

export default UsersTable
