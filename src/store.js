import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {combined} from './reducers'

const loggerMiddleware = createLogger();

export const store =
    createStore(
        combined,
        applyMiddleware(
            thunkMiddleware,
            /*loggerMiddleware*/));

