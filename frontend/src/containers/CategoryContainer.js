import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostPreviewComponent from '../components/PostPreviewComponent';
import { Link } from 'react-router-dom';
import { flattenObjectArray } from '../utils/arrays';
import CategoryComponent from '../components/CategoryComponent';

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
        const posts = this.filterPosts(this.props);
        const category = flattenObjectArray(this.props.categories).filter(c => c.path === this.category).shift();

        return <div>
            {category && (
                <h2> {category.name} </h2>
            )}

            {posts && posts.map(post =>
                <PostPreviewComponent key={post.id} post={post} />
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