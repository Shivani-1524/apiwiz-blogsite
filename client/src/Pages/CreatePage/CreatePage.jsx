import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom'
import { BlogPreview, BlogInput } from '../../Components/index'
import './createpage.css'
import './createpage.css'

const CreatePage = () => {
  const navigate = useNavigate()
  const initialBlogContent = {
    title: "",
    subtitle: "",
    banner: "",
    content:"Welcome to Apiwiz blogs",
  }
  const [blogContent, setBlogContent] = useState(initialBlogContent)
  const postBlog = async (blogData) => {
    console.log("input blog", blogData)
    try{
      const {data} = await axios.post("http://localhost:3001/createBlog",blogData)
      console.log("blog posted",data)
      setBlogContent(initialBlogContent)
      navigate('/')
    }catch(err){
      console.log(err)
      navigate('/error')
    }
  }

  return (
    <>
        <h1>CREATE BLOGS PAGE</h1>
        <button onClick={()=>postBlog(blogContent)}>SAVE</button>
        <label htmlFor="blog-title">Title</label>
        <input id="blog-title" type="text" value={blogContent.title} 
        onChange={(e)=>{
            setBlogContent({...blogContent, title: e.target.value})  
        }} />
        <label htmlFor="blog-title">Subtitle</label>
        <input id="blog-title" type="text" value={blogContent.subtitle} 
        onChange={(e)=>{
            setBlogContent({...blogContent, subtitle: e.target.value})  
        }} />
        <BlogPreview blogContent={blogContent} />
        <BlogInput setBlogContent={setBlogContent} blogContent={blogContent} />
        
    </>
  )
}

export {CreatePage}