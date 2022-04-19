
import { useState,useEffect,forwardRef,useImperativeHandle } from 'react';
import { Select } from 'antd';
import { request } from 'umi';


const WisSelect= (props:any,ref:any) => {

    const {RequestURL,form,formatValue=()=>{},formatLabel=()=>{}}=props

    const [loading,setLoading]=useState(false);   // loading
    const [options,setOptions]=useState([]);   // 数据







    // 获取数据
    const getOptions= async()=>{
        try {
            const data = await request(RequestURL,{
                method: 'GET',
            }); 

            const _List=(data||[]).map((o:any,i:number)=>{
                return {
                    value: (formatValue && formatValue(o))||i,
                    label:(formatLabel && formatLabel(o))||""
                }
            })

            setLoading(false)
            setOptions(_List)
        } catch (error) {
            setLoading(false)
        }

    }


    // 展开
    const onDropdownVisibleChange=(active:boolean)=>{
        if(active && !options.length){
            setLoading(true)
            getOptions()
        }else{
            setLoading(false)
        }
    }

    // 选择
    const onChange=(...aaa:any)=>{
        console.log(aaa)
    }

    useEffect(() => {
        // RequestURL && getOptions()
    },[]);

    return(
        <>
            <Select 
                placeholder="请选择"
                allowClear
                loading={loading}
                options={options}
                onChange={onChange}
                onDropdownVisibleChange={onDropdownVisibleChange}
            />
        </>
    )
}


const WisSelectModule = forwardRef(WisSelect);
export default WisSelectModule;
