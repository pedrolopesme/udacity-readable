import React, { Component } from 'react';
import PostComponent from '../components/PostComponent';
import { connect } from 'react-redux'

class PostsContainer extends Component {
    render () {
        return <div>
            <pre> { JSON.stringify(this.props) } </pre>
            Posts
            <PostComponent />
            <PostComponent />
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