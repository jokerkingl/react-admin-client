import React, {useEffect, useRef} from "react"
// useState
import useFetchState from "../../utils/useFetchState";
// antd
import { Button, Card, message, Table, Modal, Input } from "antd";
// style
import "./role.less"
// utils
import { formatDate } from "../../utils/dateUtils";
// api
import { reqRoleList, reqAddRole, reqRemoveRole, reqUpdateRole } from "../../api";
// component
import AuthForm from "./auth_form";
// redux
import {useSelector} from "react-redux";

const Role = ()=>{
    const [selectRole, setSelectRole] = useFetchState("")
    const [title, setTitle] = useFetchState("")
    const [columns] = useFetchState([
        {
            title: "角色名称",
            dataIndex: "name",
            align: "center",
        },
        {
            title: "创建时间",
            render: item => (
                <span>
                    {formatDate(item.create_time)}
                </span>
            ),
            align: "center",
        },
        {
            title: "授权时间",
            render: item => (
                <span>
                    {formatDate(item.auth_time)}
                </span>
            ),
            align: "center",
        },
        {
            title: "授权人",
            dataIndex: "auth_name",
            align: "center",
        }
    ])
    const [roles, setRoles] = useFetchState([])
    const [loading, setLoading] = useFetchState(false)

    const [isAddRole, setIsAddRole] = useFetchState(false)
    const [isUpdateRole, setIsUpdateRole] = useFetchState(false)
    const [isRemoveRole, setIsRemoveRole] = useFetchState(false)

    const [roleName, setRoleName] = useFetchState("")
    // 刷新标志位
    const [flag, setFlag] = useFetchState(false)

    const checkedKeys = useRef()

    const user = useSelector(state => state.user.user)

    const onRow = role=>{
        return {
            onClick: ()=> {
                setSelectRole(role)
            }
        }
    }

    const addRole = ()=>{
        const fetchData = async ()=>{
            if(roleName){
                const result = await reqAddRole(roleName)
                if(result.status === 0){
                    message.success("添加成功")
                    setIsAddRole(false)
                    setRoleName("")
                    setFlag(true)
                }
                else{
                    message.error("添加失败 请重试或检查网络")
                }

            }
            else{
                message.error("请输入添加角色名").then()
            }
        }
        fetchData().then()
    }

    const updateRole = () => {
        const fetchData = async () => {
            selectRole.menus = checkedKeys.current.getCheckedKeys()
            selectRole.auth_name = user.username
            const result = await reqUpdateRole(selectRole)
            if(result.status === 0){
                message.success("更新成功")
                setIsUpdateRole(false)
                setFlag(true)
            }
            else {
                message.error("更新失败 请重试或检查网络设置")
            }
        }

        fetchData().then()
    }

    const removeRole = () => {
        const fetchData = async ()=>{
            const result = await reqRemoveRole(selectRole._id)
            if(result.status===0){
                message.success("删除成功")
                setIsRemoveRole(false)
                setFlag(true)
            }
            else{
                message.error("删除失败，请重试或检查网络")
            }
        }
        fetchData().then()
    }

    // setTitle
    useEffect(()=>{
        setTitle(
            <>
                <Button type="primary" onClick={()=>{setIsAddRole(true)}} >创建角色</Button>
                <Button type="primary" disabled={!selectRole._id} onClick={()=>{setIsUpdateRole(true)}} style={{margin: "0 20px"}}>设置角色权限</Button>
                <Button type='primary' disabled={!selectRole._id} onClick={()=>{setIsRemoveRole(true)}}>删除角色</Button>
            </>
        )
    // eslint-disable-next-line
    }, [selectRole])

    // setRoles 获取用户列表
    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)
            const result = await reqRoleList()
            if(result.status === 0){
                setRoles(result.data)
            }
            else{
                message.error("获取用户列表失败 请刷新重试")
            }
            setLoading(false)
        }
        fetchData().then()
        setFlag(false)
    // eslint-disable-next-line
    }, [flag])

    return (
        <>
            <Card title={title} className={"card"} >
                <Table
                    className={"table"}
                    columns={columns}
                    dataSource={roles}
                    loading={loading}
                    bordered
                    rowKey={"_id"}
                    pagination={{defaultPageSize: 9, showQuickJumper: true}}
                    rowSelection={{
                        type: "radio",
                        selectedRowKeys: [selectRole._id],
                        onSelect: role=>setSelectRole(role)
                    }}
                    onRow={onRow}
                />
            </Card>

            <Modal title="添加角色" visible={isAddRole} onOk={()=>{addRole()}} onCancel={()=>{setIsAddRole(false)}} className={"addRoleModal"} >
                <span className={"addRoleModal-title"}>角色名称： </span>
                <Input type="text" onChange={(e)=>{setRoleName(e.target.value)}} value={roleName} placeholder={"请输入角色名称"} className={"addRoleModal-input"} />
            </Modal>
            <Modal title="更新角色权限" visible={isUpdateRole} onOk={()=>{updateRole()}} onCancel={()=>{setIsUpdateRole(false)}}>
                <AuthForm role={selectRole} ref={checkedKeys} />
            </Modal>
            <Modal title={"删除角色"} visible={isRemoveRole} onOk={()=>{removeRole()}} onCancel={()=>setIsRemoveRole(false)}>
                <span style={{color:"red"}}>是否确定删除</span>
            </Modal>
        </>
    )
}

export default Role