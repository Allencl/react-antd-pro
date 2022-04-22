import { useState,useEffect,forwardRef,useImperativeHandle } from 'react';
import { Table,Pagination } from 'antd';
import { request } from 'umi';




  
const WisTable= (props:any,ref:any) => {

  
  const [loading,setLoading]=useState(false);   // 加载


  const [current,setCurrent]=useState(1);   // 页码
  const [total,setTotal]=useState(1);   // 总页数
  const [pageSize,setPageSize]=useState(10);   // 每页条数
  const [data,setData]=useState([]);   // 数据

  const {RequestURL,TableData,HidePagination,...others}=props;


  // 初始化
  const initFunc= async(options?: { [key: string]: any })=>{
    setLoading(true)

    try {
      const {data=[],page,total,size} = await request(RequestURL,{
        method: 'POST',
        data:{
          currentPage: options?.current || current,
          pageSize: options?.pageSize || pageSize,
          ...options?.formData
        },   
        hideLoading:true    
      });

      setCurrent(page)
      setTotal(total)
      setPageSize(size)
      setData(data.map((o:any,i:number)=>Object.assign(o,{key:i})))
    
    } catch (error) {
    }

    setLoading(false)
  }

  // 分页
  const onPageChange=(current:number,currentPageSize:number)=>{
    if(pageSize==currentPageSize){
      initFunc({
        current:current,
        pageSize:pageSize
      })
    }
  }

  // 每页条数
  const onPageSizeChange=(current:number,currentPageSize:number)=>{
    initFunc({
      current:1,
      pageSize:currentPageSize
    })
  }

  useEffect(() => {
    RequestURL && !TableData && initFunc()
  },[]);

  // 父组件调用
  useImperativeHandle(ref,() => ({
    onUpdate: (options:any) => {
      initFunc(options)
    }
  }));

  return (
    <>
      <Table 
          {...others} 
          loading={loading}
          pagination={false}
          size={"small"}
          dataSource={TableData||data} 
      />
      { !HidePagination ?
        <div style={{padding:12,background:'#fff'}}>
          <Pagination 
              current={current}
              total={total} 
              pageSize={pageSize}

              onChange={onPageChange}
              onShowSizeChange={onPageSizeChange}	
              size="small" 
              showTotal={total => `共 ${total} 条`}
              showSizeChanger 
              showQuickJumper 
          />
        </div>
        :<></>
      }

    </>
  );
};


const WisTableModule = forwardRef(WisTable);
export default WisTableModule;

