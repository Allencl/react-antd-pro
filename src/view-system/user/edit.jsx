import { useRef,useState,forwardRef,useImperativeHandle } from 'react';
import { Form,Input,Drawer,Space,Checkbox, Button,Row,Col } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import {WisSelect} from "@/packages"   // 公共组件



const Edit= (props,ref) => {



  const [visible, setVisible] = useState(false);  // show 侧栏
  const [title, setTitle] = useState('');   // 标题

  const [form] = Form.useForm();  // 表单


  // 打开侧栏
  const showDrawer = () => {
    setVisible(true);
  };


  // 关闭侧栏
  const onClose = () => {
    form.resetFields() // 重置表单
    setVisible(false);
  };


  // 提交
  const onSubmit=async()=>{
    const formData= await form.validateFields()
    console.log(formData)
  }

  // 父组件调用
  useImperativeHandle(ref,() => ({
    // 切换侧栏
    onChangeDrawer: (options={}) => {
      console.log(options)  

      setTitle(options.title)
      showDrawer()
    }
  }));

  return (
    <>
      <Drawer 
        title={title}
        visible={visible}
        width={768}
        onClose={onClose} 
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
          initialValues={{state:true}}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="user" label="用户名" rules={[{required:true}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="姓名">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="手机号" rules={[{required:true}]}>
                <Input />
              </Form.Item>
            </Col>  
            <Col span={12}>
              <Form.Item name="email" label="邮箱">
                <Input />
              </Form.Item>
            </Col>    
            <Col span={12}>
              <Form.Item  name="state" valuePropName="checked" label="激活">
                <Checkbox />
              </Form.Item>
            </Col>    
            <Col span={12}>
              <Form.Item  name="permission" label="角色授权" >
                <WisSelect 
                  RequestURL="/system/role/findByNameLikeOrderByName?name="
                  formatValue={o=>o.id}
                  formatLabel={o=>o.name}
                  mode="multiple"
                />
              </Form.Item>
            </Col>  
                        
          </Row>                                  
        </Form> 
      </Drawer>
    </>
  );
};

const EditForm = forwardRef(Edit);
export default EditForm;