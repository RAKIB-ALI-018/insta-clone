// Features/post/components/CreatePost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/createPost.scss";
import { usePost } from "../hook/usepost"

const CreatePost = () => {
    const navigate = useNavigate();
    const { handleCreatePost, loading } = usePost();
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    }

    async function submitHandler(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", file); 

        try {
            await handleCreatePost(formData);
            navigate("/feed");
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <main className='create-post-page'>
            <div className='create-post-box'>
                <div className='create-post-header'>
                    <button className='back-btn' onClick={() => navigate('/feed')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                    <h2>Create new post</h2>
                </div>

                <form onSubmit={submitHandler} className='create-post-form'>
                    <label className='file-upload' htmlFor="fileInput">
                        {preview ? (
                            <img src={preview} alt="preview" className='preview-img' />
                        ) : (
                            <div className='upload-placeholder'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                                <p>Click to select a photo</p>
                            </div>
                        )}
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            hidden
                        />
                    </label>

                    <textarea
                        className='caption-input'
                        placeholder='Write a caption...'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        rows={4}
                    />

                    <button type='submit' className='share-btn' disabled={!file || loading}>
                        {loading ? "Sharing..." : "Share"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default CreatePost;