import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostPreviewComponent extends Component {
    constructor(props) {
        super(props);
        this.deletePost = props.deletePost;
    }

    handleDeletePost = (e, post) => {
        window.confirm("Do you really want to delete this?") ? this.deletePost(post) : e.preventDefault();
    }

    render = () => {
        const post = this.props.post;
        const downVote = this.props.downVote;
        const upVote = this.props.upVote;

        return <div className="postPreview">
            <div>
                <Link to={`/post/${post.id}`}>
                    <h4>{post.title} </h4>
                </Link>
                <div className="meta">
                    <b> {post.author} </b> - {post.commentCount} comments
                </div>
                <div className="body">
                    {post.body.substring(1, 255)}
                    <Link to={`/post/${post.id}`}> <br /> see more ... </Link>
                </div>
                <div className="footer">
                    <div className="left">
                        <Link to={`/posts/${post.id}/edit`}> <button type="button"> Edit </button> </Link>
                        <Link to={`/`} onClick={(e) => this.handleDeletePost(e, post)}>  <button type="button"> Delete  </button> </Link>
                    </div>
                    <div className="right">
                        <div className="score">
                            <FavoriteBorder className="icon" /> <span> {post.voteScore} </span>
                            <button className="a" onClick={() => upVote(post)} href=""> <ThumbUp className="icon thumbs" /> like it </button>
                            <button className="a" onClick={() => downVote(post)} name="#"> <ThumbDown className="icon thumbs" /> hate it </button>
                        </div>
                    </div>
                    <span className="clearfix"></span>
                </div>
            </div>
        </div>
    }
}

export default PostPreviewComponent;