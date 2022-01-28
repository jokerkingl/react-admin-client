
// 应用的根组件
import React, {Component} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./App.less"
import Login from "./pages/login";
import Admin from "./pages/admin";

export default class App extends Component{
    render() {
       return (
           <BrowserRouter>
               <Routes>{/*只匹配其中一个*/}
                   <Route path="/login" element={<Login />} />
                   <Route path="/" element={<Admin />} />
               </Routes>
           </BrowserRouter>
       )
    }
}