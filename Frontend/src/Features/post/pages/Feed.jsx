import React, { useEffect } from 'react';
import "../styles/feed.scss"
import Post from '../components/Post';
import { usePost } from "../hook/usepost"
import Navbar from '../../../shared/Navbar';

const Feed = () => {
    const { feed, getHandleFeed, loading } = usePost()
    useEffect(() => {
        getHandleFeed()
    }, [])

    if (loading || !feed) {
        return (
            <main>
                <h1>feed is loading...</h1>
            </main>
        )
    }

    return (
        <div className='feed-wrapper'>
            <Navbar/>
            <main className='feed-page'>
                <div className="feed">
                    <div className="posts">
                        {feed.map(post=>{
                            return <Post key={post._id} post={post}/>
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Feed;