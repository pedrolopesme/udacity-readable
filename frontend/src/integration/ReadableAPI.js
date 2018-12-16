const API = "http://localhost:3001"

// Generate a unique token for storing my posts.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

// get all data necessary to start application
export function getInitialData() {
    return Promise.all([
        getCategories(),
        getPosts(),
    ]).then(([categories, posts]) => ({
        categories,
        posts,
    }));
}

// gets all categories.
export const getCategories = () =>
    fetch(`${API}/categories`, { headers })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data).categories : {})

// gets posts from a particular category. 
export const getCategoryPosts = (category) =>
    fetch(`${API}/${category}/posts`, { headers })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// gets all posts.
export const getPosts = () =>
    fetch(`${API}/posts`, { headers })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// create a post.
export const createPost = (post) =>
    fetch(`${API}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post })
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// update a post.
export const updatePost = (id, post) =>
    fetch(`${API}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post })
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// gets a specific post.
export const getPost = (id) =>
    fetch(`${API}/posts/${id}`, { headers })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data).post : {})

// up vote a post.
export const upVotePost = (id) =>
    fetch(`${API}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: 'upVote' })
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// down vote a post.
export const downVotePost = (id) =>
    fetch(`${API}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: 'downVote' })
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})


// delete post.
export const deletePost = (id) =>
    fetch(`${API}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers
        }
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// gets all comments from a specific post.
export const getComments = (postId) =>
    fetch(`${API}/posts/${postId}/comments`, { headers })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// create a comment.
export const createComment = (comment) =>
    fetch(`${API}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// gets a specific comment.
export const getComment = (id) => {
    fetch(`${API}/comments/${id}`, { headers })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data).post : {})
}

// up vote a comment.
export const upVoteComment = (id) =>
    fetch(`${API}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: 'upVote' })
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// down vote a comment.
export const downVoteCommment = (id) =>
    fetch(`${API}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: 'downVote' })
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// update a comment.
export const updateComment = (id, comment) =>
    fetch(`${API}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})

// delete comment.
export const deleteComment = (id) =>
    fetch(`${API}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers
        }
    })
        .then(res => res.text())
        .then(data => data ? JSON.parse(data) : {})