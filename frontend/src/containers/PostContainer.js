import React, { Component } from 'react';
import { connect } from 'react-redux'

class PostContainer extends Component {
    render () {
        const id = this.props.match.params.id;
        const posts = this.props.posts;
        let post;

        if(id && posts) {
            post = Object.keys(posts)
                        .map( key => posts[key])
                        .filter(p => p.id === id)
                        .shift();
        } 

        return <div>
            {post && (
                <h1> {post.title} </h1>
            )}
            
        </div>
    }
}

function mapStateToProps({Posts}){
    return {
        posts: Posts,
    }
}

export default connect(mapStateToProps)(PostContainer);