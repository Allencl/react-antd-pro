import { useRef,useState,forwardRef,useImperativeHandle } from 'react';
import { Table, Checkbox,Button,message,Popconfirm } from 'antd';
import { PlusOutlined,FormOutlined,CloseSquareOutlined } from '@ant-design/icons';

import {WisTable,WisTableButton} from "@/packages"   // 公共组件
import {DeleteUser} from "@/api/system/user"  // api


const List= (props,ref) => {

  const tableRef = useRef(null);  // table

  const {onOpenEdit}=props

  // 添加 | 修改
  const onEdit=(options)=>{
    onOpenEdit && onOpenEdit(options)
  }

  // 删除
  const onDelete= async(record)=>{
    try {
      await DeleteUser(record.id)
      message.success("删除成功！")

      tableRef.current.onUpdate()  // 刷新table
    } catch (error) {
      
    }
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
            
            <Popconfirm
              title="确定删除?"
              onConfirm={()=> onDelete(record) }
            >
              <Button size='small' type="text" title='删除' danger icon={<CloseSquareOutlined />} />
            </Popconfirm>
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