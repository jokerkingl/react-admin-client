import React, {useEffect} from "react"
// antd
import { Button, Card, Select, Input, Table } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
// useState
import useFetchState from "../../utils/useFetchState";
// api
import {reqProductList, reqProductSearch, reqUpdateProductStatus} from "../../api";
import {useNavigate} from "react-router-dom";

const { Option } = Select;

const Home = () => {
    const [columns] = useFetchState([
        {
            title: "商品名称",
            dataIndex: "name",
            key: "name",
            width: 300
        },
        {
            title: "商品描述",
            dataIndex: "desc",
            key: "desc",
            width: 800
        },
        {
            title: "价格",
            dataIndex: "price",
            key: "price",
            align: "center",
            render: price=>"￥" + price
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (_, record)=>{
                const {_id, status} = record
                return (
                    <span className={"status"}>
                            <Button type={'primary'} onClick={()=>updateStatus(_id,status?0:1)}>{status?"下架":"上架"}</Button>
                            <span className={"statusText"}>{status?"在售":"已下"}</span>
                        </span>
                )
            }
        },
        {
            title: "操作",
            key: "action",
            align: "center",
            render: (product)=>{
                return (
                    <span className={"addUpdate"}>
                            <Button type={'primary'} onClick={()=>navigate("/product/detail", {state: {product}})}>详情</Button>
                            <Button type={'primary'} onClick={()=>navigate("/product/addUpdate", {state: {product}})}>修改</Button>
                        </span>
                )
            }
        },
    ]) // Table格式
    const [title, setTitle] = useFetchState("") // Card标题
    const [extra, setExtra] = useFetchState("") // Card额外内容
    const [data, setData] = useFetchState([]) // 商品数组
    const [loading, setLoading] = useFetchState(false) // 是否加载
    const [total, setTotal] = useFetchState(0) // 商品总数
    const [pageNum, setPageNum] = useFetchState(1)
    const [searchType, setSearchType] = useFetchState("productName") // 搜索类型
    const [searchText, setSearchText] = useFetchState("") // 搜索内容
    const [tempSearchText, setTempSearchText] = useFetchState("") // input框内容
    const [refresh, setRefresh] = useFetchState(false)

    const PAGE_SIZE = 2 // 默认每页数据量

    const navigate = useNavigate()

    const updateStatus = (id, status) => {
        const fetchData = async ()=>{
            await reqUpdateProductStatus(id, status)
            setRefresh(true)
        }

        fetchData().then()
    }

    useEffect(()=>{
        // Card标题
        setTitle(
            <div className={"title"}>
                <Select defaultValue="productName" className={"select"} onChange={value => {setSearchType(value)}}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input className={"searchVal"} placeholder={"关键字"} onChange={e => {setTempSearchText(e.target.value)}} />
                <Button type={"primary"}
                        className={"search"}
                        onClick={()=> {
                            setSearchText(tempSearchText)
                            setPageNum(1)
                        }} >
                    搜索
                </Button>
            </div>
        )

        // Card额外内容
        setExtra(
            <Button type={'primary'}
                    icon={<PlusOutlined />}
                    onClick={()=>navigate("/product/addUpdate", {state: {product:null}})}
            >
                添加商品
            </Button>
        )
    // eslint-disable-next-line
    }, [searchType, tempSearchText, searchText])

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)
            let result
            if(searchText){
                result = await reqProductSearch(pageNum, PAGE_SIZE, searchText, searchType)
            }
            else {
                result = await reqProductList(pageNum, PAGE_SIZE)
            }
            setTotal(result.data.total)
            setData(result.data.list)
            // console.log(tempData)
            setRefresh(false)
            setLoading(false)
        }

        fetchData().then()
        // eslint-disable-next-line
    }, [pageNum, searchText, searchType, refresh])

    return (
        <>
            <Card title={title} extra={extra} className={"card-home"}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={"_id"}
                    bordered
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        total,
                        // onChange: (num)=>setPageNum(num)
                        onChange: (num)=>setPageNum(num)
                    }}
                    loading={loading}
                />
            </Card>
        </>
    )
}

export default Home