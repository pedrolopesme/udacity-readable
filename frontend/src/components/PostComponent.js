import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class PostComponent extends Component {
    render = () => {
        const post = this.props.post;
        return <Fragment>
            {post && (
                <div>
                    <h3> {post.title} </h3>
                    <div>
                        {post.body}
                    </div>
                    <div>
                        <p> <small> By: {post.author} </small> </p>
                        <p> <small> # Comments: {post.commentCount} </small> </p>
                        <p> <small> Score: {post.voteScore} </small> </p>
                        <p>
                            <button> Up Vote </button> 
                            <button> Down Vote </button>
                        </p>
                        <p>
                            <Link to={`/`}> Edit </Link> |
                            <Link to={`/`}> Delete </Link>
                        </p>
                    </div>
                </div>
            )}
        </Fragment>
    }
}

export default PostComponent;