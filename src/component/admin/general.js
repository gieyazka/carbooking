import React from 'react'

import moment from 'moment'
import { Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio, Card } from 'antd';
import iconCar from '../asset/iconcar.png'
import Statusdriver from '../asset/statusdriver.png'
import user from '../asset/user.png'
import calender from '../asset/calender.png'
import location from '../asset/location.png'
import message from '../asset/message.png'
import detail from '../asset/detail.png'
import mockCar from '../asset/mockCar.png'
const RequestCar = () => (
    <div >
        <div className="horizonScroll" >
            <Card className='cardMobile' >
                <div>
                    <img src={iconCar} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > รถเก๋ง
                </span>  <img src={Statusdriver} style={{ paddingLeft: '20%' }} /> <span className='font' style={{ position: 'relative', paddingLeft: '2%' }} > คนขับรถ </span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={user} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > นายสมชาย ชาติชาย (AH)  </span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={calender} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > 10/10/2020 08:30 - 16:30  </span>
                </div>
                <div style={{ paddingTop: '4%', paddingLeft: '1.5%' }}>
                    <img src={location} /> <span className='font' style={{ position: 'relative', paddingLeft: '4.5%' }} > AHR ระยอง  </span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={message} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > ส่งของ  </span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={detail} /> <span className='font' style={{ color: '#47F044', position: 'relative', paddingLeft: '4%' }} > ดูรายละเอียดเพิ่มเติม </span>
                </div>

            </Card>
        </div>
    </div>
)

const Car = () => {
    return (
        <div>


            <Card style={{ width: '100%',borderColor: '#000000' ,borderRadius : '20px',  border: '1px solid rgba(0, 0, 0, .38)'}}>
                <Row  gutter={{ xs: 16, sm: 16 }}>
                    <Col sm={{ span: 5 }} align='center'>
                       <div >
                            <img  src={mockCar} />
                            <p className='carfont' style={{paddingTop : '2px' ,fontSize : '1.3vw'}}> บย-1568 ชลบุรี</p>
                       </div>
                    </Col>
                    <Col >
                        sd
                </Col>
                </Row>
            </Card>


        </div>
    )
}

const General = () => {

    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    return (
        <div>

            <div className='margin font'>
                <Row justify='space-between' style={{ color: 'black' }}>
                    <Col><p style={{ fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }}>{new moment().format('DD-MM-YYYY')}</p></Col>

                </Row>
                <Row gutter={{ xs: 16, sm: 16 }}>
                    <Col xs={{ span: 24 }} sm={{ span: 6 }}>
                        <RequestCar />

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 18 }}>
                        <Car />

                    </Col>
                </Row>


            </div>

        </div>
    )
}

export default General