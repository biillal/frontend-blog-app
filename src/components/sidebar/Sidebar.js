import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
function Sidebar({categories}) {
    return (
        <div className='post-sidebar' >
            <h5 className='title-category'>CATEGORIES</h5>
            {
                categories?.map((category)=>{
                    return(
                        <Link 
                            key={category._id} 
                            className='cat'
                            to={`posts/categories/${category.title}`}
                        > 
                           {category.title}
                        </Link>
                    )
                }
                )
            }
        </div>
    )
}

export default Sidebar
