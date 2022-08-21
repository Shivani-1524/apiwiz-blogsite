import axios from 'axios'

const deleteBlog = async (blogId) => {
    console.log(blogId, "DELETE POST")
    try {
        const { data } = await axios.post('http://localhost:3001/deleteBlog', { blogId });
        return {
            data,
            success: true,
            err: null
        }
    } catch (err) {
        return {
            data: null,
            success: false,
            err
        }
    }
}

export { deleteBlog }