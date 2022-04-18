import { useState,useEffect } from 'react';
import { Table,Pagination } from 'antd';



  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  
  export default (props:any) => {

    const [page,setPage]=useState(1);   // 页码
    const [total,setTotal]=useState(1);   // 总页数
    const [pageSize,setPageSize]=useState(10);   // 每页条数


    // console.log(props)

    // 分页
    const onPageChange=(page:number, pageSize:number)=>{
        console.log(page)
        console.log(pageSize)
    }

    useEffect(() => {

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
                current={page}
                total={total} 
                pageSize={pageSize}

                onChange={onPageChange}
                size="small" 
                showSizeChanger 
                showQuickJumper 
            />
        </div>

      </>
    );
  };