import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogPostReducer from './reducers/blogPostReducer'
import userReducer from './reducers/userReducer'
import userViewReducer from './reducers/userViewReducer'
import singleBlogPostReducer from './reducers/singleBlogPostReducer'

const reducer = combineReducers({
    blogs: blogPostReducer,
    notifications: notificationReducer,
    users: userReducer,
    allUsers: userViewReducer,
    singleBlog: singleBlogPostReducer
})

const store = createStore(
reducer,
composeWithDevTools(
applyMiddleware(thunk)
)
)

export default store