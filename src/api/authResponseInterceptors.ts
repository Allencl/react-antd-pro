import { store } from '@/store'
import { changeLoading } from '@/store/loadingSlice'

// http 响应 拦截器
const authResponseInterceptors = (response: any, options: any) => {

    store.dispatch(changeLoading(false))  // loading

    const {method}=options

    if( ["POST","GET"].includes(method) ){
        return response 
    }

    return undefined
};

export default authResponseInterceptors;
