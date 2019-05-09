import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
        <Link className='navbar-brand' to='/'><h1>StudyRPG</h1></Link>
        <Link to='/setting'>Setting</Link>
    </div>
  </nav>
)

export default Header