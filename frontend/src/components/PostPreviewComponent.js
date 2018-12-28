import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

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

        const styles = {
            card: {
                minWidth: 275,
            },
            title: {
                fontSize: 14,
            },
            pos: {
                marginBottom: 120,
            },
        };

        return <div>
            <Card className={styles.card}>
                <CardContent>
                    <Link to={`/post/${post.id}`}>
                        <Typography variant="h5" component="h2">
                            {post.title}
                        </Typography>
                    </Link>

                    <div>
                        <small> {post.author} </small> |
                    <small> # Comments: {post.commentCount} </small> |
                    <small> Score: {post.voteScore} </small>
                        <p>
                            <button onClick={() => upVote(post)}> Up Vote </button>
                            <button onClick={() => downVote(post)}> Down Vote </button>
                        </p>
                        <p>

                        </p>
                    </div>
                </CardContent>
                <CardActions>
                    <Link to={`/posts/${post.id}/edit`}> Edit </Link> |
                    <Link to={`/`} onClick={(e) => this.handleDeletePost(e, post)}> Delete </Link>
                </CardActions>
            </Card>
            <Divider className={styles.pos}/>
        </div>
    }
}

export default PostPreviewComponent;