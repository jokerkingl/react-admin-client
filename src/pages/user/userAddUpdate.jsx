import React, {forwardRef, useEffect} from "react"
// antd
import {Form, Input, Select, Modal, message} from "antd"
// api
import { reqAddUser, reqUpdateUser } from "../../api";
const {Item} = Form
const { Option } = Select

const UserAddUpdate = forwardRef((props, ref)=>{
    const {roles, visible, setFlag, onCancel, selectUser} = props
    const [form] = Form.useForm();
    const onFinish = async (value)=>{
        if(selectUser){
            const result = await reqUpdateUser({_id: selectUser._id, ...value})
            if(result.status === 0){
                message.success("更新用户成功")
                form.resetFields()
                onCancel()
                setFlag()
            }
            else{
                message.error("更新用户失败 请重试或检查网络设置")
            }
        }
        else{
            const result = await reqAddUser(value)
            if(result.status === 0){
                message.success("添加用户成功")
                form.resetFields()
                onCancel()
                setFlag()
            }
            else{
                message.error("添加用户失败 请重试或检查网络设置")
            }
        }
    }

    const onOk = () => {
        form.submit();
    };

    useEffect(()=>{
        form.resetFields()
    // eslint-disable-next-line
    }, [selectUser])

    return (
        <Modal title="添加用户" visible={visible} onOk={onOk} onCancel={onCancel}>
            <Form
                onFinish={onFinish}
                labelCol={{span: 4}}
                wrapperCol={{span: 15, offset: 1}}
                scrollToFirstError
                initialValues={selectUser}
                name={"userAdd"}
                form={form}
            >
                <Item
                    name={"username"}
                    label="用户名"
                    rules={[{required: true, message: 'Please input your name!'}]}
                >
                    <Input placeholder="请输入用户名" />
                </Item>
                {
                    JSON.stringify(selectUser)==="{}"?(
                        <Item
                            name={"password"}
                            label="密码"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >

                            <Input type={"password"} placeholder="请输入密码"/>
                        </Item>
                    ):""
                }
                <Item
                    name={"phone"}
                    label="手机号"
                    rules={[{required: true, message: 'Please input your phone!'}]}
                >
                    <Input placeholder="请输入手机号" />
                </Item>
                <Item
                    name={"email"}
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input type={"email"} placeholder="请输入邮箱" />
                </Item>
                <Item
                    name={"role_id"}
                    label="角色"
                    rules={[{required: true, message: 'Please select your role!'}]}
                >
                    <Select>
                        {
                            roles.map(item=><Option key={item._id} value={item._id}>{item.name}</Option>)
                        }
                    </Select>
                </Item>
            </Form>
        </Modal>
    )
})

export default UserAddUpdate

