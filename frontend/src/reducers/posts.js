import {assignToProperElement} from '../utils/arrays.js';
import { LOAD_POSTS, DOWNVOTE_POST, UP_POST } from '../actions/posts'

export default function Posts(state = {}, action) {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                ...action.posts
            }
        case DOWNVOTE_POST:
            assignToProperElement(state, action.post.id, action.post);
            return {
                ...state
            }
        case UP_POST:
            assignToProperElement(state, action.post.id, action.post);
            return {
                ...state
            }

        default:
            return state
    }
}