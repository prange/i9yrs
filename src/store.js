import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {combined} from './reducers'

const loggerMiddleware = createLogger();

export const store =
    createStore(
        combined,
        compose(
            applyMiddleware(
                thunkMiddleware,
                /*loggerMiddleware*/),
            window.devToolsExtension ? window.devToolsExtension() : f => f));

