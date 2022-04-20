import { request } from 'umi';



/** 添加 */
export async function CreateUsers(formData?: { [key: string]: any }) {
  return request('/system/user/create', {
    method: 'POST',
    data: formData
  });
}


/** 修改 */
export async function UpdateUsers(formData?: { [key: string]: any }) {
  return request('/system/user/update', {
    method: 'POST',
    data: formData
  });
}


/** 绑定 权限 */
export async function UserRoleGrant(params?: { [key: string]: any }) {
  return request('/system/user/role/grant', {
    method: 'GET',
    url_params:params?.url_params,
    url_RESTful:params?.url_RESTful,
  });
}


/** 删除 */
export async function DeleteUser(userId?:number) {
  return request(`/system/user/del/${userId}`, {
    method: 'GET'
  });
}



