import { message } from 'antd';
import { history } from 'umi';


const errorHandler = (error:any,options:any) => {

    const { response,data } = error;

    if (response && response.status) {
        // console.log(response)
        // console.log(response.status)

        
        switch (response.status) {
            case 401:
                message.error("登录超时，请重新登录！")
                history.push('/user/login');

                break;
        
            default:
                message.error(`服务器错误：[${response.status}] ${data.message}`)
                break;
        }

        
    }
  
    if (!response) {
        message.error("网络异常！")
    }

    throw error;
  };
  
export default errorHandler