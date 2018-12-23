import React, { Component } from 'react';
import PostPreviewComponent from '../components/PostPreviewComponent';
import CategoryComponent from '../components/CategoryComponent';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { flattenObjectArray } from '../utils/arrays';
import { handleDownVotePost, handleUpVotePost, handleDeletePost } from '../actions/posts';

const SORTING = {
    DATE: "timestamp", SCORE: "voteScore", COMMENTS: "commentCount"
}

const SORTING_DIRECTION = {
    ASC: "ASC", DESC: "DESC"
}

class PostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { sort: SORTING.DATE, direction: SORTING_DIRECTION.DESC }
    }

    sortPosts = (order) => {
        let direction = SORTING_DIRECTION.DESC;
        if (this.state.sort === order) {
            direction = this.state.direction === SORTING_DIRECTION.ASC ? SORTING_DIRECTION.DESC : SORTING_DIRECTION.ASC;
        }
        this.setState({ sort: order, direction: direction })
    }

    getPosts = (posts) => {
        return flattenObjectArray(posts).sort((a, b) => {
            const field = this.state.sort;

            if (this.state.direction === SORTING_DIRECTION.ASC) {
                return a[field] - b[field];
            }

            return b[field] - a[field];
        })
    }

    downVotePost = (post) =>
        this.props.dispatch(handleDownVotePost(post))

    upVotePost = (post) =>
        this.props.dispatch(handleUpVotePost(post))

    deletePost = (post) =>
        this.props.dispatch(handleDeletePost(post))

    render() {
        return <div>
            <div>
                Sort by :
                <button onClick={() => this.sortPosts(SORTING.DATE)}>
                    date {this.state.sort === SORTING.DATE && (<span> (*) </span>)}
                </button> |
                <button onClick={() => this.sortPosts(SORTING.SCORE)}>
                    score {this.state.sort === SORTING.SCORE && (<span> (*) </span>)}
                </button> |
                <button onClick={() => this.sortPosts(SORTING.COMMENTS)}>
                    comments {this.state.sort === SORTING.COMMENTS && (<span> (*) </span>)}
                </button>
            </div>

            <h1> POSTS </h1>
            {this.getPosts(this.props.posts).map(post =>
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