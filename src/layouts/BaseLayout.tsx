import { ConfigProvider } from 'antd';

const layout = ({ children }:any) => {

    // 全局表单
    const validateMessages = {
        required: "*${label}* 是必选字段！",
    };

    return (
        <>  
            <ConfigProvider form={{ validateMessages }}>
                {/* <h2>999222</h2> */}
                {children}
            </ConfigProvider>
        </>
    )
};
export default layout;