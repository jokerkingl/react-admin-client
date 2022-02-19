import React, {useEffect, useRef} from "react"
// antd
import {Card, Button, Table, message, Modal, Select, Input} from 'antd';
import { PlusOutlined,ArrowRightOutlined } from '@ant-design/icons';
// style
import "./category.less"
// api
import {reqCategories, reqAddCategory, reqUpdateCategories, reqDeleteCategory} from "../../api";
// setFetchState
import useFetchState from "../../utils/useFetchState";
const { Option } = Select;

function Category(){
    // state
    const parentId = useRef(0)
    const [parentName, setParentName] = useFetchState("")
    // 显示菜单
    const [data, setData] = useFetchState([])
    // 一级菜单
    const [category, setCategory] = useFetchState([])
    const [columns, setColumns] = useFetchState([])
    const [loading, setLoading] = useFetchState(false)
    const [isUpdateCategory, setIsUpdateCategory] = useFetchState(false);
    const [isAddCategory, setIsAddCategory] = useFetchState(false)
    const [isDeleteCategory, setIsDeleteCategory] = useFetchState(false)
    const [currentCategory, setCurrentCategory] = useFetchState("")
    const [selectedCategory, setSelectedCategory] = useFetchState("0")
    const [title, setTitle] = useFetchState([])
    const [updateVal, setUpdateVal] =useFetchState("")
    const [addVal, setAddVal] = useFetchState("")

    const updateCategory = async ()=>{
        if(updateVal){
            await reqUpdateCategories(currentCategory, updateVal)
            setUpdateVal("")
            setIsUpdateCategory(false)
        }
        else message.error("尚未输入").then()
    }

    const addCategory = ()=>{
        if(addVal){
            const fetchData = async ()=>{
                // console.log(addVal, selectedCategory)
                await reqAddCategory(addVal, selectedCategory)
                parentId.current = selectedCategory
                const res = category.find(item=>item._id===parentId.current)
                setParentName(res.name)
                setAddVal("")
                setIsAddCategory(false)
                }
                fetchData().then()
            }
        else message.error("尚未输入").then()
        }

    const deleteCategory = async ()=>{
        await reqDeleteCategory(currentCategory)
        setIsDeleteCategory(false)
    }

    //componentWillMount
    useEffect(()=>{
        // columns
        setColumns([
            {
                title: "Name",
                key: "name",
                dataIndex: "name",
                width: 1200,
            },
            {
                title: "Action",
                key: "action",
                width: "300",
                align: "center",
                render: (item) => (
                    <div className={"button-group"}>

                        {/*打开对话框 将当前商品id上传*/}
                        <button onClick={() => {
                            setIsUpdateCategory(true)
                            setCurrentCategory(item._id)
                        }}>修改分类</button>

                        {/*向事件传入参数 先定义一个匿名函数 再函数调用处理的函数并传入数据*/}
                        {/*将当前id name都修改 以便重新render*/}
                        {item.parentId === "0" ? <button onClick={() => {
                            parentId.current = item._id
                            setParentName(item.name)
                            setSelectedCategory(parentId.current)
                        }}>查看子分类</button> : null}

                        {/*删除当前id分类*/}
                        <button onClick={()=>{
                            setIsDeleteCategory(true)
                            setCurrentCategory(item._id)
                        }}>删除分类</button>
                    </div>
                )
            }
        ])
        // eslint-disable-next-line
        }, [])

    // componentDidMount componentUpdate
    useEffect(()=>{
        const fetchData = async ()=>{
            // 请求前显示loading
            setLoading(true)
            // 请求页表
            const result = await reqCategories(parentId.current)
            if(result.status === 0) {
                setData(result.data)
                if(parentId.current === 0){
                    setCategory(result.data)
                }
            }
            else message.error("获取页表出错")
            // 请求后隐藏loading
            setLoading(false)

            // title
            setTitle(
                <>
                    {parentId.current===0 ? <span>一级分类列表</span> : (
                        <>
                            <button onClick={() => {
                                parentId.current = 0
                                setParentName("")
                            }}>一级分类列表</button>
                            <ArrowRightOutlined />
                            <span className={"parentName"}>{parentName}</span>
                        </>
                    )}
                </>
            )
        }
        fetchData().then()
        // eslint-disable-next-line
    }, [parentId.current, isUpdateCategory, isAddCategory, isDeleteCategory])

    // card
    const extra = (
        <span>
            <Button type='primary'
                    icon={<PlusOutlined />}
                    onClick={()=>{setIsAddCategory(true)}}
            >
                添加
            </Button>
        </span>
    )

    // return
    return (
        <div className={"category"}>
            <Card title={title} extra={extra} className={"card"}>
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    bordered
                    rowKey={"_id"}
                    pagination={{defaultPageSize: 9, showQuickJumper: true}}
                />
            </Card>

            {/*修改分类*/}
            <Modal title="修改分类"
                   visible={isUpdateCategory}
                   className="modifyCategory"
                   onOk={()=>updateCategory()}
                   onCancel={()=>setIsUpdateCategory(false)}>
                <Input onChange={(e)=>setUpdateVal(e.target.value)} value={updateVal}/>
            </Modal>

            {/*添加分类*/}
            <Modal title="添加分类"
                   visible={isAddCategory}
                   className="addCategory"
                   onOk={()=>addCategory()}
                   onCancel={()=>setIsAddCategory(false)}>
                <Select
                    placeholder="选择添加分类的位置"
                    className={"select"}
                    defaultValue={parentId.current}
                    key={parentId.current}
                    onChange={(value)=>{setSelectedCategory(value)}}
                >
                    <Option value={0} key={0}>一级列表</Option>
                    {
                        category.map((item) => {
                            return <Option value={item._id} key={item._id}>{item.name}</Option>
                        })
                    }
                </Select>
                <Input onChange={(e)=>setAddVal(e.target.value)} value={addVal} />
            </Modal>

            <Modal title="删除分类" visible={isDeleteCategory} onOk={()=>deleteCategory()} onCancel={()=>setIsDeleteCategory(false)}>
                <p>确认删除吗？</p>
            </Modal>
        </div>
    )
}

export default Category