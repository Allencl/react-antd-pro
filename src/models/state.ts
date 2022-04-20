import { useState, useCallback } from 'react'


/**
 * 全局 状态管理
 */
 export default ()=>{

  
  const [loading,setLoading]=useState(false)  // lodding


  // 设置 lodding
  const setGlobalLoading = useCallback((value:boolean) => {
    setLoading(value)
  }, [])


  return {
    loading,
    setGlobalLoading,
  }
}


// export default useNumberModel