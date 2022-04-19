import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { Children } from 'react';



const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    // try {
    //   const msg = await queryCurrentUser();
    //   return msg.data;
    // } catch (error) {
    //   history.push(loginPath);
    // }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    // footerRender: () => <Footer />,
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      // params: {
      //   userId: initialState?.currentUser?.userid,
      // },
      locale:false,
      request: async (params, defaultMenuData) => {
        // initialState.currentUser 中包含了所有用户信息
        // const menuData = await fetchMenuData();
        
        // console.log(defaultMenuData)
        return [
          {
            name:"系统管理",
            children:[
              {
                name:"用户管理",
                path:"/view-system/user",
              }
            ]
          }
        ];
      },
    },

    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

// http 拦截器
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
    url: `http://58.34.47.130:13490${url}${_paramsRESTful}${_parmasURL}`,
    options: { ...options,data:options?.data||{}, interceptors: true, headers: authHeader },
  };
};
export const request: any = {
  // errorHandler,
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authHeaderInterceptor],
};
