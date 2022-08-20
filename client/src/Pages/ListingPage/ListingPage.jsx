import React, {useState, useEffect} from 'react'
import { getBlogs } from '../../Services/getBlogs';
import { Link, useNavigate } from 'react-router-dom'


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
    <div>
      <h1>ListingPage</h1>
        <Link to="/create">Add a Blog</Link>
        {blogList.length > 0 ? <div className="blog-list">
          { blogList.map((item) => {
            return (
              <Link key={item._id} to={`/blog/${item._id}`} className="blog-thumbnail">
                <h3 className="blog-title">{item.title}</h3>
              </Link>
            )
          }
          )}
        </div> : <p>No Blogs To Show Yet</p>}
    </div> : 
    <p>Loading...</p>}
    
    </>
  )
}

export {ListingPage}