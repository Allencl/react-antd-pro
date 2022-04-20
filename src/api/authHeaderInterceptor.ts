
// http 请求 拦截器
const authHeaderInterceptor = (url: string, options: any) => {
  
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
      url: `http://58.34.47.130:22780/wisapi${url}${_paramsRESTful}${_parmasURL}`,
      options: { ...options,data:options?.data||{}, interceptors: true, headers: authHeader },
    };
};

export default authHeaderInterceptor;
