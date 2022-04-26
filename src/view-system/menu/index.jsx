import { useRef} from 'react';
import {Space,Button,message,Row,Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';




import PageTree from "./tree"   // tree
import PagePermission from "./permission"   // 权限
import PageEdit from "./edit"   // 编辑页



const Index= () => {

  const treeRef = useRef(null);  // 树
  const permissionRef = useRef(null);  // 权限列表
  const editRef = useRef(null);  // 编辑

  // 添加 编辑
  const onEdit=(options)=>{
    editRef.current.onChangeDrawer(options)
  }

  // 选中 树节点
  const onSelectTree=(menuID)=>{
    permissionRef.current.onUpdateTable(menuID)
  }

  // 更新 树
  const onUpdateTree=()=>{
    treeRef.current.onUpdate()
  }

  return (
    <>
      <Space>
        <Button onClick={()=>onEdit({title:"添加顶层菜单",isTop:true})} size='small' title='添加顶层菜单' icon={<PlusOutlined />}>添加顶层菜单</Button>
      </Space>
      <div style={{height:18}}></div>


      <Row gutter={16}>
        <Col span={12}>
          <PageTree ref={treeRef} onEdit={onEdit} onSelectTree={onSelectTree} />
        </Col>
        <Col span={12}>
          <PagePermission ref={permissionRef} />
        </Col>        
      </Row>
      <PageEdit ref={editRef} onUpdateTree={onUpdateTree} />

    </>
  );
};


export default Index
