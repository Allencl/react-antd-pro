import { request } from 'umi';



/** 获取 树 */
export async function GetMenuTree(params?: { [key: string]: any }) {
    return request('/system/menu/wholeTree', {
      method: 'GET',
      url_params:params?.url_params,
    });
}

/** 添加 树节点 */
export async function CreateMenuTree(formData?: { [key: string]: any }) {
  return request('/system/menu/create', {
    method: 'POST',
    data: formData
  });
}

/** 修改 树节点 */
export async function UpdateMenuTree(formData?: { [key: string]: any }) {
  return request('/system/menu/update', {
    method: 'POST',
    data: formData
  });
}

// 删除 树节点
export async function DeleteMenuTree(menuID:Number) {
  return request(`/system/menu/del/${menuID}`, {
    method: 'GET'
  });
}








// 获取 菜单的 权限
export async function GetMenuPermission(menuID:Number) {
    return request(`/system/menu/permission/${menuID}`, {
      method: 'GET'
    });
}

// 查询 权限
export async function SearchFindByUrl(params?: { [key: string]: any }) {
  return request('/system/permission/findByUrl', {
    method: 'GET',
    url_params:params?.url_params
  });
}

// 添加 菜单 权限
export async function CreateMenuPermission(params?: { [key: string]: any }) {
  return request('/system/menu/permission/grant/', {
    method: 'GET',
    url_params:params?.url_params,
    url_RESTful:params?.url_RESTful,
  });
}


// 删除 菜单  权限
export async function DeletePermission(params?: { [key: string]: any }) {
  return request('/system/menu/permission/revoke/', {
    method: 'GET',
    url_params:params?.url_params,
    url_RESTful:params?.url_RESTful,
  });
}

