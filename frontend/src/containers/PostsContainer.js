import React, { Component } from 'react';
import PostPreviewComponent from '../components/PostPreviewComponent';
import CategoryComponent from '../components/CategoryComponent';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { flattenObjectArray } from '../utils/arrays';
import { handleDownVotePost, handleUpVotePost, handleDeletePost } from '../actions/posts';

class PostsContainer extends Component {

    downVotePost = (post) =>
        this.props.dispatch(handleDownVotePost(post))

    upVotePost = (post) =>
        this.props.dispatch(handleUpVotePost(post))

    deletePost = (post) =>
        this.props.dispatch(handleDeletePost(post))

    render() {
        return <div>
            <h1> POSTS </h1>
            {flattenObjectArray(this.props.posts).map(post =>
                <PostPreviewComponent
                    key={post.id}
                    post={post}
                    downVote={this.downVotePost}
                    upVote={this.upVotePost}
                    deletePost={this.deletePost} />
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