import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { Children } from 'react';

import Icon,{ RightSquareOutlined  } from '@ant-design/icons';
import authRequestInterceptors from './api/authRequestInterceptors'
import authResponseInterceptors from './api/authResponseInterceptors'
import errorHandler from './api/errorHandler'

import BaseLayoutHead from './layouts/BaseLayoutHead'
import WisMenu from './layouts/WisMenu'

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';


import { createFromIconfontCN } from '@ant-design/icons';

// IconFont
const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl
});

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
    const config_login=localStorage.getItem("config_login");

    // 未登录
    if(!config_login){
      history.push('/user/login');
    }

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
    headerContentRender:()=>{
      return <BaseLayoutHead />
    },
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
        return WisMenu;

      },
    },
    menuItemRender: (menuItemProps, defaultDom) => {

      if (
        menuItemProps.isUrl || !menuItemProps.path) {
        return defaultDom;
      }
      // 支持二级菜单显示icon
      return (
        <Link to={menuItemProps.path}>
            <>
              { (menuItemProps.pro_layout_parentKeys && menuItemProps.pro_layout_parentKeys.length > 0) ? 
                <IconFont type={String(menuItemProps.icon)} />
                :
                <></>
              }
              {defaultDom}
            </>
          </Link>
      )
    },  
    // menuDataRender:(menuData)=>{
    //   return menuData.map((item) => {
    //     return {
    //       ...item,
    //       icon:<Icon component={RightSquareOutlined} />
    //     };
    //   });
    // },
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    links: isDev
      ? [
          // <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          //   <LinkOutlined />
          //   <span>OpenAPI 文档</span>
          // </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>开发文档</span>
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


export const request: any = {
  errorHandler,
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authRequestInterceptors],
  responseInterceptors:[authResponseInterceptors],
};
