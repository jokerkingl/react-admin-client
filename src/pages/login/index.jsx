import React, {Component} from 'react';
/*
* 登陆的路由组件
* */
import "./login.less"
import logo from "./img/logo.png"
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends Component {
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    getFiledValue = (rule, value) => {
        if(value && value.length < 4) return Promise.reject(new Error('at least 4 characters'))
        else if(value && value.length > 12) return Promise.reject(new Error("at most 12 characters"))
        else if(/\W+$/.test(value)) return Promise.reject(new Error("just word, number and underline"))
        else return Promise.resolve()
    };

    render() {
        return (
            <div className={"login"}>
                <header className={"login-header"}>
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </header>
                <section className={"login-content"}>
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true, whitespace: true, message: 'Please input your Username!',
                                },
                                {
                                    validator: this.getFiledValue
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true, message: 'Please input your Password!',
                                },
                                {
                                    validator: this.getFiledValue
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
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
}

export default Login;