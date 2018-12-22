import React, { Component } from 'react';
import './App.css';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import PostFormComponent from './components/PostFormComponent';
import { InitialDataLoader } from './actions/shared';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { handleAddPost, handleEditPost } from './actions/posts';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(InitialDataLoader());
  }

  addPost = (post) =>
    this.props.dispatch(handleAddPost(post))

  editPost = (post) =>
    this.props.dispatch(handleEditPost(post))

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Link to={`/`}> <h1> My Blog </h1> </Link>
          </header>
          <Route exact path="/posts/new" render={() =>
            <PostFormComponent categories={this.props.categories} submitCallback={this.addPost} />} />
          <Route exact path="/posts/:id/edit" render={() =>
            <PostFormComponent categories={this.props.categories} submitCallback={this.editPost} posts={this.props.posts} />} />
          <Route exact path="/post/:id" component={PostContainer} />
          <Route exact path="/" component={PostsContainer} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ Categories, Posts }) {
  return {
    loading: Categories === {},
    categories: Categories,
    posts: Posts
  }
}

export default connect(mapStateToProps)(App);
