import { LOAD_CATEGORIES } from '../actions/categories' 

export default function Categories(state = {}, action){
    switch(action.type){
        case LOAD_CATEGORIES:
            return {
                ...state,
                ...action.categories
            }
        default: 
            return state
    }
}