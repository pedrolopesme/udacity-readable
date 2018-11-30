import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class PostComponent extends Component {
    render = () => {
        const post = this.props.post;
        return (<div>
            <Link to={`/post/${post.id}`}>
                <h3> {post.title} </h3>
            </Link>
        </div>)
    }
}

export default PostComponent;