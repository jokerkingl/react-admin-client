/*
* 登陆的路由组件
* */
import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// logo
import logo from "../../assets/img/logo.png"
// style
import "./login.less"
// redux
import { login } from "../../redux/action";
import {useDispatch, useSelector} from "react-redux";

function Login(){
    const dispatch = useDispatch()

    // 如果用户登录 跳转到 admin 页面
    const user = useSelector(state => state.user.user)
    const errorMsg = useSelector(state => state.user.errorMsg)
    const successMsg = useSelector(state => state.user.successMsg)

    useEffect(()=>{
        if(successMsg) message.success(successMsg).then()
    }, [successMsg])

    if(user && user._id) return <Navigate to="/home" />

    // 提交信息
    const onFinish = (values) => {
        const {username, password} = values
        dispatch(login(username, password))
        if(errorMsg) message.error(errorMsg).then()
    };

    const getFiledValue = (rule, value) => {
        // 密码长度不小于4位
        if(value && value.length < 4) return Promise.reject(new Error('at least 4 characters'))
        // 密码长度不大于12位
        else if(value && value.length > 12) return Promise.reject(new Error("at most 12 characters"))
        // 密码由 字母 数字 下划线 组成
        else if(/\W+$/.test(value)) return Promise.reject(new Error("just word, number and underline"))
        else return Promise.resolve()
    };

    return (
            <div className={"login"}>
                <header className={"login-header"}>
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </header>
                <section className={"login-content"}>
                    <h2>用户登录</h2>
                    {/*登录表单*/}
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                    >
                        {/*用户名*/}
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true, whitespace: true, message: 'Please input your Username!',
                                },
                                {
                                    validator: getFiledValue
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        {/*密码*/}
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true, message: 'Please input your Password!',
                                },
                                {
                                    validator: getFiledValue
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        {/*登录按钮*/}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
}
export default Login