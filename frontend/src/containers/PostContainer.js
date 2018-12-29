import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentFormComponent from '../components/CommentFormComponent';
import CommentComponent from '../components/CommentComponent';
import PostComponent from '../components/PostComponent';
import { handleLoadComments } from '../actions/comments';
import { handleDownVotePost, handleUpVotePost, handleDeletePost, incrementComments, decrementComments } from '../actions/posts';
import { handleAddComment, handleDownVoteComment, handleUpVoteComment, handleDeleteComment, handleEditComment } from '../actions/comments';
import Divider from '@material-ui/core/Divider';
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver'


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

    upVotePost = (post) =>
        this.props.dispatch(handleUpVotePost(post))

    downVoteComment = (comment) =>
        this.props.dispatch(handleDownVoteComment(comment))

    upVoteComment = (comment) =>
        this.props.dispatch(handleUpVoteComment(comment))

    addComment = (comment, post) =>
        this.props.dispatch(handleAddComment(comment)) &&
        this.props.dispatch(incrementComments(post))

    editComment = (comment) =>
        this.props.dispatch(handleEditComment(comment))

    deleteComment = (comment, post) =>
        this.props.dispatch(handleDeleteComment(comment)) &&
        this.props.dispatch(decrementComments(post))

    deletePost = (post) =>
        this.props.dispatch(handleDeletePost(post))

    render() {
        const post = this.filterPost(this.props);

        if (!post) {
            return <div>
                Sorry, post doesn't exist.
            </div>
        }

        return <div className="postWrapper">
            <PostComponent
                post={post}
                downVote={this.downVotePost}
                upVote={this.upVotePost}
                deletePost={this.deletePost} />

            <Divider light className="divider" />

            <CommentFormComponent
                post={post}
                submitCallback={this.addComment} />

            <h3>
                <RecordVoiceOver className="icon" />
                {post.commentCount} Comment(s)
            </h3>
            {this.props.comments && Object.keys(this.props.comments).map(key =>
                <CommentComponent
                    key={key}
                    post={post}
                    comment={this.props.comments[key]}
                    submitCallback={this.editComment}
                    downVote={this.downVoteComment}
                    upVote={this.upVoteComment}
                    deleteComment={this.deleteComment} />
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