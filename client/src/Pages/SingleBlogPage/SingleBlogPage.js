import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBlog } from '../../Services/getBlog'

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

        <div>
            {blogDetails ? <h1>{blogDetails.content}</h1> : <p>SingleBlogPage</p>}</div>
    )
}

export { SingleBlogPage }