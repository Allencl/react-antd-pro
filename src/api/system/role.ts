import { request } from 'umi';



/** 添加 */
export async function CreateRole(formData?: { [key: string]: any }) {
  return request('/system/role/create', {
    method: 'POST',
    data: formData
  });
}


/** 修改 */
export async function UpdateRole(formData?: { [key: string]: any }) {
  return request('/system/role/update', {
    method: 'POST',
    data: formData
  });
}



/** 删除 */
export async function DeleteRole(roleId?:number) {
    return request(`/system/role/del/${roleId}`,{
        method: 'GET'
    });
}



/** 查看关联用户 */
export async function FindUsers(roleId?:number) {
  return request(`/system/role/findUsers/${roleId}`,{
      method: 'GET'
  });
}