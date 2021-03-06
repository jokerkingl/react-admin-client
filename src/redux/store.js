/*
* redux 最核心的管理对象 store
* */
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducer"
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))