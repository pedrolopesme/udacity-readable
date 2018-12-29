import React, { Component, Fragment } from 'react'
import CommentFormComponent from './CommentFormComponent';
import Face from '@material-ui/icons/Face'
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Divider from '@material-ui/core/Divider';

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
                    <div className="comment">
                        <div className="left">
                            <Face className="faceIcon" />
                            <div className="body">
                                <span> {comment.author} : </span>
                                {comment.body}
                                <p>
                                    <button onClick={() => this.toggleMode()}> Edit </button>
                                    <button onClick={() => window.confirm("Do you really want to delete this?") ? deleteComment(comment, this.post) : undefined}> Delete </button>
                                </p>
                            </div>
                        </div>
                        <div className="right">
                            <p>
                                <FavoriteBorder className="icon" />  {comment.voteScore}
                            </p>
                            <button className="thumbs" onClick={() => upVote(comment)}> <ThumbUp /> </button>
                            <button className="thumbs" onClick={() => downVote(comment)}> <ThumbDown /> </button>
                        </div>
                        <span className="clearfix"></span>
                        <Divider light className="divider" />
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