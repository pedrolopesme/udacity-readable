import React, { Component } from 'react';
import PostPreviewComponent from '../components/PostPreviewComponent';
import CategoryComponent from '../components/CategoryComponent';
import { connect } from 'react-redux'

class PostsContainer extends Component {
    render () {
        return <div>
            <h1> POSTS </h1>
            {this.props.posts && Object.keys(this.props.posts).map( key =>
                <PostPreviewComponent key={key} post={this.props.posts[key]}/> 
            )}

            <h1> CATEGORIES </h1>
            {this.props.categories && Object.keys(this.props.categories).map( key =>
                <CategoryComponent key={key} category={this.props.categories[key]}/> 
            )}
        </div>
    }
}

function mapStateToProps({Categories, Posts}){
    return {
        posts: Posts,
        categories: Categories
    }
}

export default connect(mapStateToProps)(PostsContainer);