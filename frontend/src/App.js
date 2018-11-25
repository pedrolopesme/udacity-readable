import React, { Component } from 'react';
import './App.css';
import PostsContainer from './containers/PostsContainer';
import { InitialDataLoader } from './actions/shared';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(InitialDataLoader());
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> My Blog </h1>
        </header>
        <PostsContainer />
      </div>
    );
  }
}

function mapStateToProps({ Categories }) {
  return {
    loading: Categories === {}
  }
}

export default connect(mapStateToProps)(App);
