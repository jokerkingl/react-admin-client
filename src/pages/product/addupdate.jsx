import React, {useEffect, useRef} from 'react';
// antd
import { Card, Form, Input, InputNumber, Cascader, Button, message } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons";
// useState
import useFetchState from "../../utils/useFetchState";
// react-router-dom
import { useLocation, useNavigate } from "react-router-dom";
// api
import { reqCategories, reqUpdateAddProduct } from "../../api";
// component
import PicturesWall from "./picturesWall";
import RichText from "./richText";

const { Item } = Form
const { TextArea } = Input;

const AddUpdate = () => {
    const navigate = useNavigate()
    const location = useLocation()

    // 传参
    const [product] = useFetchState(location.state.product || {})
    // 通过传参判断修改还是添加
    const [flag] = useFetchState(!!location.state.product)
    // 设置 card title
    const [title] =useFetchState(
        <span>
                <ArrowLeftOutlined className={"back"} onClick={()=>navigate("/product")}/>
                <span>{flag?"修改商品":"添加商品"}</span>
        </span>
    )
    // 设置selected option
    const [options, setOptions] =  useFetchState("")

    const editor = useRef("")
    const pictureList = useRef("")

    // 表单提交
    const onFinish = async (values) => {
        const {name, desc, price, category} = values
        const [pCategoryId, categoryId] = category
        const detail = editor.current.getDetail()
        const imgs = pictureList.current.getImgList().map(item=>item.name)
        const productSubmit = {
            name, desc, price, pCategoryId, categoryId, detail, imgs
        }
        if(flag) productSubmit._id = product._id
        // console.log(productSubmit)
        const result = await reqUpdateAddProduct(productSubmit)
        if(result.status === 0){
            message.success(`${flag?"更新":"添加"}成功`)
            console.log(result.data)
            navigate("/product")
        }else message.error(`${flag?"更新":"添加"}失败`)
    }

    const getCategories = async (parentId)=>{
        const result = await reqCategories(parentId)
        if(result.status===0){
            return result.data
        }
        else{
            message.error("请求错误")
        }
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            const pCategory = await getCategories("0")
            const tempOptions = (
                pCategory.map(item=>({
                    value: item._id,
                    label: item.name,
                    isLeaf: false
                }))
            )
            if(flag){
                const category = await getCategories(product.pCategoryId)
                const childOptions = category.map(e=>({
                    value: e._id,
                    label: e.name,
                    isLeaf: true
                }))
                const targetOption = tempOptions.find(item=>item.value === product.pCategoryId)
                targetOption.children = childOptions
            }
            setOptions(tempOptions)
        }
        fetchData().then()
    // eslint-disable-next-line
    }, [])

    const loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        const data = await getCategories(targetOption.value)
        targetOption.loading = false;
        targetOption.children = data.map(item=>({
            value: item._id,
            label: item.name,
            isLeaf: true
        }))
        setOptions([...options]);
    }

    return (
        <>
            <Card title={title} className={"card-addUpdate"}>
                <Form
                    labelCol={{span: 2}}
                    wrapperCol={{span: 12, offset: 1}}
                    name="addUpdate"
                    onFinish={onFinish}
                    scrollToFirstError
                    className={"form"}
                >
                    <Item
                        name="name"
                        label="商品名称"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product name!',
                            }
                        ]}
                        initialValue={product.name}
                    >
                        <Input placeholder={"商品名称"}/>
                    </Item>

                    <Item
                        name="desc"
                        label="商品描述"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product description!',
                            }
                        ]}
                        initialValue={product.desc}
                    >
                        <TextArea showCount maxLength={100} placeholder={"商品描述"} />
                    </Item>

                    <Item
                        name="price"
                        label="商品价格"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            }
                        ]}
                        initialValue={product.price}
                    >
                        <InputNumber min={1} addonAfter="￥" />
                    </Item>

                    <Item
                        name="category"
                        label="商品分类"
                        rules={[
                            {
                                required: true,
                                message: 'Please input select category!',
                            },
                        ]}
                        initialValue={[product.pCategoryId, product.categoryId]}
                    >
                        <Cascader
                            options={options}
                            loadData={loadData}
                        />
                    </Item>

                    <PicturesWall imgs={product.imgs} ref={pictureList} />

                    <Item label={"商品详情"} wrapperCol={{span: 21, offset: 1}}>
                        <RichText ref={editor} detail={product.detail} />
                    </Item>

                    <Item wrapperCol={{ offset: 12, span: 12 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        </>
    )
}

export default AddUpdate