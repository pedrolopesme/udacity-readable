import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleDeletePost, handleDownVotePost, handleUpVotePost } from '../actions/posts';
import PostPreviewComponent from '../components/PostPreviewComponent';
import { SORTING, SortingFilterComponent, SORTING_DIRECTION } from '../components/SortingFilterComponent';
import { flattenObjectArray } from '../utils/arrays';


class PostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { sort: SORTING.DATE, direction: SORTING_DIRECTION.DESC }
    }

    setSorting = (order, direction) => {
        this.setState({ sort: order, direction: direction })
    }

    getPosts = (posts) => {
        return flattenObjectArray(posts).sort((a, b) => {
            const field = this.state.sort;

            if (this.state.direction === SORTING_DIRECTION.ASC) {
                return a[field] - b[field];
            }

            return b[field] - a[field];
        })
    }

    downVotePost = (post) =>
        this.props.dispatch(handleDownVotePost(post))

    upVotePost = (post) =>
        this.props.dispatch(handleUpVotePost(post))

    deletePost = (post) =>
        this.props.dispatch(handleDeletePost(post))

    render() {

        let divStyle = {
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative'
        };

        const styles = theme => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing.unit * 2,
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        });

        return <div>
            <div style={divStyle}>
                <Grid container spacing={24}>
                    <Grid item align="left" xs={9}>
                        <div>
                            <div className="left">
                                <h2> Featured </h2>
                            </div>
                            <div className={"right sorting"}>
                                <SortingFilterComponent
                                    className="sorting"
                                    sort={this.state.sort}
                                    direction={this.state.direction}
                                    changeSorting={this.setSorting} />
                            </div>
                            <span className="clearfix"></span>
                        </div>

                        <Grid container spacing={24}>
                            {this.getPosts(this.props.posts).map(post =>
                                <Grid item xs={12} key={post.id}>
                                    <Paper className={styles.paper}>
                                        <PostPreviewComponent
                                            post={post}
                                            downVote={this.downVotePost}
                                            upVote={this.upVotePost}
                                            deletePost={this.deletePost} />
                                    </Paper>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                    <Grid item xs={3} align="left">
                        <h2> Categories </h2>
                        <List component="nav">
                            {flattenObjectArray(this.props.categories).map(category =>
                                <Link to={`/${category.path}`} key={category.path}>
                                    <ListItem button >
                                        <ListItemText > {category.name} </ListItemText>
                                    </ListItem>
                                </Link>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </div>
            <Fab color="primary" aria-label="Add" align="right" className="fab" to={`/posts/new`} component={props => <Link {...props} />}>
                <AddIcon />
            </Fab>
        </div >
    }
}

function mapStateToProps({ Categories, Posts }) {
    return {
        posts: Posts,
        categories: Categories
    }
}

export default connect(mapStateToProps)(PostsContainer);