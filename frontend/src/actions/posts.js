export const LOAD_POSTS = 'GET_POSTS';

export function loadPosts (posts) {
    return {
        type: LOAD_POSTS,
        posts,
    }
}