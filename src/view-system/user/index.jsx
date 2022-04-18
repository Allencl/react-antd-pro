import { useRef } from 'react';

import PageSearch from "./search"   // 列表 查询头
import PageList from "./list"   // 列表页
import PageEdit from "./edit"   // 编辑页


export default () => {

  const listRef = useRef(null);  // 列表

  // 刷新 table
  const onUpdateTable=(options={})=>{
    listRef.current.updateTable(options)
  }

  return (
    <>
      <PageSearch onUpdateTable={onUpdateTable} />
      <PageList ref={listRef}  />
      <PageEdit  />
    </>
  );
};
