import React from 'react'
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <div className='bg-light p-5 mt-4 rounded-3'>
        <h1>Welcome to the simple POS for small buiness</h1>
        <p>Labore tempor ipsum duis ea exercitation laboris laborum mollit qui exercitation.</p>
        <p>If you have an issue, call 443-444-xxxx anytimes</p>
        <Link to='/pos' className='btn btn-primary'>Click here to sell products</Link>
    </div>
  )
}

export default HomePage