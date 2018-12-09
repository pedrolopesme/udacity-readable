import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class CommentComponent extends Component {
    render = () => {
        const comment = this.props.comment;
        return <div>
            <p> {comment.body} </p>
            <div> 
                <small> 
                    author: {comment.author} | 
                    score: {comment.voteScore}
                </small> 
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
    }
}

export default CommentComponent;