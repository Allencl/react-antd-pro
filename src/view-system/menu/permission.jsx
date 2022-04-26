import { useRef,useState,forwardRef,useImperativeHandle} from 'react';
import {Space,Button,Popconfirm,message,Row,Col } from 'antd';
import { CloseSquareOutlined,PlusOutlined } from '@ant-design/icons';

import {WisTable,WisSelect} from "@/packages"   // 公共组件
import {GetMenuPermission,SearchFindByUrl,CreateMenuPermission,DeletePermission} from "@/api/system/menu"  // api


const PermissionPage= (props,ref) => {

    const tableRef = useRef(null);  // table

    const [menuNodeId,setMenuNodeId] = useState(undefined);  // 菜单节点 ID
    const [selectValue,setSelectValue] = useState(undefined);  // 权限 选中值

    const [dataTable, setDataTable] = useState([]);  // Table数据
    const [dataPermission, setDataPermission] = useState([]);  // 权限数据

    


    // 权限查询
    const onSearch=async(value="")=>{
        const _value=value.trim();
        
        try {
            const _data=await SearchFindByUrl({
                url_params:{
                    url:_value
                },
            })


            setDataPermission( (_data||[]).map(o=>{
                return {value:o.id,label:`${o.name}-${o.uiType}(${o.aclPattern})`}
            }) )

        } catch (error) {
            
        }
    }

    // 获取数据
    const onGetData=async(menuID)=>{
        try {
           const data=await GetMenuPermission(menuID)  
           
           setDataTable( (data||[]).map((o,i)=>Object.assign(o,{key:i})) )
        } catch (error) {
            
        }
    }

    // 添加权限
    const onAdd= async()=>{


        if(!menuNodeId){
            message.warning('未选择菜单！');
            return
        }  

        if(!selectValue){
            message.warning('未选择权限！');
            return
        }

        try {
            await CreateMenuPermission({
                url_params:{
                    permissionIds:selectValue
                },
                url_RESTful:menuNodeId
            })

            message.success("权限添加成功！")
            onGetData(menuNodeId)

        } catch (error) {
            
        }
        
        // console.log( selectValue )
    }

    // 删除
    const onDelete=async(record)=>{
        
        try {
            await DeletePermission({
                url_params:{
                    permissionIds:record.id
                },
                url_RESTful:menuNodeId
            })

            message.success("权限删除成功！")
            onGetData(menuNodeId)
        } catch (error) {
            
        }
    }

    // 配置列
    const columns = [
        {
            title: '序号',
            dataIndex: 'key',
            align:"center",
            with:60,
            render:(text)=> text+1

        },
        {
            title: 'Name',
            dataIndex: 'name',
            with:"10%",
            ellipsis: true,

        },
        {
            title: '类型',
            dataIndex: 'uiType',
            ellipsis: true,
        },
        {
            title: 'URL',
            dataIndex: 'aclPattern',
            ellipsis: true,

        },
        {
            title: '编码',
            dataIndex: 'buttonCode',
            ellipsis: true,

        },
        {
            title: '描述',
            dataIndex: 'description',
            ellipsis: true,

        },
        {
            title: '操作',
            dataIndex:'active',
            width:100,
            render: (text,record) => {
                return(
                  <>
                    
                    <Popconfirm
                      title="确定删除?"
                      onConfirm={()=> onDelete(record) }
                    >
                      <Button size='small' type="text" title='删除' danger icon={<CloseSquareOutlined />} />
                    </Popconfirm>
                  </>
                )
              },
        }
    ];


    // 父组件调用
    useImperativeHandle(ref,() => ({
        // 刷新 table
        onUpdateTable: (menuID) => {
            if(menuID){
                onGetData(menuID)
                setMenuNodeId(menuID)
            }
        }
    }));

    return (
        <>
            <Row>
                <Col span={20}>
                    <WisSelect 
                        style={{width:'100%'}}
                        showSearch={true}
                        placeholder={"搜索权限（名称、url、编码、描述）"}
                        filterOption={false}
                        options={dataPermission}
                        onSearch={onSearch}
                        onClear={()=> setSelectValue(undefined) }
                        onSelect={(id)=> setSelectValue(id) }
                    />                    
                </Col>
                <Col span={4} style={{paddingLeft:10}}>
                    <Button onClick={onAdd} type="primary" ghost icon={<PlusOutlined />} title="添加权限" />
                </Col>
            </Row>

            <div style={{height:12}}></div>
            <WisTable 
                ref={tableRef}
                TableData={dataTable}
                columns={columns} 
                HidePagination={true}
                scroll={{ y: 300 }}
            />
        </>
    );
};



const PermissionPageMoudle = forwardRef(PermissionPage);
export default PermissionPageMoudle;
