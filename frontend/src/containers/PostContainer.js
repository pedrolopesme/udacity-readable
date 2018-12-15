import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddCommentComponent from '../components/AddCommentComponent';
import CommentComponent from '../components/CommentComponent';
import PostComponent from '../components/PostComponent';
import { handleLoadComments } from '../actions/comments';
import { handleDownVotePost } from '../actions/posts';

class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
    }

    componentDidMount() {
        this.props.dispatch(handleLoadComments(this.id))
    }

    // filterPost knows how to extract the right post
    // to render on PostContainer
    filterPost = (props) => {
        const posts = props.posts;

        if (this.id && posts) {
            return Object.keys(posts)
                .map(key => posts[key])
                .filter(p => p.id === this.id)
                .shift();
        }
    }

    downVotePost = (post) =>
        this.props.dispatch(handleDownVotePost(post))


    render() {
        return <div>
            <PostComponent post={this.filterPost(this.props)} downVote={this.downVotePost} />
            <h3>Comments:</h3>
            <AddCommentComponent postId={this.id} />
            <hr />
            {this.props.comments && Object.keys(this.props.comments).map(key =>
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