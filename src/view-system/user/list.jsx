import { useRef,useState,forwardRef,useImperativeHandle } from 'react';
import { Table, Checkbox,Button } from 'antd';
import { PlusOutlined,FormOutlined,CloseSquareOutlined } from '@ant-design/icons';

import {WisTable,WisTableButton} from "@/packages"   // 公共组件


const List= (props,ref) => {

  const tableRef = useRef(null);  // table

  const {onOpenEdit}=props

  // 添加 | 修改
  const onEdit=(options)=>{
    onOpenEdit && onOpenEdit(options)
  }

  // 父组件调用
  useImperativeHandle(ref,() => ({
    // 刷新 table
    onUpdateTable: (params) => {
      tableRef.current.onUpdate({
        current:params.current,
        formData:params.formData
      })
    }
  }));


  // 配置列
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',

    },
    {
      title: '邮箱',
      dataIndex: 'email',

    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '姓名',
      dataIndex: 'fullName',
    },
    {
      title: '激活',
      dataIndex: 'enabled',
      render: text => <Checkbox checked={text} disabled />,
    },
    {
      title: '操作',
      dataIndex:'action',
      width:100,
      render: (text,record) => {
        return(
          <>
            <Button onClick={()=>onEdit({title:"修改",record:record})} size='small' type="text" title='修改' icon={<FormOutlined />} />
            <Button size='small' type="text" title='删除' danger icon={<CloseSquareOutlined />} />
          </>
        )
      },
    }
  ];

  return (
    <>
      <WisTableButton>
        <Button onClick={()=>onEdit({title:"添加"})} size='small' title='添加' icon={<PlusOutlined />} />
      </WisTableButton>

      <WisTable 
        ref={tableRef}
        RequestURL="/system/user/list"
        columns={columns} 
      />
    </>
  );
};

const ListPage = forwardRef(List);
export default ListPage;