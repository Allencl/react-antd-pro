import { ConfigProvider,Spin } from 'antd';

import { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'


const LayoutApp = ({children}:any) => {

    const loadingValue = useSelector((state: RootState) => state.loading.value)


    // 全局表单
    const validateMessages = {
        required: "*${label}* 是必选字段！",
    };

    return (
        <>  
            <Spin spinning={loadingValue} delay={100}>
                <ConfigProvider form={{ validateMessages }}>
                    {children}
                </ConfigProvider>
            </Spin>
        </>
    )
};
export default LayoutApp;