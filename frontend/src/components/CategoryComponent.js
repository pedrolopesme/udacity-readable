import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CategoryComponent extends Component {
    render = () => {
        const category = this.props.category;
        return (<div>
            <Link to={`/${category.path}`}> {category.name} </Link>
        </div>)
    }
}

export default CategoryComponent;