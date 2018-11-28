import React, {Component} from 'react'

class PostComponent extends Component {
    render = () => {
        const post = this.props.post;
        return (<div>
            <h3> {post.title} </h3>
            {post.body}
        </div>)
    }
}

export default PostComponent;