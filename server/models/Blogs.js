const mongoose = require('mongoose')
const BlogsSchema = new mongoose.Schema({
    banner: {
        type: String,
        require: false,
    },
    title: {
        type: String,
        require: true,
    },
    subtitle: {
        type: String,
        require: false,
    },
    content: {
        type: String,
        require: true,
    }
})

const BlogsModel = mongoose.model("blogs", BlogsSchema)
module.exports = BlogsModel