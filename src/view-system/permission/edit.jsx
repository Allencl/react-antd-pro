import { useRef,useState,forwardRef,useImperativeHandle } from 'react';
import { Form,Input,Drawer,Space,Checkbox, Button,Row,Col,message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import {WisSelect} from "@/packages"   // 公共组件
import {CreatePermission,UpdatePermission} from "@/api/system/permission"  // api


const Edit= (props,ref) => {

  const [visible, setVisible] = useState(false);  // show 侧栏
  const [title, setTitle] = useState('');   // 标题

  const [record, setRecord] = useState({});   // 行数据
  const [form] = Form.useForm();  // 表单
  const [formType, setFormType] = useState('');   // 权限类型 表单值


  const {onUpdateTable}=props

  // 打开侧栏
  const onShowDrawer = (rowData) => {

    // 编辑 设置表单值
    if(rowData){
      form.setFieldsValue({
        name:rowData.name,
        path:rowData.aclPattern,
        type:rowData.uiType,
        remark:rowData.description,
        buttonCode:rowData.buttonCode
      })

      setFormType(rowData.uiType)
    }

    setVisible(true);
  };


  // 关闭侧栏
  const onClose = () => {
    form.resetFields() // 重置表单
    setVisible(false);
  };


  // 创建
  const onCreateUser=async(json)=>{
    try {
      const response = await CreatePermission(json)
      message.success(`${title}成功！`)

      // 刷新table
      onUpdateTable({current:1,})
      onClose()
    } catch (error) {
      
    }
  }

  // 修改
  const onUpdateUsers=async(json)=>{
    try {
      const response = await UpdatePermission({
        ...record,
        ...json
      })
      message.success(`${title}成功！`)

      // 刷新table
      onUpdateTable({current:1,})
      onClose()
    } catch (error) {
      
    }
  }

  // 提交
  const onSubmit=async()=>{
    try {
      const formData= await form.validateFields()

      const _json={
        name: formData.name,
        aclPattern:formData.path,
        uiType: formData.type,
        description: formData.remark,
        buttonCode: formData.buttonCode,
      }

      // 修改 | 创建
      if( Object.keys(record).length ){
        onUpdateUsers(_json)
      }else{
        onCreateUser(_json)
      }

    } catch (error) {
      message.warning("表单不完整！")
    }

  }

  // 监听表单值 变化
  const onValuesChange=(value)=>{
    if(value?.type){
      setFormType(value.type)
    }
  }

  // 父组件调用
  useImperativeHandle(ref,() => ({
    // 切换侧栏
    onChangeDrawer: (options={}) => {
      setTitle(options.title)
      setRecord(options.record||{})

      onShowDrawer(options.record)
    }
  }));

  return (
    <>
      <Drawer 
        title={title}
        visible={visible}
        width={768}
        onClose={onClose} 
        getContainer={false}
        extra={
          <Space>
            <Button title='提交' onClick={onSubmit} icon={<CheckOutlined />} />
          </Space>
        }
      >
        <Form 
          form={form} 
          autoComplete="off" 
          layout="vertical"
          initialValues={{type:"LINK"}}
          onValuesChange={onValuesChange}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="权限名称" rules={[{required:true}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="path" label="权限路径" rules={[{required:true}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="remark" label="描述" rules={[{required:true}]}>
                <Input />
              </Form.Item>
            </Col>                
            <Col span={12}>
              <Form.Item  name="type" label="权限类型" >
                <WisSelect BaseDataType="PERMISSION_TYPE"  />
              </Form.Item>
            </Col>  
            { formType =="BUTTON" ?
              <Col span={12}>
                <Form.Item name="buttonCode" label="按钮编码" rules={[{required:true}]}>
                  <Input />
                </Form.Item>
              </Col> 
              :<></>
            }
          </Row>                                  
        </Form> 
      </Drawer>
    </>
  );
};

const EditForm = forwardRef(Edit);
export default EditForm;