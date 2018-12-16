import {assignToProperElement} from '../utils/arrays.js';
import { LOAD_COMMENTS, DOWNVOTE_COMMENT, UPVOTE_COMMENT, ADD_COMMENT } from '../actions/comments'

export default function Comments(state = {}, action) {
    switch (action.type) {
        case LOAD_COMMENTS:
            return {
                ...action.comments
            }
        case ADD_COMMENT:
            return {
                ...state,
                [Object.keys(state).length] : action.comment
            }
        case DOWNVOTE_COMMENT:
            assignToProperElement(state, action.comment.id, action.comment);
            return {
                ...state
            }
        case UPVOTE_COMMENT:
            assignToProperElement(state, action.comment.id, action.comment);
            return {
                ...state
            }
        default:
            return state
    }
}