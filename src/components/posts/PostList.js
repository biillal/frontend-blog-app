import React from 'react'
import { Col } from 'react-bootstrap'
import PostItems from './PostItems'

function postList({posts}) {
    return (
        <div className='post-list'>
            {
                posts.map(item=><PostItems posts={item} key={item._id} />)
            }
        </div>
    )
}

export default postList
