import React from 'react'
import './bloginput.css'

const BlogInput = ({ setBlogContent, blogContent }) => {
    return (

        <textarea className='blog-content' value={blogContent.content}
            onChange={((e) => setBlogContent({ ...blogContent, content: e.target.value }))}>
        </textarea>
    )
}

export { BlogInput }