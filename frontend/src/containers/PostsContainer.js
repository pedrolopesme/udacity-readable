import React, { Component } from 'react';
import PostComponent from '../components/PostComponent';
import {connect} from 'react-redux'

class PostsContainer extends Component {
    render = () => {
        return <div>
            Posts
            { JSON.stringify(this.props) }
            <PostComponent />
            <PostComponent />
        </div>
    }
}

function mapStateToProps({ posts }){
    return {
        posts: posts
    }
}

export default connect(mapStateToProps)(PostsContainer);