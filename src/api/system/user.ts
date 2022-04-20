import { request } from 'umi';



/** 添加 */
export async function createUsers(formData?: { [key: string]: any }) {
  return request('/system/user/create', {
    method: 'POST',
    data: formData
  });
}

