import React, {useState, useEffect} from 'react'
import { getBlogs } from '../../Services/getBlogs';
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, BlogCard, Header } from '../../Components/index';
import './listingpage.css'


const ListingPage = () => {
  const navigate = useNavigate()
  const [blogList, setBlogList] = useState(null);
  

  useEffect(()=>{
    (async()=>{
      const {data, success, err} = await getBlogs();
      console.log("DATA", data)
      if(success){
        setBlogList(data)
      }else{
        navigate('/error')
        console.log(err)
      }
    })()
  },[])

  return (
    <>
    {blogList ? 
    <div className='page-layout'>
      <Header children={<PrimaryButton text="Write a Blog" onclick={()=>navigate('/create')} />} />
    
      <div className="divider"></div>
      <section className="blog-listing">
        {/* smallscr center-content */}
        {blogList.length > 0 ? 
        <div className="blog-list">
          { blogList.map((item) => {
            return (
              <BlogCard key={item._id} item={item}  />
            )
          })}
        </div> : 
        <p>No Blogs To Show Yet</p>}

      </section>
      
    </div> : 
    <p>Loading...</p>}
    
    </>
  )
}

export {ListingPage}