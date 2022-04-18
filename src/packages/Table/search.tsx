import { Button } from 'antd';
import { ClearOutlined,SearchOutlined } from '@ant-design/icons';
import './style.less';



export default (props:any) => {
    const {children,onReset,onSearch}=props

    // 重置
    const onResetHandle=()=>{
        onReset && onReset()
    }

    // 查询
    const onSearchHandle=()=>{
        onSearch && onSearch()
    }

    return (
        <>
            <div className='wis-table-search'>
                {children}
                <div className='button-box'>
                    <Button title='重置' onClick={onResetHandle} size='small'  icon={<ClearOutlined />} />
                    <Button title='查询' onClick={onSearchHandle} type="primary" size='small'  icon={<SearchOutlined />} />
                </div>
            </div>
        </>
    )
}