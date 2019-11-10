import { combineReducers } from 'redux'
import { showPosts, addPost, fetchSinglePost} from './postReducer';
import { createUser } from './userReducer';
export  const rootReducer = combineReducers({
    showPosts,
    addPost,
    fetchSinglePost,
    createUser
})

