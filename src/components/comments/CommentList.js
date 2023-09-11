import React, { useState } from 'react'
import swal from 'sweetalert';
import './commentList.css';
import UpdateComment from './UpdateComment';
import Moment from "react-moment";
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../redux/apiCall.js/commentApiCall';
function CommentList({comment }) {
    const { post } = useSelector((state) => state.posts)
    const { user } = useSelector((state) => state.auth)
    const [updateComment, setUpdateComment] = useState(false)
    const [updateForComment, setUpdateForComment] = useState(null)

    const updateCommentHandler = (comment)=>{
        setUpdateForComment(comment)
        setUpdateComment(true)
    } 
    const dispatch = useDispatch()
    // delete comment handler
    const deleteCommentHandler = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((isOk) => {
                if (isOk) {
                     dispatch(deleteComment(commentId))
                }
            });
    }
    return (
        <div className='comment-list'>
            <h4 className='comment-list-count'>{comment?.length} Comments</h4>
            <span className='span'></span>
            {comment?.map(comment => (
                <div key={comment._id} className="comment-item">
                    <div className='comment-item-info'>
                        <div className='comment-item-username'>
                            {comment.username}
                        </div>
                        <div className='comment-item-time'>
                            <Moment fromNow ago>
                                {comment.createdAt}
                            </Moment>{" "} ago
                        </div>
                    </div>
                    <p className='comment-item-text'>{comment?.text}</p>
                    {comment?.user === user?._id && (
                        <div className='comment-item-icon-wrapper'>
                            <i onClick={() => updateCommentHandler(comment)} className="bi bi-pencil-square"></i>
                            <i onClick={()=>deleteCommentHandler(comment?._id)} className="bi bi-trash-fill"></i>
                        </div>
                    )}

                </div>

            ))}
            {updateComment && <UpdateComment comment={comment} updateForComment={updateForComment} setUpdateComment={setUpdateComment} />}
        </div>


    )
}

export default CommentList
