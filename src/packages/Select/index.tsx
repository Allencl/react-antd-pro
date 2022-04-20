
import { useState,useEffect,useCallback} from 'react';
import { Select } from 'antd';
import { request } from 'umi';

import BaseDataJSON from './database.json'

const WisSelect= (props:any,ref:any) => {

    const {BaseDataType,RequestURL,name,form,formatValue=()=>{},formatLabel=()=>{},...others}=props


    const [loading,setLoading]=useState(false);   // loading
    const [options,setOptions]=useState([]);   // 数据


    // 获取远程数据
    const getOptions= async()=>{
        try {
            setLoading(true)

            const data = await request(RequestURL,{
                method: 'GET',
            }); 

            const _List=(data||[]).map((o:any,i:number)=>{
                return {
                    value: (formatValue && formatValue(o))||i,
                    label:(formatLabel && formatLabel(o))||"",
                    _options:o
                }
            })

            setLoading(false)
            setOptions(_List)
        } catch (error) {
            setLoading(false)
        }

    }

    // 获取 数据字典
    const onGetBaseData=()=>{
        setLoading(true)
        setOptions(BaseDataJSON[BaseDataType]||[])
        setLoading(false)
    }

    // 展开
    const onDropdownVisibleChange=(active:boolean)=>{
        if(active && !options.length){
            BaseDataType?onGetBaseData(): getOptions()
        }else{
            setLoading(false)
        }
    }


    useEffect(() => {
        // console.log(333)
    },[]);

    return(
        <>
            <Select 
                {...others}
                
                placeholder="请选择"
                allowClear
                loading={loading}
                options={options}
                onDropdownVisibleChange={onDropdownVisibleChange}
            />
        </>
    )
}



export default WisSelect;
