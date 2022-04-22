import { Form, Input, Button } from 'antd';
import {WisTableSearch} from "@/packages"   // 公共组件


const Search= (props) => {
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
                    <Form.Item name="name" label="角色名称">
                        <Input />
                    </Form.Item>                                     
                </Form>
            </WisTableSearch>
        </>
    );
};

export default Search;

