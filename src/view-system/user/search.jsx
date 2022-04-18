import { Form, Input, Button, Select } from 'antd';
import {WisTableSearch} from "@/packages"   // 公共组件


export default (props) => {
    const {onUpdateTable}=props;
    const [form] = Form.useForm();


    // 重置
    const onReset=()=>{
        form.resetFields()

        // 刷新table
        onUpdateTable({
            current:1,
        })
    }

    // 查询
    const onSearch= async()=>{
        const formData= await form.validateFields()

        // 刷新table
        onUpdateTable({
            current:1,
            formData:formData
        })
    }

    return (
        <>
            <WisTableSearch onReset={onReset} onSearch={onSearch}>
                <Form form={form} autoComplete="off" layout="inline">
                    <Form.Item
                        name="username"
                        label="用户名"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        label="姓名"
                    >
                        <Input />
                    </Form.Item>                                        
                </Form>
            </WisTableSearch>
        </>
    );
};
