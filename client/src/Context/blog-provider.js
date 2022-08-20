import { createContext, useContext, useState } from 'react'

const BlogContext = createContext()

const BlogProvider = ({ children }) => {
    const [blogList, setBlogList] = useState(null);
    return (
        <BlogContext.Provider value={{ blogList, setBlogList }}>
            {children}
        </BlogContext.Provider>
    )
}

const useBlogs = () => useContext(BlogContext)

export { useBlogs, BlogProvider }