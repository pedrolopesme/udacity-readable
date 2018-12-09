import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostComponent from '../components/PostComponent';
import CommentComponent from '../components/CommentComponent';
import { handleLoadComments } from '../actions/comments';

class PostContainer extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(handleLoadComments(id))
    }

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
        return <div>
            <PostComponent post={this.filterPost(this.props)} />
            <h3>Comments:</h3> 
            {this.props.comments && Object.keys(this.props.comments).map( key => 
                <CommentComponent key={key} comment={this.props.comments[key]} />
            )}
        </div>
    }
}

function mapStateToProps({ Posts, Comments }) {
    return {
        posts: Posts,
        comments: Comments
    }
}

export default connect(mapStateToProps)(PostContainer);