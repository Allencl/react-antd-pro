import { ConfigProvider,Spin } from 'antd';


const layout = ({ children }:any) => {

    // 全局表单
    const validateMessages = {
        required: "*${label}* 是必选字段！",
    };

    return (
        <>  
            <Spin spinning={!true} tip="Loading..." delay={500}>
                <ConfigProvider form={{ validateMessages }}>
                    {/* <h2>999222</h2> */}
                    {children}
                </ConfigProvider>
            </Spin>
        </>
    )
};
export default layout;