import ajax from "./ajax";

const BASE_URL = "http://localhost:3000"

// 登录
export const reqLogin = (username, password)=> ajax(BASE_URL + "/login", {username, password}, "POST")
// 添加用户
export const reqAddUser = (user)=> ajax(BASE_URL + "/manage/user/add", user, "POST")
// 获取用户列表
export const reqUserList = () => ajax(BASE_URL + "/manage/user/list", {}, "GET")
// 删除用户
export const reqRemoveUser = (userId) => ajax(BASE_URL + "/manage/user/delete", {userId}, "POST")
// 更新用户
export const reqUpdateUser = (user) => ajax(BASE_URL + "/manage/user/update", user, "POST")
// 获取天气
export const reqWeather = () => ajax("https://devapi.qweather.com/v7/weather/3d?location=101100901&key=0f374c4bcfe141f09d300f51e1c54e0b", {}, "GET")
// 获取分类列表
export const reqCategories = (parentId)=> ajax(BASE_URL + "/manage/category/list", {parentId}, "GET")
// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE_URL + "/manage/category/add", {categoryName, parentId}, "POST")
// 更新分类名称
export const reqUpdateCategories = (categoryId, categoryName) => ajax(BASE_URL + "/manage/category/update", {categoryId, categoryName}, "POST")
// 根据id获取分类
export const reqCategory = (categoryId) => ajax(BASE_URL + "/manage/category/info", {categoryId}, "GET")
// 删除分类
export const reqDeleteCategory = (categoryId) => ajax(BASE_URL + "/manage/category/delete", {categoryId}, "POST")
// 获取产品分页列表
export const reqProductList = (pageNum, pageSize) => ajax(BASE_URL + "/manage/product/list", {pageNum, pageSize}, "GET")
// 搜索产品列表
export const reqProductSearch = (pageNum, pageSize, productText, productType) => ajax(BASE_URL + "/manage/product/search", {pageNum, pageSize, [productType]:productText}, "GET")
// 更新产品状态（在售/下架）
export const reqUpdateProductStatus = (productId, status) => ajax(BASE_URL + "/manage/product/updateStatus", {productId, status}, "POST")
// 更新/添加产品
export const reqUpdateAddProduct = (product) => ajax(BASE_URL + "/manage/product/" + (product._id?"update":"add"), product, "POST")
// 获取角色列表
export const reqRoleList = () => ajax(BASE_URL + "/manage/role/list", {}, "GET")
// 添加角色
export const reqAddRole = (roleName) => ajax(BASE_URL + "/manage/role/add", {roleName}, "POST")
// 删除角色
export const reqRemoveRole = (roleId) => ajax(BASE_URL + "/manage/role/remove", {roleId}, "POST")
// 更新角色权限
export const reqUpdateRole = (role) => ajax(BASE_URL + "/manage/role/update", role, "POST")
// 删除服务器图片
export const reqRemoveImg = (name) => ajax(BASE_URL + "/manage/img/delete", {name}, "POST")