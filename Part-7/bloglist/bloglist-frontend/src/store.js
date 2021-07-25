import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogPostReducer from './reducers/blogPostReducer'

const reducer = combineReducers({
    blogs: blogPostReducer,
    notifications: notificationReducer
})

const store = createStore(
reducer,
composeWithDevTools(
applyMiddleware(thunk)
)
)


export default store