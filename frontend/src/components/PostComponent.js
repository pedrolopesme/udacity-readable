import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class PostComponent extends Component {
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
        return <Fragment>
            {post && (
                <div className="post">
                    <h1> {post.title} </h1>
                    <div class="meta">
                        <div className="left">
                            <div> author <span> {post.author} </span> -
                            <Link to={`/posts/${post.id}/edit`}> Edit </Link> |
                            <Link to={`/`} onClick={(e) => this.handleDeletePost(e, post)}> Delete </Link>
                            </div>
                        </div>
                        <div className="right">
                            <div> <FavoriteBorder className="icon" /> <span> {post.voteScore} </span> </div>
                            <div>
                                <button className="a" onClick={() => upVote(post)} href=""> <ThumbUp className="icon thumbs" /> like it </button>
                                <button className="a" onClick={() => downVote(post)} name="#"> <ThumbDown className="icon thumbs" /> hate it </button>
                            </div>
                        </div>
                        <span className="clearfix"></span>
                    </div>
                    <div className="postBody">
                        {post.body}
                    </div>
                </div>
            )}
        </Fragment>
    }
}

export default PostComponent;