import { useContext } from 'react'
import { getFeed, createPost, likePost } from "../services/post.api.js"
import { postContext } from "../post.context.jsx"

export const usePost = () => {

    const context = useContext(postContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const getHandleFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost = async (formData) => {
        setLoading(true)
        try {
            const data = await createPost(formData)
            setFeed(prevFeed => [data.post, ...(prevFeed || [])])
            return data
        } finally {
            setLoading(false)
        }
    }

    const handleLikePost = async (postId) => {
        
        setFeed(prevFeed =>
            prevFeed.map(p =>
                p._id === postId ? { ...p, isLiked: !p.isLiked } : p
            )
        )

        try {
            await likePost(postId)
        } catch (err) {
            console.error(err)
            
            setFeed(prevFeed =>
                prevFeed.map(p =>
                    p._id === postId ? { ...p, isLiked: !p.isLiked } : p
                )
            )
        }
    }

    return { loading, feed, post, getHandleFeed, handleCreatePost, handleLikePost }
}