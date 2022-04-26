import { useState,useEffect} from 'react';
import { request } from 'umi';
import { Cascader } from 'antd';



const WisCascader=(props:any,ref:any)=>{

    const {RequestURL,...others}=props

    const [options,setOptions]=useState([]);   // 数据

    // 获取 数据
    const onGetData=async()=>{
        try {
            const data=await request(RequestURL, {
                method: 'GET',
            });

            setOptions(data||[])
        } catch (error) {
            
        }
    }

    useEffect(() => {
        onGetData()
    },[]);

    return(
        <>
            <Cascader 
                options={options} 
                placeholder="请选择" 
                {...others}
            />
        </>
    )
}

export default WisCascader