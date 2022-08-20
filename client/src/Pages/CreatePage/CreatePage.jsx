import React, {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import { postBlog } from '../../Services/postBlog';
import { postImage } from '../../Services/postImage';
import { BlogPreview, BlogInput, Header, PrimaryButton, PrimaryOutlineButton } from '../../Components/index'
import {FiImage, BsFillEyeFill, BsFillPencilFill} from '../../Assets/icons'
import './createpage.css'


const CreatePage = () => {
  const navigate = useNavigate()
  const initialBlogContent = {
    title: "",
    subtitle: "",
    banner: "",
    content:"",
  }
  const [blogContent, setBlogContent] = useState(initialBlogContent)
  const [previewMode, setPreviewMode] = useState(false)
  const [imageSelected, setImageSelected] = useState(null)

  
  const handleUploadResult = (success, data) => {
    if(success){
      console.log("blog posted",data)
      setBlogContent(initialBlogContent)
      navigate('/')
    }else{
      console.log(data)
      navigate('/error')
    }
  }

  const uploadBlog = async (blogData) => {
    if(imageSelected){
      const res = await uploadImage(imageSelected)
      const {data, success} = await postBlog({...blogData, banner: res.url})
      handleUploadResult(success, data)
    }else{
      const {data, success} = await postBlog(blogData)
      handleUploadResult(success, data)
    }
  }

  const uploadImage= async (file) => {
    console.log("chosen file",file)
    if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      const Url = "https://api.cloudinary.com/v1_1/ds9sho1ch/image/upload"
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "dbcscig2")
      const {data, success} = await postImage(Url, formData)
      if(success){
        return data
      }else{
        console.log(data)
        navigate('/error')
      }
    }else{
      console.log("invalid files")
    }
  }



  return (
    <div className='page-layout'>
      <Header children={<PrimaryButton text="Publish" onclick={()=>uploadBlog(blogContent)} />}  />
      <div className="divider mg-b-xl"></div>
    {
      imageSelected ? <PrimaryOutlineButton text="Remove Image" onclick={()=>{setImageSelected(null)}} /> : 
      <div>
        <label className='btn btn-primary-outline' htmlFor="file-upload">Upload Cover <FiImage className='icon-md' /> </label>
        <input className=' img-upload-input' id="file-upload" type="file" accept="image/*" hidden onChange={(e)=>{setImageSelected(e.target.files[0])}} />
      </div> 
    }
   

      {imageSelected ?  
          <img className='img-resp img-preview'
          src={URL.createObjectURL(new Blob([imageSelected], { type: "application/zip" }))} alt="banner preview" /> : null}

        <label className='sr-only' htmlFor="blog-title">Title</label>
        <input placeholder='Article title...' className='blog-title-input mg-t-10' id="blog-title" type="text" value={blogContent.title} 
        onChange={(e)=>{
            setBlogContent({...blogContent, title: e.target.value})  
        }} />

        <label className='sr-only' htmlFor="blog-subtitle">Subtitle</label>
        <input placeholder='Article subtitle...(optional)' className='blog-subtitle-input' id="blog-subtitle" type="text" value={blogContent.subtitle} 
        onChange={(e)=>{
            setBlogContent({...blogContent, subtitle: e.target.value})  
        }} />

        <div className="divider mg-t-10 mg-b-10"></div>
        <div className="tools-row">
            <BsFillEyeFill onClick={()=>{setPreviewMode(true)}} className='icon-md' />
            <BsFillPencilFill onClick={()=>{setPreviewMode(false)}} className='icon-md' />
          </div>
          {previewMode && <div className="divider mg-b-10 mg-t-10"></div>}
        {previewMode ?  <BlogPreview blogContent={blogContent} /> :
        <BlogInput setBlogContent={setBlogContent} blogContent={blogContent} />}
    </div>
  )
}

export {CreatePage}