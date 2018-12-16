import React, { Component } from 'react';
import UUIDV4 from '../utils/uuid';

class CommentFormComponent extends Component {
    constructor(props) {
        super(props);
        this.submitCallback = props.submitCallback;
        this.comment = props.comment;

        this.state = {
            id: this.comment ? this.comment.id : UUIDV4(),
            author: this.comment ? this.comment.author : '',
            body: this.comment ? this.comment.body : '',
            parentId: this.comment ? this.comment.parentId : props.postId,
        }
    }

    clearForm = () => {
        this.setState({ author: '', body: '' });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let comment = {}
        comment.id = this.state.id;
        comment.author = this.state.author;
        comment.body = this.state.body;
        comment.parentId = this.state.parentId;
        comment.timestamp = this.comment ? this.comment.timestamp : new Date().getTime();
        this.submitCallback(comment);
        this.clearForm();
    }

    render = () => {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label htmlFor="author">Author</label> <br />
                    <input type="text" name="author" id="author" value={this.state.author} onChange={this.handleChange.bind(this)} />
                </p>
                <p>
                    <label htmlFor="body">Body</label> <br />
                    <textarea id="body" name="body" onChange={this.handleChange.bind(this)} value={this.state.body} />
                </p>
                <p>
                    <button>Send!</button>
                </p>
            </form>
        </div>
    }
}

export default CommentFormComponent;