import { useRef,useState,forwardRef,useImperativeHandle } from 'react';
import { Form,Input,Drawer,Space, Button,Row,Col } from 'antd';
import { CheckOutlined } from '@ant-design/icons';


const Edit= (props,ref) => {

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
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
        <Form form={form} autoComplete="off" layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="user" label="用户名" rules={[{required:true,message:'该项必填！'}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="姓名">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="手机号" rules={[{required:true,message:'该项必填！'}]}>
                <Input />
              </Form.Item>
            </Col>  
            <Col span={12}>
              <Form.Item name="email" label="邮箱">
                <Input />
              </Form.Item>
            </Col>                      
          </Row>                                  
        </Form>
      </Drawer>
    </>
  );
};

export default forwardRef(Edit)