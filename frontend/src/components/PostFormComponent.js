import React, { Component } from 'react';
import UUIDV4 from '../utils/uuid';
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

class PostFormComponent extends Component {
    constructor(props) {
        super(props);
        this.submitCallback = props.submitCallback;
        this.state = {
            navigateToPost: false,
            ...this.buildPost(props)
        }
    }

    buildPost = (props) => {
        const id = props.match.params.id;
        let propsPost;

        if (id && props.posts) {
            propsPost = Object.keys(props.posts)
                .map(key => props.posts[key])
                .filter(p => p.id === id)
                .shift();
        }

        return {
            id: propsPost ? propsPost.id : UUIDV4(),
            title: propsPost ? propsPost.title : '',
            author: propsPost ? propsPost.author : '',
            body: propsPost ? propsPost.body : '',
            category: propsPost ? propsPost.category : ''
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ ...this.buildPost(nextProps) });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.validate()) {
            const timestamp = this.state.timestamp || new Date().getTime();
            this.submitCallback({
                ...this.state,
                timestamp: timestamp
            }).then(() => this.setState({ navigateToPost: true }));
        } else {
            alert('Please fill all the fields.');
        }
    }

    validate = () => {
        const post = this.state;
        if (post.title !== '' &&
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
                        <option value=""> Select One </option>
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

export default withRouter(PostFormComponent);