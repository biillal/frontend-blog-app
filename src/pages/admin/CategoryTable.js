import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import './usersTable.css';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCategory, fetchCategory } from '../../redux/apiCall.js/categoryApiCall';
function CategoryTable() {
    const {categories} = useSelector((state)=>state.categories)
    console.log(categories?._id)
    const dispatch = useDispatch()
    const deleteAccountHandler = (catId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((isOk) => {
                if (isOk) {
                    dispatch(deleteFromCategory(catId))
                } else {
                    swal("Something went wrong!");
                }
            });
    }
    useEffect(()=>{
        dispatch(fetchCategory())
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
                            <th>Category Title</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories?.map((item,index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span className='email-users'>{item?.title}</span>
                                        </td>
                                        <td >
                                            <button onClick={()=>deleteAccountHandler(item._id)} className='btn-delete'>Delete Category</button>
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

export default CategoryTable
