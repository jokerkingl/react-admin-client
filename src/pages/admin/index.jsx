/*
* 管理的路由组件
* */
import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import { Layout } from 'antd';
// style
import "./admin.less"
// component
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
// 二层路由
import Home from "../home";
import Product from "../product";
import Category from "../category";
import Role from "../role"
import User from "../user"
import Bar from "../charts/bar"
import Line from "../charts/line"
import Pie from "../charts/pie"
import Test from "../test"
import NotFound from "../not-found";

import {useSelector} from "react-redux";

const { Footer, Sider, Content } = Layout;

function Admin() {
    const user = useSelector(state => state.user.user)
    // 没有登陆则返回登陆页面
    if(!user || !user._id){
        return <Navigate to="/login"/>
    }

    return (
        <Layout className="admin">
            <Sider>
                <LeftNav />
            </Sider>
            <Layout>
                <Header />
                <Content className="content">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path={"/home"} element={<Home />}/>
                        <Route path={"/category"} element={<Category />}/>
                        <Route path={"/product/*"} element={<Product />}/>
                        <Route path={"/role"} element={<Role />}/>
                        <Route path={"/user"} element={<User />}/>
                        <Route path={"/charts/bar"} element={<Bar />}/>
                        <Route path={"/charts/line"} element={<Line />}/>
                        <Route path={"/charts/pie"} element={<Pie />}/>
                        <Route path={"/test"} element={<Test />}/>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Content>
                <Footer className="footer">Footer</Footer>
            </Layout>
        </Layout>
    );

}

export default Admin;