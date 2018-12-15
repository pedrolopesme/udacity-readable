import { LOAD_POSTS, DOWNVOTE_POST, UP_POST } from '../actions/posts'

export default function Posts(state = {}, action) {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                ...action.posts
            }
        case DOWNVOTE_POST:
            Object.keys(state).forEach((key) => {
                if (state[key].id === action.post.id) {
                    state[key] = action.post
                }
            })
            return {
                ...state
            }
        case UP_POST:
            Object.keys(state).forEach((key) => {
                if (state[key].id === action.post.id) {
                    state[key] = action.post
                }
            })
            return {
                ...state
            }

        default:
            return state
    }
}