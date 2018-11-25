import * as API from '../integration/ReadableAPI';
import loadPosts from '../actions/posts';

// loads all posts and categories for the 
// main container
export function PostsContainer() {
    return (dispatch) => {
        // todo: loading ?
        return API.getInitialData()
            .then(({ categories, posts }) => {
                dispatch(loadPosts(posts))
                // todo: dispatch categories ?
            });
    }
}