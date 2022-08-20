import axios from 'axios'

const getBlog = async (blogId) => {
    try {
        const { data } = await axios.get("http://localhost:3001/getBlog", {
            blogId
        });
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

export { getBlog }