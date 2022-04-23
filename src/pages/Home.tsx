import { Row, Col,Card } from 'antd';
import { MoreOutlined } from '@ant-design/icons';


import LineGDP from './Home/LineGDP'


import WorldMap from './Home/WorldMap'
import ChinaMap from './Home/ChinaMap'


const Home=()=>{



    return(
        <>
          <h1>正在建设中。。。</h1>
           {/* <Row gutter={[18,18]}>
              <Col span={24}>
                <Card title="GDP" extra={<a href="#"><MoreOutlined/></a>}>
                  <div style={{height:300}}>
                    <LineGDP />
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="世界地图" extra={<a href="#"><MoreOutlined/></a>}>
                  <div style={{height:300}}>
                    <WorldMap />
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="国内地图" extra={<a href="#"><MoreOutlined/></a>}>
                  <div style={{height:300}}>
                    <ChinaMap />
                  </div>
                </Card>
              </Col>            
          </Row> */}
            
        </>
    )
}


export default Home;