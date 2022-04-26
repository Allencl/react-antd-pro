import { useRef,useState,useEffect,forwardRef,useImperativeHandle } from 'react';
import { Tree,Button,message,Popconfirm,Input } from 'antd';
import { PlusSquareOutlined,FormOutlined,CloseSquareOutlined,EyeFilled,SearchOutlined  } from '@ant-design/icons';


import {GetMenuTree} from "@/api/system/menu"  // api
import {DeleteMenuTree} from "@/api/system/menu"  // api



// 获取 父级 ID
const GetParentId=(list,id)=> {
  for (let i in list) {
      if(list[i].id==id){
      return [list[i]]
    }
    if(list[i].children){
      let node=GetParentId(list[i].children,id);
      if(node!==undefined){
        return node.concat(list[i])
        }
    }
  }        
}



const TreePage= (props,ref) => {

  const {onEdit,onSelectTree}=props
  const [treeData,setTreeData] = useState([]);   // 数据
  const [expandedKeys,setExpandedKeys] = useState([]);   // 展开节点
  const [searchValue,setSearchValue] = useState('');   // 查询值



  // 获取树结构
  const onGetTree=async()=>{
    try {
      const _data = await GetMenuTree({
        url_params:{
          name:"",
        }  
      })

      setTreeData(_data||[])
    } catch (error) {
      
    }
  }

  // 修改
  const onEditHandle=(record)=>{

    const parentIds = GetParentId(treeData,record.id)
    const _parentIds=parentIds.map(o=>o.id).reverse().slice(0,parentIds.length-1)

    onEdit({
      title:"修改",
      record:record,
      _parentIds:_parentIds
    })
  }

  // 删除 
  const onDelete=async(rowData)=>{
    try {
      await DeleteMenuTree(rowData.id)
      message.success("删除成功！")
      onGetTree()
    } catch (error) {
      
    }
  }

  // 选择行
  const onSelect=(ID=[])=>{
    onSelectTree(ID[0])
  }


  // 获取父节点 ID
  const getParentKey = (name, tree) => {
    let parentKey;

    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];

      if (node.children) {
        if( node.children.some(item => item.name.includes(name)) ){
          parentKey = node.id;
        } else if (getParentKey(name, node.children)) {
          parentKey = getParentKey(name, node.children);
        }
      }
    }

    return parentKey;
  };


  // 查询 节点
  const onChangeInput=(e)=>{

    const _value=(e.target.value||'').trim();

    setSearchValue(_value)
    

    if(_value){

      const expanded=treeData.map(o=>{
        return getParentKey(_value,[o]);
      }).filter(o=>o);

      setExpandedKeys([...new Set(expanded)])
    }else{
      setExpandedKeys([])
    }

  }

  // 阻止冒泡
  const onStopPropagation=(e)=>{
    e.stopPropagation()
  }

  useEffect(() => {
    onGetTree()
  },[]);


  // 父组件调用
  useImperativeHandle(ref,() => ({
    // 刷新 Tree
    onUpdate: (params) => {
      onGetTree()
    }
  }));

  // 处理 数据
  const loop = data =>
    data.map(item => {
      const index = item.name.indexOf(searchValue);
      const beforeStr = item.name.substring(0, index);
      const afterStr = item.name.slice(index + searchValue.length);

      const _buttonBox=(
        <span onClick={onStopPropagation} style={{padding:'0px 22px',display:'inline-block',float:'right'}}>
          <Button onClick={()=> onEdit({title:"添加"}) } size='small' type="link" title='添加' icon={<PlusSquareOutlined />} />
          <Button onClick={()=> onEditHandle(item) } size='small' type="link" title='修改' icon={<FormOutlined />} />
          <Popconfirm
            title="确定删除?"
            onConfirm={()=> onDelete(item) }
          >
            <Button size='small' type="link" title='删除' danger icon={<CloseSquareOutlined />} />
          </Popconfirm>
        </span>
      )

      const title =
        index > -1 ? (
          <span>
            {beforeStr}
              <span style={{color:"#faad14"}}>{searchValue}</span>
            {afterStr}
            {_buttonBox}
          </span>
        ) : (
          <span>
            <span>{item.name}</span>
            {_buttonBox}
          </span>
        );
      if (item.children) {
        return { title, key: item.id, children:loop(item.children) };
      }

      return {
        title,
        key: item.id,
      };
  });


  return (
    <>
      <Input 
        placeholder="查询..." 
        suffix={<SearchOutlined />}
        onChange={onChangeInput}
      />
      <div style={{height:12}}></div>

      { expandedKeys.length ?
            <Tree
              height={300}
              blockNode={true}
              autoExpandParent={true}
              expandedKeys={expandedKeys}
              treeData={ loop(treeData) }
              onSelect={onSelect}
            />
            :
            <Tree
              height={300}
              blockNode={true}
              autoExpandParent={true}
              treeData={ loop(treeData) }
              onSelect={onSelect}
          />
      }

    </>
  );
};

const TreePageMoudle = forwardRef(TreePage);
export default TreePageMoudle;