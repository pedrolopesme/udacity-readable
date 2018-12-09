import { combineReducers } from 'redux';
import Posts from './posts'
import Categories from './categories'
import Comments from './comments'

export default combineReducers({
    Posts,
    Categories,
    Comments
});