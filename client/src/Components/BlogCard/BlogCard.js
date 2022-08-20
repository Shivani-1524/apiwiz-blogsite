import React, { useEffect, useState } from 'react'
import './blogcard.css'
import { useNavigate } from 'react-router-dom'

const BlogCard = (props) => {
    const navigate = useNavigate()
    const { title, subtitle, _id, banner, content } = props.item
    const [subtitleContent, setSubtitleContent] = useState('')
    const turncateSubtitle = (maxlen, str) => {
        return str.length > maxlen ? str.substring(0, maxlen - 3) + '...' : str
    }
    useEffect(() => {
        if (subtitle) {
            banner ? setSubtitleContent(turncateSubtitle(130, subtitle)) : setSubtitleContent(turncateSubtitle(250, subtitle))
        } else {
            banner ? setSubtitleContent(turncateSubtitle(130, content)) : setSubtitleContent(turncateSubtitle(250, content))
        }
    }, []);
    return (
        <div className='card-container'>
            <div onClick={() => navigate(`/blog/${_id}`)} className='blogcard-container white-bg'>
                {banner ? <img className='img-resp blog-banner' src={banner} alt={title} /> : null}
                <div className="blogcard-text">
                    <p className='blog-title'>{title}</p>
                    <p className='md-rg mg-t-5'>{subtitleContent}</p>
                </div>
            </div>
        </div>
    )
}

export { BlogCard }