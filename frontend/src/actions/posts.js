import * as API from '../integration/ReadableAPI';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const LOAD_POSTS = 'LOAD_POSTS';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const UP_POST = 'UP_POST';
export const INCREMENT_COMMENTS = 'INCREMENT_COMMENTS';
export const DECREMENT_COMMENTS = 'DECREMENT_COMMENTS';

export function loadPosts(posts) {
    return {
        type: LOAD_POSTS,
        posts,
    }
}

export function incrementComments(post) {
    return {
        type: INCREMENT_COMMENTS,
        post,
    }
}

export function decrementComments(post) {
    return {
        type: DECREMENT_COMMENTS,
        post,
    }
}

export function downVotePost(post) {
    return {
        type: DOWNVOTE_POST,
        post,
    }
}

export function handleDownVotePost(post) {
    return (dispatch) => {
        return API.downVotePost(post.id)
            .then((post) => dispatch(downVotePost(post)))
    }
}

export function upVotePost(post) {
    return {
        type: UP_POST,
        post,
    }
}

export function handleUpVotePost(post) {
    return (dispatch) => {
        return API.upVotePost(post.id)
            .then((post) => dispatch(upVotePost(post)))
    }
}

function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function handleAddPost(post) {
    return (dispatch) => {
        return API.createPost(post)
            .then((post) => dispatch(addPost(post)))
    }
}

function editPost(post) {
    return {
        type: EDIT_POST,
        post
    }
}

export function handleEditPost(post) {
    return (dispatch) => {
        return API.updatePost(post.id, post)
            .then((post) => dispatch(editPost(post)))
    }
}

function deletePost(post) {
    return {
        type: DELETE_POST,
        post
    }
}

export function handleDeletePost(post) {
    return (dispatch) => {
        return API.deletePost(post.id)
            .then((post) => dispatch(deletePost(post)))
    }
}