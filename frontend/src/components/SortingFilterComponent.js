import React, { Component } from 'react';

export class SortingFilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { sort: props.sort, direction: props.direction }
        this.changeSorting = props.changeSorting;
    }

    setSorting = (order) => {
        let direction = SORTING_DIRECTION.DESC;
        if (this.state.sort === order) {
            direction = this.state.direction === SORTING_DIRECTION.ASC ? SORTING_DIRECTION.DESC : SORTING_DIRECTION.ASC;
        }
        this.setState({ sort: order, direction: direction })
        this.changeSorting(order, direction);
    }

    render = () => {
        return <div>
            Sort by :
                <button onClick={() => this.setSorting(SORTING.DATE)}>
                date {this.state.sort === SORTING.DATE && (<span> (*) </span>)}
            </button> |
                <button onClick={() => this.setSorting(SORTING.SCORE)}>
                score {this.state.sort === SORTING.SCORE && (<span> (*) </span>)}
            </button> |
                <button onClick={() => this.setSorting(SORTING.COMMENTS)}>
                comments {this.state.sort === SORTING.COMMENTS && (<span> (*) </span>)}
            </button>
        </div>
    }
}

export const SORTING = {
    DATE: "timestamp", SCORE: "voteScore", COMMENTS: "commentCount"
}

export const SORTING_DIRECTION = {
    ASC: "ASC", DESC: "DESC"
}