import React, { Component } from 'react';
import UUIDV4 from '../utils/uuid';
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
        if (!this.state) {
            return ""
        }

        let divStyle = {
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative'
        };

        const textField = {
            width: 200,
        };

        const { categories } = this.props;
        const { navigateToPost } = this.state;

        if (navigateToPost) {
            return <Redirect to={`/post/${this.state.id}`} />
        }

        return <div style={divStyle}>
            <form onSubmit={this.handleSubmit}>
                <h2 align="left"> Post Form </h2>
                <div>
                    <TextField styles={textField} fullWidth type="text" label="Title" name="title" id="title" value={this.state.title} onChange={this.handleChange.bind(this)} />
                </div>
                <div>
                    <TextField styles={textField} fullWidth label="Author" type="text" name="author" id="author" value={this.state.author} onChange={this.handleChange.bind(this)} />
                </div>
                <div>
                    <TextField styles={textField} multiline fullWidth label="Body" id="body" name="body" onChange={this.handleChange.bind(this)} value={this.state.body} />
                </div>
                <div>
                    <FormControl fullWidth> 
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <Select label="category" name="category" id="category" value={this.state.category} onChange={this.handleChange.bind(this)}>
                            <MenuItem value="">
                                <em>Select One</em>
                            </MenuItem>
                            {categories && Object.keys(categories).map(key =>
                                <MenuItem key={key} value={categories[key].path}> {categories[key].name} </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <br />
                    <Button variant="contained" type="submit" color="primary">Send!</Button>
                </div>
            </form>
        </div>
    }
}

export default withRouter(PostFormComponent);