import * as API from '../integration/ReadableAPI';
import { loadPosts } from '../actions/posts';
import { loadCategories } from '../actions/categories';

// loads all posts and categories for the 
// main container
export function InitialDataLoader() {
    return (dispatch) => {
        // todo: loading ?
        return API.getInitialData()
            .then(({ categories, posts }) => {
                dispatch(loadPosts(posts))
                dispatch(loadCategories(categories))
            });
    }
}