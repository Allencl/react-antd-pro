import { useRef,useState,forwardRef,useImperativeHandle } from 'react';
import { Form,Input,InputNumber,Space,Checkbox,Drawer, Button,Row,Col,message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import {WisSelect,WisCascader} from "@/packages"   // 公共组件
import {CreateMenuTree,UpdateMenuTree} from "@/api/system/menu"  // api



const Edit= (props,ref) => {

  const {onUpdateTree}=props;


  const [visible, setVisible] = useState(false);  // show 侧栏
  const [title, setTitle] = useState('');   // 标题
  const [isTop, setIsTop] = useState(false);   // 顶层菜单

  

  const [record, setRecord] = useState({});   // 行数据
  const [form] = Form.useForm();  // 表单

  // 表单初始值
  const formInitialValues={
    menu:[],
    menuType:undefined,
    name:'',
    url:'',
    iconClass:'',
    description:'',
    sort:0,
    enabled:true
  };


  // 打开侧栏
  const onShowDrawer = (rowData,parentIds) => {

    // 编辑 设置表单值
    if(rowData){
      form.setFieldsValue({
        menu: parentIds,
        menuType:rowData.type,
        name:rowData.name,
        url:rowData.url,
        iconClass:rowData.iconClass,
        sort:Number(rowData.sort),
        description:rowData.description,
        enabled:rowData.enabled,
      })
    }

    setVisible(true);
  };


  // 关闭侧栏
  const onClose = () => {
    
    setVisible(false);

    // 重置表单
    form.setFieldsValue(formInitialValues)
  };


  // 创建
  const onCreateUser=async(json)=>{
    try {
      const response = await CreateMenuTree(json)

      message.success(`${title}成功！`)

     
      onUpdateTree()  // 刷新table
  
      onClose()
    } catch (error) {
      
    }
  }

  // 修改
  const onUpdateRole=async(json)=>{
    try {
      const response = await UpdateMenuTree({
        ...record,
        ...json
      })

      message.success(`${title}成功！`)

      // 刷新table
      onUpdateTree()
  
      onClose()
    } catch (error) {
      
    }
  }

  // 提交
  const onSubmit=async()=>{
    try {
      const formData= await form.validateFields()


      const _json={
        parentId: formData.menu?formData.menu[formData.menu.length-1]:null,
        type:formData.menuType,
        name: formData.name,
        url:formData.url,
        iconClass:formData.iconClass,
        sort: Number(formData.sort),
        description: formData.description,
        enabled: formData.enabled
      }


      // 修改 | 创建
      if( Object.keys(record).length ){
        onUpdateRole(_json)
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

      setIsTop(options.isTop?true:false)
      onShowDrawer(options.record,options._parentIds)
    }
  }));

  return (
    <>
      <Drawer 
        title={title}
        visible={visible}
        width={768}
        destroyOnClose={true}
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
          initialValues={formInitialValues}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item  name="menuType" label="菜单类型" rules={[{required:true}]}>
                <WisSelect BaseDataType="MENU_TYPE"  />
              </Form.Item>
            </Col> 

            { !isTop ? 
              <Col span={12}>
                <Form.Item name="menu" label="上级菜单">
                  <WisCascader 
                    RequestURL="/system/menu/wholeTree?name=1"
                    fieldNames={{label:'name',value:'id',children:'children'}}
                    changeOnSelect={true}
                  />
                </Form.Item>
              </Col>
              :
              <Col span={12}></Col> 
            }
 
            <Col span={12}>
              <Form.Item name="name" label="标识" rules={[{required:true}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="url" label="链接" rules={[{required:true}]}>
                <Input />
              </Form.Item>
            </Col>      
            <Col span={12}>
              <Form.Item name="iconClass" label="图标icon">
                <Input />
              </Form.Item>
            </Col>    
            <Col span={12}>
              <Form.Item name="description" label="描述">
              <Input.TextArea />
              </Form.Item>
            </Col>  
            <Col span={12}>
              <Form.Item  name="sort" label="排序">
                <InputNumber min={0}/>   
              </Form.Item>
            </Col>              
            <Col span={12}>
              <Form.Item  name="enabled" valuePropName="checked" label="是否激活">
                <Checkbox />
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