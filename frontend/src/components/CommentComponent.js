import React, { Component, Fragment } from 'react'
import CommentFormComponent from './CommentFormComponent';

const MODE = { READ: 'read', EDIT: 'edit' };

class CommentComponent extends Component {
    constructor(props) {
        super(props);
        this.post = props.post;
        this.state = { 'mode': MODE.READ };
    }

    toggleMode = () => {
        this.setState((state) => {
            return { 'mode': state.mode === MODE.READ ? MODE.EDIT : MODE.READ }
        });
    }

    render = () => {
        const comment = this.props.comment;
        const submitCallback = this.props.submitCallback;
        const downVote = this.props.downVote;
        const upVote = this.props.upVote;
        const deleteComment = this.props.deleteComment;
        return <Fragment>
            {
                this.state.mode === MODE.READ && (
                    <div>
                        <p> {comment.body} </p>
                        <div>
                            <small>
                                author: {comment.author} | score: {comment.voteScore}
                            </small>
                            <p>
                                <button onClick={() => upVote(comment)}> Up Vote </button>
                                <button onClick={() => downVote(comment)}> Down Vote </button>
                            </p>
                            <p>
                                <button onClick={() => this.toggleMode()}> Edit </button>
                                <button onClick={() => window.confirm("Do you really want to delete this?") ? deleteComment(comment, this.post) : undefined}> Delete </button>
                            </p>
                        </div>
                    </div>
                )
            }

            {
                this.state.mode === MODE.EDIT && (
                    <div>
                        <CommentFormComponent comment={comment} submitCallback={(comment) => submitCallback(comment) && this.toggleMode()} />
                        <button onClick={() => this.toggleMode()}> Cancel </button>
                    </div>
                )
            }
        </Fragment>
    }
}

export default CommentComponent;