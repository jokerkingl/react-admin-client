/*
* 左侧导航组件
* */
import React from "react"
import {Link, useLocation} from "react-router-dom"
//style
import "./left-nav.less"
// logo
import logo from "../../assets/img/logo.png"
// antd
import { Menu } from 'antd';
// config
import menuConfig from "../../config/menuConfig";
import storageUtils from "../../utils/storageUtils";

const LeftNav = () => {
    const { SubMenu } = Menu;
    const location = useLocation()
    let openKey
    let defaultKey
    let menuNodes

    // 根据 menu 对应的数据数组生成对应的标签数组 map
    /*const getMenuNodes_map = (menuList) => {
        return menuList.map((item) => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key} icon={<item.icon />}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }
            else {
                return (
                    <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
                        {getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })
    }*/

    const hasAuth = (item)=>{
        const name = storageUtils.getUser().username
        const menus = storageUtils.getUser().role.menus
        return name==="admin" || menus.find(menu=>menu===item.key) || (item.children && item.children.find(child=>menus.indexOf(child.key)!==-1))
    }

    // 根据 menu 对应的数据数组生成对应的标签数组 reduce
    const getMenuNodes_reduce = (menuList) => {
        if(location.pathname.indexOf("/product") === 0) defaultKey = "/" + location.pathname.split("/")[1]
        else defaultKey = location.pathname
        return menuList.reduce((pre, item)=>{
            if(hasAuth(item)){
                if (!item.children){
                    pre.push(
                        <Menu.Item key={item.key} icon={<item.icon />}>
                            <Link to={item.key}>{item.title}</Link>
                        </Menu.Item>
                    )
                }
                else {
                    if(item.children.find(cItem => cItem.key === defaultKey)) {
                        openKey = item.key
                    }
                    pre.push(
                        <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
                            {getMenuNodes_reduce(item.children)}
                        </SubMenu>
                    )
                }
            }
            return pre
        }, [])
    }
    menuNodes = getMenuNodes_reduce(menuConfig)

    // return
    return (
        <div className="left-nav">
            <Link to={"/"} className="left-nav-header">
                <img src={logo} alt="图标"/>
                <h1>后台管理系统</h1>
            </Link>
            <Menu
                defaultSelectedKeys={[defaultKey]}
                defaultOpenKeys={[openKey]}
                mode="inline"
                theme="dark"
            >
                {menuNodes}
            </Menu>
        </div>
    )
}

export default LeftNav