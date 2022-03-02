/*
* 折线图路由
* */
import React from "react"
// antd
import {Card} from "antd";
// echarts
import ReactCharts from "echarts-for-react"

function Pie(){
    const getOptions = () => {
        return {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    return (
        <>
            <Card title="饼图">
                <ReactCharts option={getOptions()} style={{height:500, width:1600, marginTop:50}}>

                </ReactCharts>
            </Card>
        </>
    )
}

export default Pie