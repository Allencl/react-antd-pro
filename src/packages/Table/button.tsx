import { Space } from 'antd';
import './style.less';


export default (props:any) => {

    return(
        <>
            <Space className='wis-table-button'>
                {props.children}
            </Space>
        </>
    );
}