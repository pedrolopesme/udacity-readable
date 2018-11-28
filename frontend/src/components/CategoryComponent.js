import React, {Component} from 'react'

class CategoryComponent extends Component {
    render = () => {
        const category = this.props.category;
        return (<div>
            <h5> {category.name} </h5>
        </div>)
    }
}

export default CategoryComponent;