import { LOAD_COMMENTS, DOWNVOTE_COMMENT } from '../actions/comments'

export default function Comments(state = {}, action) {
    switch (action.type) {
        case LOAD_COMMENTS:
            return {
                ...state,
                ...action.comments
            }
        case DOWNVOTE_COMMENT:
            Object.keys(state).forEach((key) => {
                if (state[key].id === action.comment.id) {
                    state[key] = action.comment
                }
            })
            return {
                ...state
            }
        default:
            return state
    }
}