/*
* 左侧导航组件
* */
import React, {useEffect, useRef} from "react"
import {useLocation, useNavigate} from "react-router-dom";
// style
import "./header.less"
// storage
import storage from "../../utils/storageUtils"
// date
import {formatDate} from "../../utils/dateUtils";
// weather
import {reqWeather} from "../../api";
// menuList
import menuConfig from "../../config/menuConfig"
// antd
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// setFetchState
import useFetchState from "../../utils/useFetchState"

const Header = ()=>{
    // state
    const [date, setDate] = useFetchState("")
    const [username, setUsername] = useFetchState("")
    const [icon, setIcon] = useFetchState("")
    const [text, setText] = useFetchState("")
    const [title, setTitle] = useFetchState("")
    const location = useLocation()
    const navigate = useNavigate()
    const { confirm } = Modal;
    let interval=useRef(null)
    const defaultKey = useRef("")

    // logout
    function showConfirm() {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定退出吗？',
            onOk() {
                storage.removeUser()
                navigate("/login")
            },
        });
    }

    // component
    useEffect( ()=> {
        if(location.pathname.indexOf("/product") === 0) defaultKey.current = "/" + location.pathname.split("/")[1]
        else defaultKey.current = location.pathname
        const fetchData = async() => {
            // 获取username
            setUsername(storage.getUser().username)
            // 获取天气情况
            const result = await reqWeather()
            if(result.code === '200'){
                setIcon(result.daily[0].iconDay)
                setText(result.daily[0].textDay)
            }

            // 获取title
            const getTitle = (menuList)=>{
                menuList.forEach(item=>{
                    if(item.children){
                        getTitle(item.children)
                    }
                    else if(item.key === defaultKey.current){
                        setTitle(item.title)
                    }
                })
            }
            getTitle(menuConfig)
        }
        fetchData().then()
    // eslint-disable-next-line
    }, [location.pathname])

    useEffect(()=>{
        const fetchData = async ()=>{
            // 定时器获取时间
            clearInterval(interval.current)
            interval.current = await setInterval(()=>{
                setDate(()=>formatDate(Date.now()))
            }, 1000)
        }
        fetchData().then()
        return ()=>{
            clearInterval(interval.current)
        }
        // eslint-disable-next-line
    }, [])

    //return
    return (
        <div className="head">
            <div className={"head-top"}>
                <span>欢迎,{username}</span>
                <Space className={"logout"}>
                    <Button className={"logoutButton"} onClick={showConfirm}>退出</Button>
                </Space>
            </div>
            <div className={"head-bottom"}>
                <div className={"left"}>{title}</div>
                <div className={"right"}>
                    <span>{date}</span>
                    <i className={`qi-${icon}`} />
                    <span>{text}</span>
                </div>

            </div>
        </div>
    )
}

export default Header