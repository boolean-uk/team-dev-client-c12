import { useState, useEffect } from 'react'
import Post from '../post'

const Posts = ({posts}) => {
    

    return (
        <>
            {posts.map((post) => {
                const date = new Date(post.createdAt)
                
                return (
                    <Post
                        key={post.id}
                        name={`${post.author.firstName} ${post.author.lastName}`}
                        date={date.toLocaleString()}
                        content={post.content}
                        comments={post.comments}
                    />
                )
            })}
        </>
    )
}

export default Posts
