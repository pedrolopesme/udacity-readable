import { LOAD_POSTS } from '../actions/posts' 

export default function Posts(state = {}, action){
    switch(action.type){
        case LOAD_POSTS:
            return {
                ...state,
                ...action.posts
            }
        default: 
            return state
    }
}