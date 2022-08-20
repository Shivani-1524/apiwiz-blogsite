import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './bloginput.css'
import { FiImage, AiOutlineBold, AiOutlineItalic, BsLink45Deg } from '../../Assets/icons'
import { useAutosizeTextArea } from '../../Services/useAutosizeTextArea'
import { postImage } from '../../Services/postImage'

const BlogInput = ({ setBlogContent, blogContent }) => {
    const navigate = useNavigate()
    const textAreaRef = useRef(null);
    useAutosizeTextArea(textAreaRef.current, blogContent.content);
    const [textAreaEvent, setTextAreaEvent] = useState(blogContent.content.length);
    let clickedTool = ''
    const onToolClick = () => {
        if (clickedTool !== '') {
            switch (clickedTool) {
                case 'bold':
                    setTimeout(() => {
                        textAreaRef.current.setSelectionRange(textAreaEvent + 2, textAreaEvent + 2)
                    })
                    break;
                case 'italic':
                    setTimeout(() => {
                        textAreaRef.current.setSelectionRange(textAreaEvent + 1, textAreaEvent + 1)
                    })
                    break;
                default:
                    break;
            }

        }
    }

    const imageMarkdown = async (file) => {
        console.log("chosen file", file)
        if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            const Url = "https://api.cloudinary.com/v1_1/ds9sho1ch/image/upload"
            const formData = new FormData()
            formData.append("file", file)
            formData.append("upload_preset", "dbcscig2")
            const { data, success } = await postImage(Url, formData)
            if (success) {
                setBlogContent({ ...blogContent, content: blogContent.content + `\n ![Image](${data.url}) \n` })
            } else {
                console.log(data)
                navigate('/error')
            }
        } else {
            console.log("invalid files")
        }
    }


    return (
        <>

            <div className='tools-row txt-area'>
                <BsLink45Deg className='icon-tool' onClick={() => {
                    setBlogContent({ ...blogContent, content: blogContent.content.concat('[Link](http://example.com)') })
                    textAreaRef.current.focus()
                }} />
                <AiOutlineBold onClick={() => {
                    clickedTool = 'bold'
                    setBlogContent({ ...blogContent, content: blogContent.content.concat('****') })
                    textAreaRef.current.focus()
                }}
                    className='icon-tool' />
                <AiOutlineItalic onClick={() => {
                    clickedTool = 'italic'
                    setBlogContent({ ...blogContent, content: blogContent.content.concat('**') })
                    textAreaRef.current.focus()
                }} className='icon-tool' />
                <div>
                    <label htmlFor="mkdwn-img-upload"><FiImage className='icon-tool' /></label>
                    <input className='img-upload-input' id="mkdwn-img-upload" type="file" accept="image/*" hidden
                        onChange={(e) => imageMarkdown(e.target.files[0])} />
                </div>
            </div>
            <div className="divider mg-b-10 mg-t-10"></div>
            <textarea placeholder='Tell your story...' ref={textAreaRef} className='blog-content' value={blogContent.content}
                onFocus={onToolClick}
                onChange={((e) => {
                    setTextAreaEvent(e.target.selectionStart);
                    setBlogContent({ ...blogContent, content: e.target.value })
                })}>
            </textarea>
        </>
    )
}

export { BlogInput }