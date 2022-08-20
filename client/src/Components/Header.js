import React from 'react'
import { MdDarkMode, BsFillSunFill } from '../Assets/icons';
import { useNavigate } from 'react-router-dom'

const Header = ({ children }) => {
    const navigate = useNavigate()
    return (
        <header className='space-bw bloglist-header'>
            <p onClick={() => navigate('/')} className="md-title boldest pointer">Blogs</p>
            <div className="util-items">
                <MdDarkMode className='icon-md' />
                {children}
            </div>
        </header>
    )
}

export { Header }