import { useState,useEffect } from 'react';
import { Table,Pagination } from 'antd';


  
export default (props:any) => {

  const {HTTP}=props;

  const [current,setCurrent]=useState(1);   // 页码
  const [total,setTotal]=useState(1);   // 总页数
  const [pageSize,setPageSize]=useState(10);   // 每页条数

  const [data,setData]=useState([]);   // 数据


  // 初始化
  const initFunc= async(options?: { [key: string]: any })=>{

    const {data=[],page,total,size} = await HTTP({
      url_params:{
        currentPage: options?.current || current,
        pageSize: options?.pageSize || pageSize,
      },        
    });

    setCurrent(page)
    setTotal(total)
    setPageSize(size)
    setData(data.map((o:any,i:number)=>Object.assign(o,{key:i})))

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

  // 
  const onPageSizeChange=(current:number,currentPageSize:number)=>{
    initFunc({
      current:1,
      pageSize:currentPageSize
    })
  }

  useEffect(() => {
    HTTP && initFunc()
  },[]);

  return (
    <>
      <Table 
          {...props} 
          pagination={false}
          size={"small"}
          dataSource={data} 
      />
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

    </>
  );
};