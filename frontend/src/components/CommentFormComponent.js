import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import UUIDV4 from '../utils/uuid';

class CommentFormComponent extends Component {
    constructor(props) {
        super(props);
        this.submitCallback = props.submitCallback;
        this.comment = props.comment;
        this.post = props.post;
        this.state = {
            id: this.comment ? this.comment.id : UUIDV4(),
            author: this.comment ? this.comment.author : '',
            body: this.comment ? this.comment.body : '',
            parentId: this.comment ? this.comment.parentId : props.post.id,
        }
    }

    clearForm = () => {
        this.setState({ id: UUIDV4(), author: '', body: '' });
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
        this.submitCallback(comment, this.post);
        this.clearForm();
    }

    render = () => {
        const textField = {
            width: 200,
        };

        return  <form onSubmit={this.handleSubmit} className="commentForm">
                <div className="left">
                    <h4> Share your thoughts ! </h4>
                </div>
                <div className="right">
                <p>
                    <TextField className={textField} name="author" label="Author" id="author" value={this.state.author} onChange={this.handleChange.bind(this)} />
                </p>
                <p>
                    <TextField className={textField} multiline label="Comment" id="body" name="body" onChange={this.handleChange.bind(this)} value={this.state.body} />
                </p>
                <p align="right">
                    <Button variant="contained"  size="small" type="submit" >Send!</Button>
                </p>
                </div>
                <span className="clearfix"></span>
            </form>
    }
}

export default CommentFormComponent;