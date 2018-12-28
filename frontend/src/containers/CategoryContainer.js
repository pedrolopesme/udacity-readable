import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleDeletePost, handleDownVotePost, handleUpVotePost } from '../actions/posts';
import PostPreviewComponent from '../components/PostPreviewComponent';
import { SORTING, SortingFilterComponent, SORTING_DIRECTION } from '../components/SortingFilterComponent';
import { flattenObjectArray } from '../utils/arrays';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';

class CategoryContainer extends Component {
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

    filterPosts = (category, props) => {
        const posts = props.posts;
        if (category && posts) {
            return Object.keys(posts)
                .map(key => posts[key])
                .filter(p => p.category === category);
        }
        return []
    }

    render = () => {
        const categoryPath = this.props.match.params.category;
        const posts = this.filterPosts(categoryPath, this.props);
        const category = flattenObjectArray(this.props.categories).filter(c => c.path === categoryPath).shift();

        let divStyle = {
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative'
        };

        return <div>
            <div style={divStyle}>
                <Grid container spacing={24}>
                    <Grid item align="left" xs={9}>
                        {category && (
                            <h2> Category: {category.name} </h2>
                        )}

                        {posts.length > 0 && (
                            <div>
                                <SortingFilterComponent
                                    sort={this.state.sort}
                                    direction={this.state.direction}
                                    changeSorting={this.setSorting} />

                                {this.getPosts(posts).map(post =>
                                    <PostPreviewComponent
                                        key={post.id}
                                        post={post}
                                        downVote={this.downVotePost}
                                        upVote={this.upVotePost}
                                        deletePost={this.deletePost} />
                                )}
                            </div>
                        )}

                        {posts.length === 0 && (
                            <div> No posts yet :( </div>
                        )}
                    </Grid>

                    <Grid item xs={3} align="left">
                        <h2> CATEGORIES </h2>
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

function mapStateToProps({ Posts, Categories }) {
    return {
        posts: Posts,
        categories: Categories
    }
}

export default connect(mapStateToProps)(CategoryContainer);