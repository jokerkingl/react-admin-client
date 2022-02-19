import ajax from "./ajax";

// 登录
export const reqLogin = (username, password)=> ajax("/login", {username, password}, "POST")
//添加用户
export const reqAddUser = (user)=> ajax("/manage/user/add", {user}, "POST")
//获取天气
export const reqGetWeather = ()=> ajax("https://dsevapi.qweather.com/v7/weather/3d?location=112.43,39.33&key=c06fa20306cb40468d24f4edc7b7e7ec", {}, "GET")