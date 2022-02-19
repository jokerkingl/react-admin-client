/*
* 能发送异步ajax请求的函数模块
* 封装axios库
* 函数的返回值是promise对象
* */
import axios from 'axios';
import {message} from "antd"

export default function ajax(url, data={}, type='GET',) {

    return new Promise((resolve)=>{
        let promise
        if(type==="GET"){
            promise = axios.get(url, {
                params:data
            })
        }else{
            promise = axios.post(url, data)
        }
        promise.then((res)=>{
            resolve(res.data)
        })
            .catch(error => {
            message.error("请求出错了" + error.message).then()
        })
    })

}

/*
    jsonp解决 ajax 跨域问题
    1）jsonp 只能解决 GET 类型的 ajax 请求
    2）jsonp 请求不是 ajax 请求，而是一般的 get 请求
    3）基本原理
        浏览器端：
            动态生成 <script> 来请求后台接口 （src 就是接口的 url）
            定义好用于接收响应数据的函数（fn）并将函数名通过请求参数提交给后台（callback=fn）
        服务器端：
            接受到请求处理产生结果数据后，返回一个函数调用的 js 代码 并将结果数据作为实参传入函数调用
        浏览器端：
            收到相应自动执行函数调用的 js 代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据
*/
