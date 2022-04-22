import { useRef,forwardRef } from 'react';

import PageSearch from "./search"   // 列表 查询头
import PageList from "./list"   // 列表页
import PageEdit from "./edit"   // 编辑页
import PageUserDetail from "./userDetail"   // 查看关联用户



const Index= () => {

  const listRef = useRef(null);  // 列表
  const editRef = useRef(null);  // 编辑
  const userDetailRef = useRef(null);  // 查看 关联用户

  

  // 打开 编辑
  const onOpenEdit=(options)=>{
    editRef.current.onChangeDrawer(options)
  }


  // 打开 关联用户
  const onOpenUserDetail=(options)=>{
    userDetailRef.current.onChangeDrawer(options)
  }
  

  // 刷新 table
  const onUpdateTable=(options={})=>{
    listRef.current.onUpdateTable(options)
  }



  return (
    <>
      <PageSearch onUpdateTable={onUpdateTable} />
      <PageList ref={listRef} onOpenUserDetail={onOpenUserDetail} onOpenEdit={onOpenEdit}  />
      <PageEdit ref={editRef} onUpdateTable={onUpdateTable}  />
      <PageUserDetail ref={userDetailRef} />
    </>
  );
};


export default Index
