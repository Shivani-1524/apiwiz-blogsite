import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBlog } from '../../Services/getBlog'
import ReactMarkdown from 'react-markdown'
import { Header } from '../../Components/Header'
import { BsFillEyeFill, AiFillHeart, BsFillBookmarkFill } from '../../Assets/icons'
import './singleblogpage.css'
import { PrimaryOutlineButton } from '../../Components/Buttons/PrimaryButtons'

const SingleBlogPage = () => {
    const { blogId } = useParams()
    const navigate = useNavigate()
    const [blogDetails, setBlogDetails] = useState(null)

    useEffect(() => {
        blogId ?
            (async () => {
                const { data, success, err } = await getBlog(blogId)
                console.log(data)
                if (success) {
                    console.log("Retrieved data", data)
                    setBlogDetails(data)
                } else {
                    console.log(err)
                    navigate('/error')
                }
            })() : navigate('/error')
    }, [navigate, blogId]);
    return (
        <div className='page-layout'>
            <Header />
            <div className="divider mg-b-lg"></div>
            <div className="space-bw mg-b-10">
                <PrimaryOutlineButton text="Delete Article"
                    onclick={() => {

                    }} />
                <div className="tools-row">
                    <p className='icon-txt'><BsFillEyeFill /> 230</p>
                    <p className='icon-txt'>< AiFillHeart /> 23</p>
                    <p className='icon-txt'><BsFillBookmarkFill /> 10</p>
                </div>
            </div>

            {blogDetails?.banner && <img className='cover-img' src={blogDetails.banner} alt={blogDetails.title} />}
            <div className='display-blog-layout'>
                {blogDetails ? <ReactMarkdown>{blogDetails.content}</ReactMarkdown> : <p>Loading...</p>}
            </div>
        </div>
    )
}

export { SingleBlogPage }