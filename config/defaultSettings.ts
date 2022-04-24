import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  "navTheme": "light",
  "primaryColor": "#1890ff",
  "layout": "side",
  "contentWidth": "Fluid",
  "fixedHeader": false,
  "fixSiderbar": true,
  "pwa": false,
  "headerHeight": 48,
  "splitMenus": false,
  "title": '西信信息',
  "iconfontUrl": '',
  "logo": "./logo.svg",
  // "logo": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",

};

export default Settings;
