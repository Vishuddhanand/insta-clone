import React from 'react'
import "../style/nav.scss"
import { useNavigate } from 'react-router'


const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav  className='nav'>
        <p>Insta</p>
        <button className='button primary-button' onClick={()=>{
            navigate('/create-post')
        }}>Create Post</button>
    </nav>
  )
}

export default Navbar
