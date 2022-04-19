import { useRef,forwardRef } from 'react';

import PageSearch from "./search"   // 列表 查询头
import PageList from "./list"   // 列表页
import PageEdit from "./edit"   // 编辑页


const Index= () => {

  const listRef = useRef(null);  // 列表
  const editRef = useRef(null);  // 编辑


  // 编辑
  const onOpenEdit=(options)=>{
    editRef.current.onChangeDrawer(options)
  }

  // 刷新 table
  const onUpdateTable=(options={})=>{
    listRef.current.onUpdateTable(options)
  }



  return (
    <>
      <PageSearch onUpdateTable={onUpdateTable} />
      <PageList ref={listRef} onOpenEdit={onOpenEdit}  />
      <PageEdit ref={editRef}  />
    </>
  );
};


export default Index
