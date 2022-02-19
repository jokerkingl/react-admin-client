import React, {useEffect} from 'react';
// antd
import {Card, Form, Input, InputNumber, Cascader, Button, Upload, message} from "antd"
import {ArrowLeftOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons";
// useState
import useFetchState from "../../utils/useFetchState";
// react-router-dom
import { useLocation, useNavigate } from "react-router-dom";
// api
import { reqCategories, reqRemoveImg } from "../../api";

const { Item } = Form
const { TextArea } = Input;

const AddUpdate = () => {
    const BAST_IMG_URL = "http://localhost:3000"

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
    // 设置 image loading
    const [loading] = useFetchState("")
    const [fileList, setFileList] = useFetchState(
       product.imgs.map((img, index)=>({
           uid: -index,
           name: img,
           status: "done",
           url: BAST_IMG_URL + img
       }))
    );
    const [uploadButton, setUploadButton] = useFetchState("")

    // 表单提交
    const onFinish = (values) => {
        console.log(values)
        console.log(fileList.map(file=>file.name))
    }

    // 图片 onChange
    const onChange = async ({ fileList: newFileList, file }) => {
        if(file.status === "done"){
            const result = file.response
            if(result.status===0){
                message.success("上传图片成功").then()
                const {url, name} = result.data
                file = newFileList[newFileList.length-1]
                file.name = name
                file.url = url
            }else {
                message.error("上传图片失败").then()
            }
        }
        else if(file.status === "removed"){
            const result = await reqRemoveImg(file.name)
            console.log(result)
            if(result.status===0){
                message.success("删除成功").then()
            }
            else{
                message.error("删除失败").then()
            }
        }
        setFileList(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const getCategories = async (parentId)=>{
        const result = await reqCategories(parentId)
        if(result.status===0){
            return result.data
        }
        else{
            message.error("请求错误")
        }
    }

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

        setUploadButton(
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Card title={title} className={"card-addUpdate"}>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 19, offset: 1}}
                    name="register"
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
                        <Input/>
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

                    <Item
                        name="img"
                        label="商品图片"
                        rules={[
                            {
                                required: true,
                                message: 'Please upload product image!',
                            },
                        ]}
                    >
                        <Upload
                            action="/manage/img/upload"
                            accept={"image/*"}
                            listType="picture-card"
                            fileList={fileList}
                            name={"image"}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 5 && (
                                uploadButton
                            )}
                        </Upload>
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