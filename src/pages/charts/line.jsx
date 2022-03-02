/*
* 折线图路由
* */
import React from "react"
// antd
import {Button, Card} from "antd";
// echarts
import ReactCharts from "echarts-for-react"
// useState
import {useDispatch, useSelector} from "react-redux";
import {updateSales, updateStories} from "../../redux/action";

function Line(){
    const dispatch = useDispatch()

    const sales = useSelector(state=>state.sales)
    const stories = useSelector(state=>state.stories)

    const update = ()=>{
        dispatch(updateSales(sales))
        dispatch(updateStories(stories))
    }

    const getOptions = (sales, stories) => {
        return {
            tooltip: {},
            legend: {
                data: ['销量', "库存"],
                left: 750
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            grid: {
                left: 150,
                // right: 100
            },
            series: [
                {
                    name: '销量',
                    type: 'line',
                    data: sales
                },
                {
                    name: '库存',
                    type: 'line',
                    data: stories
                }
            ]
        }
    }

    return (
        <>
            <Card title="折线图" extra={<Button type="primary" onClick={()=>update()}>更新</Button>}>
                <ReactCharts option={getOptions(sales, stories)} style={{height:500, width:1600, marginTop:50}}>

                </ReactCharts>
            </Card>
        </>
    )
}

export default Line