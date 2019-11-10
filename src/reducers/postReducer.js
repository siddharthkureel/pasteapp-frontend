export const showPosts = (state = {}, action) => {
    if (action.type === 'SHOW_POSTS') {
        return { ...state, posts: action.payload }
    }
    return state;
}
export const addPost = (state = {}, action) => {
    if (action.type === 'ADD_POST') {
        return { ...state, posts: action.payload }
    }
    return state;
}
export const editPost = (state = {}, action) => {
    if (action.type === 'EDIT_POST') {
        return { ...state, posts: action.payload }
    }
    return state;
}
export const fetchSinglePost = (state = {}, action) => {
    if (action.type === 'FETCH_SINGLE_POST') {
        return { ...state, post: action.payload }
    }
    return state
}