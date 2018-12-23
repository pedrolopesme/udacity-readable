import React, { Component } from 'react';
import PostPreviewComponent from '../components/PostPreviewComponent';
import CategoryComponent from '../components/CategoryComponent';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { flattenObjectArray } from '../utils/arrays';

class PostsContainer extends Component {
    render() {
        return <div>
            <h1> POSTS </h1>
            {flattenObjectArray(this.props.posts).map(post =>
                <PostPreviewComponent key={post.id} post={post} />
            )}

            <h1> CATEGORIES </h1>
            {flattenObjectArray(this.props.categories).map(category =>
                <CategoryComponent key={category.path} category={category} />
            )}
            <Link to={`/posts/new`}> Add Post </Link>
        </div>
    }
}

function mapStateToProps({ Categories, Posts }) {
    return {
        posts: Posts,
        categories: Categories
    }
}

export default connect(mapStateToProps)(PostsContainer);