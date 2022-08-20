import React from 'react'
import ReactMarkdown from 'react-markdown'
import './blogpreview.css'

const BlogPreview = ({ blogContent }) => {
    console.log("BLOG INPUT", blogContent);
    return (
        <div className='preview-container' style={{ backgroundColor: "red" }}>
            <ReactMarkdown>
                {blogContent.content}
            </ReactMarkdown>
        </div>
    )
}

export { BlogPreview }