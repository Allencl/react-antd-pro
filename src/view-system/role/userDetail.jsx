import { useRef,useState,forwardRef,useImperativeHandle } from 'react';
import { Form,Input,Drawer,Space,Checkbox, Button,Row,Col,message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import {WisTable} from "@/packages"   // 公共组件
import {FindUsers} from "@/api/system/role"  // api


const UserDetail= (props,ref) => {

  const [visible, setVisible] = useState(false);  // show 侧栏
  const [dataTable, setDataTable] = useState([]);  // 数据


  const tableRef = useRef(null);  // table


  // 获取数据
  const onGetData= async(record)=>{
    const list = await FindUsers(record.id)

    setDataTable( (list||[]).map((o,i)=>Object.assign(o,{key:i})) )
  }

  // 打开侧栏
  const onShowDrawer = (record) => {
    setVisible(true);
    onGetData(record)
  };


  // 关闭侧栏
  const onClose = () => {
    setVisible(false);
  };

  // 父组件调用
  useImperativeHandle(ref,() => ({
    // 切换侧栏
    onChangeDrawer: (record={}) => {
      onShowDrawer(record)
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
      dataIndex:'fullName',
    },
      {
      title: '激活',
      dataIndex:'enabled',
    },
  ];

  return (
    <>
      <Drawer 
        title={"查看关联用户"}
        visible={visible}
        width={968}
        onClose={onClose} 
      >
        <WisTable 
          ref={tableRef}
          TableData={dataTable}
          columns={columns} 
          HidePagination={true}
        />
      </Drawer>
    </>
  );
};



const UserDetailPage = forwardRef(UserDetail);
export default UserDetailPage;