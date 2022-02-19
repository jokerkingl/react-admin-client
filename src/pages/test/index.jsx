import React, {useEffect, useState} from 'react';
import useFetchState from "../../utils/useFetchState";


// 父组件中使用子组件的 ref
function Test() {
    const [count, setCount] = useState(1)
    const [flag, setFlag] = useFetchState(false)

    const update1 = ()=>{
        console.log("update1之前: " + count)
        setCount(count+1)
        console.log("update1之后: " + count)
    }
    useEffect(()=>{
        if(flag){
            console.log("setTimeout之前: " + count)
            setTimeout(()=>{
                setCount(count+1)
            }, 0)
            console.log("setTimeout之后: " + count)
            setFlag(false)
        }
    // eslint-disable-next-line
    }, [flag])


    useEffect(()=>{
        console.log("componentDidMount之前: " + count)
        setCount(count + 1)
        console.log("componentDidMount之后: " + count)
    // eslint-disable-next-line
    }, [])

    return (
        <div>
            {console.log("render()" + count)}
            <div>{count}</div>
            <button onClick={()=>update1()}>update1</button>
            <button onClick={()=>setFlag(true)}>update2</button>
            {/*<button onClick={()=>update3()}>update3</button>*/}
        </div>
    )
}

export default Test
