import { LOAD_COMMENTS } from '../actions/comments' 

export default function Comments(state = {}, action){
    switch(action.type){
        case LOAD_COMMENTS:
            return {
                ...state,
                ...action.comments
            }
        default: 
            return state
    }
}