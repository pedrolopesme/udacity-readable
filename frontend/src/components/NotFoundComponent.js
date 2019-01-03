import React from 'react';
import { Link } from 'react-router-dom'

const NotFoundComponent = (props) => {
    return <div>
        <h3> Post Not Found </h3>
        Do you still wanting to check out some awesome posts?
            Go to <Link to={`/`}> home </Link> instead.
        </div>
}

export default NotFoundComponent;