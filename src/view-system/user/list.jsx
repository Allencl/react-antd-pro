import { Table, Tag, Space } from 'antd';


import {WisTable} from "@/packages"   // 公共组件
import {getUserList} from "@/api/system/user.ts"  // api


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
  },
  {
    title: '操作',
    dataIndex:'action',
    width:100
  }
];

export default () => {


  return (
    <>
      <WisTable 
        HTTP={getUserList}
        columns={columns} 
      />
    </>
  );
};
