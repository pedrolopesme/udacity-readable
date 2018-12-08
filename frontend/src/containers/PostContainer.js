import React, { Component } from 'react';
import { connect } from 'react-redux'

class PostContainer extends Component {
    // filterPost knows how to extract the right post
    // to render on PostContainer
    filterPost = (props) => {
        const id = props.match.params.id;
        const posts = props.posts;

        if (id && posts) {
            return Object.keys(posts)
                .map(key => posts[key])
                .filter(p => p.id === id)
                .shift();
        }
    }

    render() {
        const post = this.filterPost(this.props);
        return <div>
            {post && (
                <h3> {post.title} </h3>
            )}
        </div>
    }
}

function mapStateToProps({ Posts }) {
    return {
        posts: Posts,
    }
}

export default connect(mapStateToProps)(PostContainer);