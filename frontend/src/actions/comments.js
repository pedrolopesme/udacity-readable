import { getComments } from '../integration/ReadableAPI';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';

function loadComments({ postId, comments }) {
    return {
        type: LOAD_COMMENTS,
        postId,
        comments
    }
}

export function handleLoadComments(postId) {
    return (dispatch) => {
        return getComments(postId)
            .then((comments) =>  dispatch(loadComments({postId, comments})));
    }
} 