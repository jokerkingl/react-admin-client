1. 高阶函数
   1. 一类特别的函数
      1. 接收函数类型的参数
      2. 返回值是函数
   2. 常见
      1. 定时器 setTimeout()/setInterval()
      2. Promise: Promise(()=>{}) then(value=>{}, reason=>{})
      3. 数组遍历相关的方法： forEach()/filter()/map()/reduce()/find()/findIndex()
      4. 函数对象的bind()
   3. 高阶函数更新动态，更加具有扩展性
2. 高阶组件
   1. 本质就是一个函数
   2. 接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件回想被包装组件传入特点属性
   3. 作用：扩展组件的功能