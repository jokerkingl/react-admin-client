import React, { useEffect } from "react"
// antd
import { Card, Table, Modal, Button, message } from "antd";
// utils
import { formatDate } from "../../utils/dateUtils";
// api
import { reqUserList, reqRemoveUser } from "../../api";
// useState
import useFetchState from "../../utils/useFetchState";
// css
import "./user.less"
// component
import UserAddUpdate from "./userAddUpdate";

const User = () => {
    const [isShow, setIsShow] = useFetchState(false)
    const [isUserRemove, setIsUserRemove] = useFetchState(false)
    const [selectUser, setSelectUser] = useFetchState("")
    const [flag, setFlag] = useFetchState(false)
    const title = (
        <Button type={"primary"} onClick={() => {
            setIsShow(true)
            setSelectUser(null)
        }}>创建用户</Button>
    )
    const columns = [
        {
            title: "用户名",
            dataIndex: "username"
        },
        {
            title: "邮箱",
            dataIndex: "email"
        },
        {
            title: "电话",
            dataIndex: "phone"
        },
        {
            title: "注册时间",
            render: (item)=>(
                <span>{formatDate(item.create_time)}</span>
            )
        },
        {
            title: "所属角色",
            dataIndex: "roleName",
            align: "center"
        },
        {
            width: 200,
            title: "操作",
            render: (item)=>(
                <div className="button-group">
                    <span className="button-update" onClick={()=>{
                        setSelectUser(item)
                        setIsShow(true)
                    }}>修改</span>
                    <span className="button-remove" onClick={()=>{
                        setSelectUser(item._id)
                        setIsUserRemove(true)
                    }}>删除</span>
                </div>
            ),
            align: "center"
        }
    ]

    const [data, setData] = useFetchState([])
    const [roles, setRoles] = useFetchState([])

    const removeUser = ()=>{
        const fetchData = async ()=>{
            const result = await reqRemoveUser(selectUser)
            if(result.status===0){
                message.success("删除成功")
                setFlag(true)
                setIsUserRemove(false)
                setSelectUser("")
            }
            else{
                message.error("删除失败 请重试或检查网络设置")
            }
        }

        fetchData().then()
    }

    useEffect(()=>{
        const fetchData = async()=>{
            const result = await reqUserList()
            if(result.status === 0){
                const {users, roles} = result.data
                users.map(user=>user.roleName = roles.find(role=>role._id===user.role_id).name)
                setData(users)
                setRoles(roles)
            }
            else{
                message.error("获取用户列表失败 请重试或检查网络设置").then()
            }
        }

        fetchData().then()
        setFlag(false)
    // eslint-disable-next-line
    }, [flag])

    return (
        <>
            <Card title={title}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={"_id"}
                />
            </Card>

            <UserAddUpdate roles={roles} visible={isShow} setFlag={()=>{setFlag(true)}} onCancel={()=>{setIsShow(false)}} selectUser={selectUser||{}}/>

            <Modal title={"删除用户"} visible={isUserRemove} onOk={()=>{removeUser()}} onCancel={()=>{setIsUserRemove(false)}}>
                <span>确定删除用户？</span>
            </Modal>
        </>
    )
}

export default User