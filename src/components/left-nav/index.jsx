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
// redux
import {useDispatch, useSelector} from "react-redux";
import { setHeadTitle } from "../../redux/action";

const LeftNav = () => {
    const { SubMenu } = Menu;
    const location = useLocation()
    let openKey
    const defaultKey = location.pathname.indexOf("/product") === 0 ? "/" + location.pathname.split("/")[1] : location.pathname

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const hasAuth = (item)=>{
        const name = user.username
        const menus = user.role.menus
        return name==="admin" || menus.find(menu=>menu===item.key) || (item.children && item.children.find(child=>menus.indexOf(child.key)!==-1))
    }

    // 根据 menu 对应的数据数组生成对应的标签数组 reduce
    const getMenuNodes_reduce = (menuList) => {
        return menuList.reduce((pre, item)=>{
            if(hasAuth(item)){
                if(item.key === defaultKey) dispatch(setHeadTitle(item.title))
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
    const menuNodes = getMenuNodes_reduce(menuConfig)

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