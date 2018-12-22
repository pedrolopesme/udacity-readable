import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostPreviewComponent from '../components/PostPreviewComponent';
import { Link } from 'react-router-dom'

class CategoryContainer extends Component {
    constructor(props) {
        super(props);
        this.category = props.match.params.category;
    }

    filterPosts = (props) => {
        const posts = props.posts;
        if (this.category && posts) {
            return Object.keys(posts)
                .map(key => posts[key])
                .filter(p => p.category === this.category);
        }
        return []
    }

    render = () => {
        return <div>
            {this.filterPosts(this.props).map(post =>
                <PostPreviewComponent key={post.id} post={post} />
            )}
            <Link to={`/posts/new`}> Add Post </Link>
        </div>
    }
}

function mapStateToProps({ Posts }) {
    return {
        posts: Posts,
    }
}

export default connect(mapStateToProps)(CategoryContainer);