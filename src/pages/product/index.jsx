import React from "react"
import {Routes, Route} from "react-router-dom"
import Home from "./home"
import Detail from "./detail";
import AddUpdate from "./addupdate";
import "./product.less"

const Product = () => {
    return (
        <div style={{height: '100%'}}>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/addUpdate"} element={<AddUpdate />} />
                <Route path={"/detail"} element={<Detail />} />
            </Routes>
        </div>
    )
}

export default Product