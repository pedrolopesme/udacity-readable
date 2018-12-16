import React, { Component } from 'react';
import UUIDV4 from '../utils/uuid';

class AddCommentComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postId = props.postId;
        this.addComment = props.addComment;
    }

    clearForm = () => {
        this.commentForm.reset();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // TODO extract to an util lib
        const comment = Array.from(new FormData(event.target).entries()).reduce((field, pair) => ({
            ...field,
            [pair[0]]: pair[1],
        }), {});

        comment.id = UUIDV4();
        comment.timestamp = new Date().getTime();
        comment.parentId = this.postId;
        this.addComment(comment);
        this.clearForm();
    }

    render = () => {
        const addComment = this.props.addComment;
        return <div>
            <h4> Add Comment </h4>
            <form ref={(el) => this.commentForm = el} onSubmit={this.handleSubmit}>
                <p>
                    <label htmlFor="author">Author</label> <br />
                    <input type="text" name="author" id="author" />
                </p>
                <p>
                    <label htmlFor="body">Body</label> <br />
                    <textarea id="body" name="body"></textarea>
                </p>
                <p>
                    <button>Send!</button>
                </p>
            </form>
        </div>
    }
}

export default AddCommentComponent;