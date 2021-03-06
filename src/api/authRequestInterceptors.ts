import { store } from '@/store'
import { changeLoading } from '@/store/loadingSlice'



// base url
const BaseURL: { [key: string]: string }={
  "dev":"http://58.34.47.130:22780/wisapi",   // 本地环境
  "prod":"http://58.34.47.130:22780/wisapi"   // 线上环境
}


// http 请求 拦截器
const authRequestInterceptors = (url: string, options: any) => {


    // loading
    (!options?.hideLoading) && store.dispatch(changeLoading(true))  

  
    const token=JSON.parse( (localStorage.getItem("config_login")||"{}")  )?.token||"";
    const authHeader = { Authorization: `Bearer ${token}` };
  
    const _bufferParmasURL=Object.entries((options["url_params"]||{}));
    let _parmasURL="";  
    let _paramsRESTful=options["url_RESTful"]||"";   // RESTful
  
    // 格式化 url
    if(_bufferParmasURL.length){
        _bufferParmasURL.map(o=>{ _parmasURL+=`${o[0]}=${o[1]}&` });
        _parmasURL=`?${_parmasURL.slice(0,_parmasURL.length-1)}`
    }
  
  
    return {
      url: `${BaseURL[REACT_APP_ENV||'dev']}${url}${_paramsRESTful}${_parmasURL}`,
      options: { ...options,data:options?.data||{}, interceptors: true, headers: authHeader },
    };
};

export default authRequestInterceptors;
