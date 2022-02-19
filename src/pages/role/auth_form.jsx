import React, {forwardRef, useEffect, useImperativeHandle} from 'react';
import { Tree, Form, Input } from "antd";
import menuConfig from "../../config/menuConfig";
import useFetchState from "../../utils/useFetchState";

const {Item} = Form

const AuthForm = forwardRef((props, ref)=>{
    const [treeData] = useFetchState(menuConfig)
    const [keys, setKeys] = useFetchState([])

    const onCheck = checkedKeys =>{
        setKeys(checkedKeys)
    }

    useEffect(()=>{
        setKeys(props.role.menus)
    // eslint-disable-next-line
    }, [props.role])

    useImperativeHandle(ref, ()=>({
        getCheckedKeys: ()=>{
            return keys
        }
    }))

    return (
        <div className={"auth_form"}>
            <Item label={"角色名称"}>
                <Input value={props.role.name} disabled />
            </Item>
            <Tree
                checkable
                defaultExpandAll
                checkedKeys = {keys}
                treeData={treeData}
                onCheck = {onCheck}
            />
        </div>
    )
})

export default AuthForm