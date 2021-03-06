import React from 'react'
import {Button, Row, Col} from 'antd'
import './not-found.less'
import {useNavigate} from "react-router-dom";
/*
前台404页面
 */
const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Row className='not-found'>
            <Col span={12} className='left' />
            <Col span={12} className='right'>
                <h1>404</h1>
                <h2>抱歉，你访问的页面不存在</h2>
                <div>
                    <Button type='primary' onClick={() => navigate("/home")}>
                        回到首页
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default NotFound