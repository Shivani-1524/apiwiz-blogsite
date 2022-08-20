import axios from 'axios'

const postImage = async (Url, formData) => {
    try {
        const res = await axios.post(Url, formData)
        console.log(res)
        if (res.status === 200) {
            return {
                data: res.data,
                success: true,
            }
        }
        throw res
    } catch (err) {
        console.log(err)
        return {
            data: err,
            success: false,
        }
    }
}
export { postImage }