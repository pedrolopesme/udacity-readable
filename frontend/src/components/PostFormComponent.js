import React, { Component } from 'react';
import UUIDV4 from '../utils/uuid';

class PostFormComponent extends Component {
    constructor(props) {
        super(props);
        this.submitCallback = props.submitCallback;
        this.post = props.post;

        this.state = {
            id: this.post ? this.post.id : UUIDV4(),
            title: this.post ? this.post.title : '',
            author: this.post ? this.post.author : '',
            body: this.post ? this.post.body : '',
            category: this.post ? this.post.category : '',
            parentId: this.post ? this.post.parentId : props.postId,
        }
    }

    clearForm = () => {
        this.setState({ author: '', body: '', title: '' });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let post = {}
        post.id = this.state.id;
        post.author = this.state.author;
        post.body = this.state.body;
        post.parentId = this.state.parentId;
        post.timestamp = this.post ? this.post.timestamp : new Date().getTime();
        this.submitCallback(post);
        this.clearForm();
    }

    render = () => {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label htmlFor="title">Title</label> <br />
                    <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange.bind(this)} />
                </p>
                <p>
                    <label htmlFor="author">Author</label> <br />
                    <input type="text" name="author" id="author" value={this.state.author} onChange={this.handleChange.bind(this)} />
                </p>
                <p>
                    <label htmlFor="body">Body</label> <br />
                    <textarea id="body" name="body" onChange={this.handleChange.bind(this)} value={this.state.body} />
                </p>
                <p>
                    <label htmlFor="category">Category</label> <br />
                    <select name="category" id="category">
                        <option> Select One </option>
                    </select>
                </p>
                <p>
                    <button>Send!</button>
                </p>
            </form>
        </div>
    }
}

export default PostFormComponent;