import { useRef,forwardRef,useImperativeHandle } from 'react';

import { Table, Checkbox,Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {WisTable,WisTableButton} from "@/packages"   // 公共组件
import {getUserList} from "@/api/system/user.ts"  // api
import { attachTypeApi } from 'antd/lib/message';


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
    width:100
  }
];

const list= (props,ref) => {

  const tableRef = useRef(null);  // table


  // 父组件调用
  useImperativeHandle(ref,() => ({
    // 刷新 table
    updateTable: (params) => {
      tableRef.current.update({
        current:params.current,
        formData:params.formData
      })
    }
  }));

  return (
    <>
      <WisTableButton>
        <Button type="primary" size='small' title='添加' icon={<PlusOutlined />} />
      </WisTableButton>

      <WisTable 
        ref={tableRef}
        HTTP={getUserList}
        columns={columns} 
      />
    </>
  );
};


export default forwardRef(list)