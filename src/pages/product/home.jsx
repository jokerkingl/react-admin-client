import React, {useEffect, useRef} from "react"
// antd
import { Button, Card, Select, Input, Table } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
// style
import "./home.less"
// useState
import useFetchState from "../../utils/useFetchState";
// api
import {reqProductList, reqProductSearch} from "../../api";

const { Option } = Select;

function Home(){
    const [columns, setColumns] = useFetchState([])
    const [data, setData] = useFetchState([]) // 商品数组
    const [loading, setLoading] = useFetchState(false) // 是否加载
    const [total, setTotal] = useFetchState(0) // 商品总数
    const [searchType, setSearchType] = useFetchState("productName") // 搜索类型
    const searchText = useRef("")
    const [tempSearchText, setTempSearchText] = useFetchState("")
    const PAGE_SIZE = 2

    const search = (num)=>{
        const fetchData = async ()=>{
            let result
            setLoading(true)
            if(searchText.current){
                result = await reqProductSearch(num, PAGE_SIZE, searchText.current, searchType)
            }
            else {
                result = await reqProductList(num, PAGE_SIZE)
            }
            setLoading(false)
            // console.log(result)
            setTotal(result.data.total)
            setData(result.data.list)
        }
        fetchData().then()
    }

    const title = (
        <div className={"title"}>
            <Select defaultValue="productName" className={"select"} onChange={value => {setSearchType(value)}}>
                <Option value="productName">按名称搜索</Option>
                <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input className={"searchVal"} placeholder={"关键字"} onChange={e => {setTempSearchText(e.target.value)}} value={tempSearchText} />
            <Button type={"primary"}
                    className={"search"}
                    onClick={()=> {
                        searchText.current = tempSearchText
                        search(1)}
                    } >搜索</Button>
        </div>
    )

    const extra = (
        <Button type={'primary'}
                icon={<PlusOutlined />}
        >
            添加商品
        </Button>
    )

    // componentDidMount
    useEffect(()=>{
        setColumns([
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
                render: status=>{
                    return (
                        <span>
                            {status===1?(
                                <span className={"status"}>
                                    <Button type={'primary'}>下架</Button>
                                    <span>在售</span>
                                </span>
                            ):(
                                <span className={"status"}>
                                    <Button type={'primary'}>上架</Button>
                                    <span>已下架</span>
                                </span>
                                )}
                        </span>
                    )
                }
            },
            {
                title: "操作",
                key: "action",
                align: "center",
                render: ()=>{
                    return (
                        <span className={"addUpdate"}>
                            <Button type={'primary'}>详情</Button>
                            <Button type={'primary'}>修改</Button>
                        </span>
                    )
                }
            },
        ])
        // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)
            const tempData = await reqProductList(1, PAGE_SIZE)
            setTotal(tempData.data.total)
            setData(tempData.data.list)
            // console.log(tempData)
            setLoading(false)
        }

        fetchData().then()
        // eslint-disable-next-line
    }, [])

    return (
        <div className={"home"}>
            <Card title={title} extra={extra} className={"card"}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={"categoryId"}
                    bordered
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        total,
                        // onChange: (num)=>setPageNum(num)
                        onChange: (num)=>search(num)
                    }}
                    loading={loading}
                />
            </Card>
        </div>
    )
}

export default Home