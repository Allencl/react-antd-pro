import { request } from 'umi';



/** 添加 */
export async function CreatePermission(formData?: { [key: string]: any }) {
  return request('/system/permission/create', {
    method: 'POST',
    data: formData
  });
}


/** 修改 */
export async function UpdatePermission(formData?: { [key: string]: any }) {
  return request('/system/permission/update', {
    method: 'POST',
    data: formData
  });
}



/** 删除 */
export async function DeletePermission(permissionId?:number) {
    return request(`/system/permission/del/${permissionId}`,{
        method: 'GET'
    });
}