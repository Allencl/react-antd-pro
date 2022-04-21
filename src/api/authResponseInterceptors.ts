
// http 响应 拦截器
const authResponseInterceptors = (response: any, options: any) => {
    const {method}=options

    if( ["POST","GET"].includes(method) ){
        return response 
    }

    return undefined
};

export default authResponseInterceptors;
