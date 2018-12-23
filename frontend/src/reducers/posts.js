import { assignToProperElement, removeElement } from '../utils/arrays.js';
import { LOAD_POSTS, DOWNVOTE_POST, UP_POST, ADD_POST, EDIT_POST, DELETE_POST, INCREMENT_COMMENTS, DECREMENT_COMMENTS } from '../actions/posts'

export default function Posts(state = {}, action) {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                ...action.posts
            }
        case ADD_POST:
            return {
                ...state,
                [Object.keys(state).length]: action.post
            }
        case EDIT_POST:
            assignToProperElement(state, action.post.id, action.post);
            return {
                ...state
            }
        case DELETE_POST:
            return {
                ...removeElement(state, action.post.id),
            }
        case DOWNVOTE_POST:
            assignToProperElement(state, action.post.id, action.post);
            return {
                ...state
            }
        case INCREMENT_COMMENTS:
            action.post.commentCount += 1;
            assignToProperElement(state, action.post.id, action.post);
            return {
                ...state
            }
        case DECREMENT_COMMENTS:
            action.post.commentCount -= 1;
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