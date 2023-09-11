import React from 'react'
import { Link } from 'react-router-dom'
import './notFound.css'
function NotFound() {
  return (
    <section className='not-Found '>
          <div className='not-Found-header'>
             <h1 className='num'>404</h1>
             <h3 className='not-Found-title'>Page Not Found</h3>
             <Link to='/' className="not-Found-Link">Go To Home Page</Link>
          </div>
      
    </section>
  )
}

export default NotFound
