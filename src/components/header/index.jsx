/*
* 左侧导航组件
* */
import React, {useEffect, useRef} from "react"
import {useLocation} from "react-router-dom";
// style
import "./header.less"
// date
import {formatDate} from "../../utils/dateUtils";
// weather
import {reqWeather} from "../../api";
// antd
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// setFetchState
import useFetchState from "../../utils/useFetchState"
// redux
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/action";

const Header = ()=>{
    const dispatch = useDispatch()
    const location = useLocation()
    const { confirm } = Modal;
    // state
    const [date, setDate] = useFetchState("")
    const [icon, setIcon] = useFetchState("")
    const [text, setText] = useFetchState("")

    let interval=useRef(null)

    const title = useSelector(state=> state.headTitle)
    const user = useSelector(state => state.user.user)

    // logout
    function showConfirm() {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定退出吗？',
            onOk() {
                dispatch(logout())
            },
        });
    }

    // component
    useEffect( ()=> {
        const fetchData = async() => {
            // 获取天气情况
            const result = await reqWeather()
            if(result.code === '200'){
                setIcon(result.daily[0].iconDay)
                setText(result.daily[0].textDay)
            }
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
                <span>欢迎,{user.username}</span>
                <Space className={"logout"}>
                    <Button type="primary" onClick={showConfirm}>退出</Button>
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