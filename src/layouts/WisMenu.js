
import { SmileOutlined, HeartOutlined,PlusOutlined } from '@ant-design/icons';

const IconMap = {
  "smile": <SmileOutlined />,
  "heart": <HeartOutlined />,
};


const menu = [
    {
      "name":"系统管理",
      "children":[
        {
          "name":"用户管理",
          "path":"/view-system/user"
        }
      ]
    }
]


export default menu