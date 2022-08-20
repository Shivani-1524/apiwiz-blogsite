import axios from 'axios'

const postBlog = async (blogData) => {
    try {
        const res = await axios.post("http://localhost:3001/createBlog", blogData)
        return {
            data: res.data,
            success: true
        }

    } catch (err) {
        return {
            data: err,
            success: false
        }
    }
}

export { postBlog }