import { useRef,useState,forwardRef,useImperativeHandle } from 'react';
import { Form,Input,Drawer,Space,Checkbox, Button,Row,Col,message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import {WisSelect} from "@/packages"   // 公共组件
import {CreateUsers,UpdateUsers,UserRoleGrant} from "@/api/system/user"  // api


const Edit= (props,ref) => {

  const [visible, setVisible] = useState(false);  // show 侧栏
  const [title, setTitle] = useState('');   // 标题

  const [record, setRecord] = useState({});   // 行数据
  const [form] = Form.useForm();  // 表单

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
    }

    setVisible(true);
  };


  // 关闭侧栏
  const onClose = () => {
    form.resetFields() // 重置表单
    setVisible(false);
  };

  // 绑定权限
  const onuserRoleGrant= async(response,formData)=>{
    await UserRoleGrant({
      url_RESTful:`/${response.id}`,
      url_params:{
        roleIds:formData.authorityValues.join(),
      },      
    })

    message.success(`${title}成功！`)

    // 刷新table
    onUpdateTable({current:1,})

    onClose()
  }

  // 创建
  const onCreateUser=async(json)=>{
    try {
      const response = await CreateUsers(json)

      onuserRoleGrant(response,json)
    } catch (error) {
      
    }
  }

    // 修改
    const onUpdateUsers=async(json)=>{
      try {
        const response = await UpdateUsers({
          ...record,
          ...json
        })
  
        onuserRoleGrant(response,json)
      } catch (error) {
        
      }
    }

  // 提交
  const onSubmit=async()=>{
    try {
      const formData= await form.validateFields()

      const _json={
        username: formData.user,
        fullName: formData.name,
        mobile: formData.phone,
        email: formData.email,
        enabled: formData.state,
        authorityValues: formData.permission
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
            {/* { form.getFieldValue("BUTTON") =="BUTTON" ?
              <Col span={12}>
                <Form.Item name="buttonCode" label="按钮编码" rules={[{required:true}]}>
                  <Input />
                </Form.Item>
              </Col> 
              :<></>
            } */}
          </Row>                                  
        </Form> 
      </Drawer>
    </>
  );
};

const EditForm = forwardRef(Edit);
export default EditForm;