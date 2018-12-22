import React, { Component } from 'react';
import UUIDV4 from '../utils/uuid';
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

class PostFormComponent extends Component {
    constructor(props) {
        super(props);
        this.submitCallback = props.submitCallback;
        this.state = this.buildState();
    }

    buildState = () => {
        const id = this.props.match.params.id ? this.props.match.params.id : UUIDV4();
        return {
            id,
            navigateToPost: false,
            ...this.buildPost(this.props)
        }
    }

    buildPost = (props) => {
        let propsPost;
        if (this.state && props.posts) {
            propsPost = Object.keys(props.posts)
                .map(key => props.posts[key])
                .filter(p => p.id === this.state.id)
                .shift();
        }

        return {
            title: propsPost ? propsPost.title : '',
            author: propsPost ? propsPost.author : '',
            body: propsPost ? propsPost.body : '',
            category: propsPost ? propsPost.category : ''
        };
    }

    componentDidMount = () => {
        this.setState(this.buildState());
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
        if(!this.state) {
            return ""
        }


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