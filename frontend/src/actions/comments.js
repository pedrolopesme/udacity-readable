import * as API from '../integration/ReadableAPI';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENTS';

function loadComments({ postId, comments }) {
    return {
        type: LOAD_COMMENTS,
        postId,
        comments
    }
}

export function handleLoadComments(postId) {
    return (dispatch) => {
        return API.getComments(postId)
            .then((comments) => dispatch(loadComments({ postId, comments })));
    }
}

export function downVoteComment(comment) {
    return {
        type: DOWNVOTE_COMMENT,
        comment,
    }
}

export function handleDownVoteComment(comment) {
    return (dispatch) => {
        return API.downVoteCommment(comment.id)
            .then((comment) => dispatch(downVoteComment(comment)))
    }
}
