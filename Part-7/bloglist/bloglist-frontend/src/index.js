import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

const renderApp = () => {
    //console.log(store.getState())
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}
renderApp()
store.subscribe(renderApp)

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
    })