/*
* 包含 n 个action creator函数的模块
* 同步 action 对象 {type: xxx, data: 数据值}
* 异步 action 函数 dispatch => {}
* */

import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERR_MESSAGE,
    RESET_USER,
    UPDATE_SALES,
    UPDATE_STORIES
} from "./action-types";
import {reqLogin} from "../api";
import storageUtils from "../utils/storageUtils";

export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})

export const receiveUser = (user)=>({type: RECEIVE_USER, user})

export const show_err_message = (msg) => ({type: SHOW_ERR_MESSAGE, msg})

export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password)
        if(result.status === 0) {
            const user = result.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }
        else{
            const msg = result.msg
            dispatch(show_err_message(msg))
        }
    }
}

export const logout = () =>  {
    // 删除local中的user
    storageUtils.removeUser()
    // 返回action对象
    return {type: RESET_USER}
}

export const updateSales = (sales) => ({type: UPDATE_SALES, sales})

export const updateStories = (stories) => ({type: UPDATE_STORIES, stories})