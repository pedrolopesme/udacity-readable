import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostPreviewComponent from '../components/PostPreviewComponent';
import { Link } from 'react-router-dom';
import { flattenObjectArray } from '../utils/arrays';
import CategoryComponent from '../components/CategoryComponent';
import { handleDownVotePost, handleUpVotePost, handleDeletePost } from '../actions/posts';
import { SortingFilterComponent, SORTING, SORTING_DIRECTION } from '../components/SortingFilterComponent';

class CategoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { sort: SORTING.DATE, direction: SORTING_DIRECTION.DESC }
    }

    setSorting = (order, direction) => {
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

    filterPosts = (category, props) => {
        const posts = props.posts;
        if (category && posts) {
            return Object.keys(posts)
                .map(key => posts[key])
                .filter(p => p.category === category);
        }
        return []
    }

    render = () => {
        const categoryPath = this.props.match.params.category;
        const posts = this.filterPosts(categoryPath, this.props);
        const category = flattenObjectArray(this.props.categories).filter(c => c.path === categoryPath).shift();

        return <div>
            {category && (
                <h2> {category.name} </h2>
            )}

            {posts.length > 0 && (
                <div>
                    <SortingFilterComponent
                        sort={this.state.sort}
                        direction={this.state.direction}
                        changeSorting={this.setSorting} />

                    {this.getPosts(posts).map(post =>
                        <PostPreviewComponent
                            key={post.id}
                            post={post}
                            downVote={this.downVotePost}
                            upVote={this.upVotePost}
                            deletePost={this.deletePost} />
                    )}
                </div>
            )}

            {posts.length === 0 && (
                <div> No posts yet :( </div>
            )}

            <h1> CATEGORIES </h1>
            {flattenObjectArray(this.props.categories).map(category =>
                <CategoryComponent key={category.path} category={category} />
            )}

            <Link to={`/posts/new`}> Add Post </Link>
        </div>
    }
}

function mapStateToProps({ Posts, Categories }) {
    return {
        posts: Posts,
        categories: Categories
    }
}

export default connect(mapStateToProps)(CategoryContainer);