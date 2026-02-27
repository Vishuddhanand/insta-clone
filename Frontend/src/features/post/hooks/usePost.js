import { getFeed, createPost, likePost, unlikePost } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";
import { useEffect } from "react";

export const usePost = () => {
    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost = async (postImage, caption) => {
        setLoading(true)
        const data = await createPost(postImage, caption)
        setFeed([data.post, ...feed])
        setLoading(false)

    }

    const handleLikePost = async (post) => {


        const data = await likePost(post)
        await handleGetFeed()


    }


    const handleUnlikePost = async (post) => {

        const data = await unlikePost(post)
        await handleGetFeed()

    }

    useEffect(function () {
        handleGetFeed()

    }, [])

    return { loading, post, feed, handleGetFeed, handleCreatePost, handleLikePost, handleUnlikePost }

}