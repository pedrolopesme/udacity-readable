import * as API from '../integration/ReadableAPI';

export const LOAD_POSTS = 'LOAD_POSTS';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const UP_POST = 'UP_POST';

export function loadPosts(posts) {
    return {
        type: LOAD_POSTS,
        posts,
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