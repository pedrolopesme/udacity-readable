import React, { Component } from 'react';
import UUIDV4 from '../utils/uuid';
import { Redirect } from 'react-router'

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
            navigateToPost: false
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let post = {}
        post.id = this.state.id;
        post.author = this.state.author;
        post.title = this.state.title;
        post.body = this.state.body;
        post.category = this.state.category;
        post.timestamp = this.post ? this.post.timestamp : new Date().getTime();

        if (this.validate(post)) {
            this.submitCallback(post)
                .then(() => this.setState({ navigateToPost: true }));
        } else {
            alert('Please, fill all the fields.');
        }
    }

    validate = (post) => {
        if (post.author !== '' &&
            post.author !== '' &&
            post.body !== '' &&
            post.category !== '') {
            return true;
        }
        return false;
    }

    render = () => {
        const { categories } = this.props;
        const { navigateToPost } = this.state;

        if (navigateToPost) {
            return <Redirect to={`/post/${this.state.id}`} />
        }

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
                    <select name="category" id="category" value={this.state.category} onChange={this.handleChange.bind(this)}>
                        <option> Select One </option>
                        {categories && Object.keys(categories).map(key =>
                            <option key={key} value={categories[key].path}> {categories[key].name} </option>
                        )}
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