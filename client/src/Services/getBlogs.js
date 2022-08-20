import axios from 'axios'

const getBlogs = async () => {
    try {
        const { data } = await axios.get("http://localhost:3001/getBlogs");
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

export { getBlogs }