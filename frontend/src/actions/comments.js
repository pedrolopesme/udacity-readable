import * as API from '../integration/ReadableAPI';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
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

function downVoteComment(comment) {
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

function upVoteComment(comment) {
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

function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function handleAddComment(comment) {
    return (dispatch) => {
        return API.createComment(comment)
            .then((comment) => dispatch(addComment(comment)))
    }
}

function deleteComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export function handleDeleteComment(comment) {
    return (dispatch) => {
        return API.deleteComment(comment.id)
            .then((comment) => dispatch(deleteComment(comment)))
    }
}

function editComment(comment) {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export function handleEditComment(comment) {
    return (dispatch) => {
        return API.updateComment(comment.id, comment)
            .then((comment) => dispatch(editComment(comment)))
    }
}