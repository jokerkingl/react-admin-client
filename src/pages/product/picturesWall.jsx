import React, {forwardRef, useImperativeHandle} from "react";
import {Upload, Form, message} from "antd"
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import useFetchState from "../../utils/useFetchState";
import {reqRemoveImg} from "../../api";

const { Item } = Form

const PicturesWall = forwardRef((props, ref)=>{
    // 父组件传参 imgs
    const {imgs} = props
    // 图片基本地址
    const BAST_IMG_URL = "http://localhost:3000/upload/"
    // 设置 image loading
    const [loading] = useFetchState("")
    // 图片列表
    const [fileList, setFileList] = useFetchState(
        imgs?imgs.map((img, index)=>({
            uid: -index,
            name: img,
            status: "done",
            url: BAST_IMG_URL + img
        })):[]
    );
    // 上传按钮
    const [uploadButton] = useFetchState(
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

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
            if(result.status=== 0){
                message.success("删除成功").then()
            }
            else{
                message.error("删除失败").then()
            }
        }
        setFileList(newFileList);
    };

    // 查看图片
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        console.log(src)
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    useImperativeHandle(ref, ()=>({
        getImgList: ()=>{
            return fileList;
        }
    }))


    return (
        <Item
            name="img"
            label="商品图片"
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
                {fileList.length < 3 && (
                    uploadButton
                )}
            </Upload>
        </Item>
    )
})

export default PicturesWall;