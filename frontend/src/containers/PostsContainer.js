import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
        const styles = theme => ({
            container: {
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridGap: `${theme.spacing.unit * 3}px`,
            },
            paper: {
                padding: theme.spacing.unit,
                textAlign: 'center',
                color: theme.palette.text.secondary,
                whiteSpace: 'nowrap',
                marginBottom: theme.spacing.unit,
            },
            divider: {
                margin: `${theme.spacing.unit * 2}px 0`,
            },
            fab: {
                margin: theme.spacing.unit,
            },
        });

        let divStyle = {
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative'
        };

        return <div>
            <div style={divStyle}>
                <Grid container spacing={24}>
                    <Grid item align="left" xs={9}>
                        <SortingFilterComponent
                            sort={this.state.sort}
                            direction={this.state.direction}
                            changeSorting={this.setSorting} />

                        <h2> POSTS </h2>
                        {this.getPosts(this.props.posts).map(post =>
                            <PostPreviewComponent
                                key={post.id}
                                post={post}
                                downVote={this.downVotePost}
                                upVote={this.upVotePost}
                                deletePost={this.deletePost} />
                        )}
                    </Grid>

                    <Grid item xs={3} align="left">
                        <h5> CATEGORIES </h5>
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
            <Fab color="primary" aria-label="Add" align="right" className="fab" containerElement={<Link to={`/posts/new`} />}>
                <AddIcon />
            </Fab>
        </div>
    }
}

function mapStateToProps({ Categories, Posts }) {
    return {
        posts: Posts,
        categories: Categories
    }
}

export default connect(mapStateToProps)(PostsContainer);