import React, { Component } from 'react'

class PostComponent extends Component {
    render = () => {
        const post = this.props.post;
        return <div>
            {post && (
                <h3> {post.title} </h3>
            )}
        </div>
    }
}

export default PostComponent;