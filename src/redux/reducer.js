/*
* 用来根据老的 state 和指定的 action 生成新的 state 的函数
* */
import storageUtils from "../utils/storageUtils";
import { combineReducers } from "redux";
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERR_MESSAGE,
    RESET_USER,
    UPDATE_SALES,
    UPDATE_STORIES
} from "./action-types";
// 标题
const initialHeadTitle = "首页"

const headTitle = (state=initialHeadTitle, {type, data})=>{
    switch (type){
        case SET_HEAD_TITLE:
            return data
        default: return state
    }
}
// 用户
const initialUser = {user: storageUtils.getUser()}

const user = (state=initialUser, action)=>{
    switch (action.type){
        case RECEIVE_USER:
            return {user: action.user, successMsg: "登陆成功"}
        case SHOW_ERR_MESSAGE:
            return {...state, errorMsg: action.msg}
        case RESET_USER:
            return {successMsg: "退出成功"}
        default:
            return state
    }
}

// 销量
const initialSales = [5, 20, 36, 10, 10, 20]

const sales = (state=initialSales, action) => {
    switch (action.type){
        case UPDATE_SALES:
            return action.sales.map(sale=>sale+1)
        default:
            return state
    }
}

// 库存
const initialStories = [15, 30, 20, 15, 20, 10]

const stories = (state=initialStories, action)=>{
    switch (action.type){
        case UPDATE_STORIES:
            return action.stories.map(story=>story-1)
        default:
            return state
    }
}

/*
* 向外默认暴露的是合并产生的总的 reducer 函数
* 管理的总的 state 的结构
* {
*   headTitle: "首页",
*   user: {}
* }
* */
export default combineReducers({
    headTitle,
    user,
    sales,
    stories
})