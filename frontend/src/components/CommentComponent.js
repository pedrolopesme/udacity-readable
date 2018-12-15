import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class CommentComponent extends Component {
    render = () => {
        const comment = this.props.comment;
        const downVote = this.props.downVote;
        const upVote = this.props.upVote;
        return <div>
            <p> {comment.body} </p>
            <div>
                <small>
                    author: {comment.author} |
                    score: {comment.voteScore}
                </small>
                <p>
                    <button onClick={() => upVote(comment)}> Up Vote </button>
                    <button onClick={() => downVote(comment)}> Down Vote </button>
                </p>
                <p>
                    <Link to={`/`}> Edit </Link> |
                    <Link to={`/`}> Delete </Link>
                </p>
            </div>
        </div>
    }
}

export default CommentComponent;