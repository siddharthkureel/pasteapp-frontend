import React from 'react'
import Post from "./Post";
const PostList = ({ posts }) => {
    if (posts === undefined) {
        return <div className="lds-dual-ring"></div>
    } else {

        return posts.map((post, i) =>((
                <Post key={i} postId={post._id} post={post.post} name={post.name} date={post.updatedAt} title={post.title} />
            )))
    }
}

export default PostList
