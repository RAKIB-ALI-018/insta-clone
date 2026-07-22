import React from 'react';
import { usePost } from "../hook/usepost";

const Post = ({ post }) => {
    const { handleLikePost } = usePost();

    if (!post.user) return null;

    return (
        <div className="post">
            <div className="upper">
                <div className="img">
                    <img src={post.user.profile_image} alt="" />
                </div>
                <p>{post.user.username}</p>
            </div>
            <div className="middle">
                <img src={post.imgUrl} alt="" />
            </div>
            <div className="lower">
                <div className="icon">
                    <div className="leftIcon">
                        <button onClick={() => handleLikePost(post._id)}>
                            <svg
                                className={post.isLiked ? "like" : ""}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2 8.5C2 5.46243 4.46243 3 7.5 3C9.36016 3 11.0046 3.92345 12 5.33692C12.9954 3.92345 14.6398 3 16.5 3C19.5376 3 22 5.46243 22 8.5C22 16 11.9999 21.4852 11.9999 21.4852C11.9999 21.4852 2 16 2 8.5Z"></path>
                            </svg>
                        </button>
                        <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3Z"></path></svg></button>
                        <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V3L23 11L13 19V14Z"></path></svg></button>
                    </div>
                    <div className="rightIcon">
                        <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"></path></svg></button>
                    </div>
                </div>
                <p>{post.caption}</p>
            </div>
        </div>
    );
}

export default Post;