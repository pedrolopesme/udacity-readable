import * as API from '../integration/ReadableAPI';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENTS';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENTS';

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

export function upVoteComment(comment) {
    return {
        type: UPVOTE_COMMENT,
        comment,
    }
}

export function handleUpVoteComment(comment) {
    return (dispatch) => {
        return API.upVoteComment(comment.id)
            .then((comment) => dispatch(upVoteComment(comment)))
    }
}