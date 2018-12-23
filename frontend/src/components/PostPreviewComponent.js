import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostPreviewComponent extends Component {
    constructor(props) {
        super(props);
        this.deletePost = props.deletePost;
    }
    
    handleDeletePost = (e, post) => {
        window.confirm("Do you really want to delete this?") ? this.deletePost(post) : e.preventDefault();
    }

    render = () => {
        const post = this.props.post;
        const downVote = this.props.downVote;
        const upVote = this.props.upVote;
        return (<div>
            <Link to={`/post/${post.id}`}>
                <h3> {post.title} </h3>
            </Link>
            <div>
                <small> {post.author} </small> |
                    <small> # Comments: {post.commentCount} </small> |
                    <small> Score: {post.voteScore} </small>
                <p>
                    <button onClick={() => upVote(post)}> Up Vote </button>
                    <button onClick={() => downVote(post)}> Down Vote </button>
                </p>
                <p>
                    <Link to={`/posts/${post.id}/edit`}> Edit </Link> |
                    <Link to={`/`} onClick={(e) => this.handleDeletePost(e, post)}> Delete </Link>
                </p>
            </div>

        </div>)
    }
}

export default PostPreviewComponent;