import React, { useState, useRef } from 'react'
import "../style/createPost.scss"

const CreatePost = () => {
    const [caption, setCaption] = useState("")
    const postImageRef = useRef()


    function handleSubmit(e) {
        e.preventDefault()

        const file = postImageRef.current.files[0]
    }

    return (
        <main className="create-post-page">
            <h1>Create Post</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label className="select-postImage-label" htmlFor="postImage">Select Image</label>
                    <input ref={postImageRef} type="file" hidden name='postImage' id='postImage' />
                    <input
                        value={caption}
                        onInput={(e) => setCaption(e.target.value)}
                        type="text" name='caption' id='caption' placeholder='Enter caption' />
                    <button>Create Post</button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost
