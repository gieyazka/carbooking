import React, { useState, useRef, useReducer } from 'react'
import { DataContext } from "../store/store"
import moment from 'moment'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio, Card } from 'antd';
import editdriver from '../asset/editdriver.png'
import swal from 'sweetalert';
import countRequest from '../asset/countRequest.png'
import { IconMap } from 'antd/lib/result';
const ManageDriver = () => {
    const [driverstate, setDriverstate] = useState({
        isModalVisible: false,
        driverData : {
            name : null
        }
    });
    const openEdit = (e,data) => {
       
        setDriverstate({ ...driverstate, isModalVisible: true ,driverData : {name : data} });
    };
    const handleOk = () => {
        setDriverstate({ ...driverstate, isModalVisible: false });
    };

    const handleCancel = () => {
        setDriverstate({ ...driverstate, isModalVisible: false });
    };

    const test = [0, 1, 2, 3, 4, 5, 6]
    const { Option } = Select


    const imgRef = useRef();
    // const openEdit = (e, data) => {
      
    //     showModal(data)
    //     // swal(`this is click from res id : ${data}`);
    // }
    console.log(driverstate);
    return (
        <div>
            <div className=' padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                <p className='hrfont' style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>
                <div style={{ position: 'relative' }}>
                    <img style={{ height: '16px', width: '16px' }} src={countRequest} /> <span style={{ color: 'black', paddingRight: '8px' }}> <span style={{ paddingRight: '8px' }}>999 รายการ </span>

                    </span>

                </div>
            </div>
            <div className='margin hrfont'>

                <Row gutter={{ xs: 24, sm: 24 }}>

                    {test.map(res =>

                        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} >
                            <div style={{ position: 'relative', textAlign: 'center', paddingTop: '16px' }}>
                                <div className='person'>
                                    <input value={res} type='hidden' />
                      
                                    <img className='driverimg'
                                        src='https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80' />
                                    <div className='hoverDriver'  >
                                        <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', cursor: 'pointer' }} src={editdriver}
                                            onClick={(e) => openEdit(e, res)} />

                                    </div>
                                </div>
                            </div>
                           
                        </Col>
                        
                    )}

                </Row>
                <Modal title="Basic Modal" visible={driverstate.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>{driverstate.driverData.name}</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

            </div>
        </div>
    )

}

export default ManageDriver