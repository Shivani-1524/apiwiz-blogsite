const express = require("express")
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require("./config/db");
const BlogsModel = require("./models/Blogs")

dotenv.config()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


connectDB()

app.get('/getBlogs', (req, res) => {
    BlogsModel.find({}, (err, fetchedBlogs) => {
        if (err) {
            res.json({
                message: err.message,
                stack: process.env.NODE_ENV === "production" ? null : err.stack,
            });
        } else {
            res.json(fetchedBlogs);
        }
    })
})

app.get('/getBlog/:id', (req, res) => {
    const { blogId } = req.body;
    console.log("BLOG ID", blogId)
    BlogsModel.findById(req.params.id, (err, fetchedBlog) => {
        if (err) {
            res.json({
                message: err.message,
                stack: process.env.NODE_ENV === "production" ? null : err.stack,
            });
        } else {
            res.json(fetchedBlog);
        }
    })
})

app.post('/createBlog', async (req, res) => {
    try {
        const blog = req.body;
        const newBlog = new BlogsModel(blog);
        await newBlog.save();
        res.json(blog)
    } catch (err) {
        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === "production" ? null : err.stack,
        });
    }
})

app.post('/deleteBlog', async (req, res) => {
    const { blogId } = req.body;
    BlogsModel.findByIdAndRemove(blogId, (err, deletedRecord) => {
        if (err) {
            res.json({
                message: err.message,
                stack: process.env.NODE_ENV === "production" ? null : err.stack,
            });
        } else {
            res.json(deletedRecord);
        }
    })
})


app.get('/', (req, res) => {
    res.json({
        "title": "dawdawd",
        "lol": "dwdaddddddfffffffffffffff"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})