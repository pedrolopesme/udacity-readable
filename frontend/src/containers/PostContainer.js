import React, { Component } from 'react';
import { connect } from 'react-redux'

class PostContainer extends Component {
    render () {
        return <div>
            <h1> POST </h1>
            ----
        </div>
    }
}

function mapStateToProps({Posts}){
    return {
        posts: Posts,
    }
}

export default connect(mapStateToProps)(PostContainer);