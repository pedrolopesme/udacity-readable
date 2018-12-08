import React, { Component } from 'react';
import './App.css';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import { InitialDataLoader } from './actions/shared';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(InitialDataLoader());
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
          <Link to={`/`}> <h1> My Blog </h1> </Link> 
          </header>
          <Route exact path="/post/:id" component={PostContainer} />
          <Route exact path="/" component={PostsContainer} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ Categories }) {
  return {
    loading: Categories === {}
  }
}

export default connect(mapStateToProps)(App);
