import { combineReducers } from 'redux';
import Posts from './posts'
import Categories from './categories'

export default combineReducers({
    Posts,
    Categories
});