/*
* 进行 local 数据存储管理的工具模块
* */
import store from "store"

const USER_KEY = "user_key"
// eslint-disable-next-line
export default {
    /*保存 user*/
    saveUser(user){
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY, user)
    },
    /*读取 user*/
    getUser(){
        // JSON.parse(localStorage.getItem(USER_KEY) || "{}")
        return store.get(USER_KEY) || {}
    },
    /*删除 user*/
    removeUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}