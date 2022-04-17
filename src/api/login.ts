import { request } from 'umi';

/* 登录 */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request('/login', {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
