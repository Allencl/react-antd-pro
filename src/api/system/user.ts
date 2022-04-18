import { request } from 'umi';

/* 获取列表 */
export async function getUserList(params?: { [key: string]: any }) {
  return request('/system/user/list', {
    method: 'POST',
    url_params:params?.url_params,
    data: params?.payload,
  });
}
