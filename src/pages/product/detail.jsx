import React, {useEffect} from 'react';
// antd
import {Card, List} from "antd"
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
// useState
import useFetchState from "../../utils/useFetchState";
// react-dom-router
import {useLocation, useNavigate} from "react-router-dom";
// api
import {reqCategory} from "../../api";

const Detail = ()=>{
    const [title, setTitle] = useFetchState([])
    const [data, setData] = useFetchState([])
    const [firstName, setFirstName] = useFetchState("")
    const [lastName, setLastName] = useFetchState("")

    const location = useLocation()
    const navigate = useNavigate()

    const {name, desc, price, detail, imgs, pCategoryId, categoryId} = location.state.product

    useEffect(()=>{
        setTitle(
            <span>
                <ArrowLeftOutlined className={"back"} onClick={()=>navigate("/product")}/>
                <span>商品详情</span>
            </span>
        )
        // eslint-disable-next-line
    }, [])

    useFetchState(()=>{
        const fetchData = async()=>{
            const result = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            setFirstName(result[0].data.name)
            setLastName(result[1].data.name)
        }

        fetchData().then()
    }, [])

    useEffect(()=>{
        // console.log(location.state.product)

        setData(
            [
                (
                    <>
                        <span>商品名称：</span>
                        <p>{name}</p>
                    </>
                ),
                (
                    <>
                        <span>商品描述：</span>
                        <p>{desc}</p>
                    </>
                ),
                (
                    <>
                        <span>商品价格：</span>
                        <p>{price}元</p>
                    </>
                ),
                (
                    <>
                        <span>所属分类：</span>
                        <span>{firstName}</span>
                        <ArrowRightOutlined className={"icon"} />
                        <span>{lastName}</span>
                    </>
                ),
                (
                    <>
                        <span>商品图片：</span>
                        {imgs.map((item)=>{
                            return <img key={item} src={"http://localhost:3000/upload/" + item} alt="电脑"/>
                        })}
                    </>
                ),
                (
                    <>
                        <span>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html: detail}} />
                    </>
                )
            ]
        )
        // eslint-disable-next-line
    }, [firstName, lastName])

    return(
        <>
            <Card title={title} className={"card-detail"}>
                <List
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </Card>
        </>
    )
}

export default Detail