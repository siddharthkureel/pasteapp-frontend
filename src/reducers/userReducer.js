export const createUser = (state = {}, action) => {
    if (action.type === 'USER_CREATED') {
        return { ...state, currentUser: action.payload }
    }
    return state;
}