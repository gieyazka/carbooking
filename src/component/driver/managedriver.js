import React, { useState, useRef, useReducer } from 'react'
import { DataContext } from "../store/store"
import moment from 'moment'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio, Card } from 'antd';
import editdriver from '../asset/editdriver.png'
import Swal from 'sweetalert2';
import countRequest from '../asset/countRequest.png'
import { IconMap } from 'antd/lib/result';
const ManageDriver = () => {
    const [driverstate, setDriverstate] = useState({
        isModalVisible: false,
        openCreateModal: false,
        driverData: {
            name: null,
            lastname : null ,
        }
    });
    const hiddenFileInput = React.useRef(null)
    //edit img driver
    const handleChange = event => {
    };
    const handleClick = event => {
        console.log('clickedit');
        hiddenFileInput.current.click();
    };
    //
    const openEdit = (e, data) => {

        setDriverstate({ ...driverstate, openCreateModal: false, isModalVisible: true, driverData: { name: data } });
    };
    const openCreate = (e) => {

        setDriverstate({ ...driverstate, openCreateModal: true, isModalVisible: true, driverData: null });
    };
    const handleOk = () => {

        Swal.fire({
            title: `บันทึกข้อมูลของ ฟหกฟหด่้ฟ่`,
            customClass: {
                confirmButton: 'swConfirm',

                cancelButton: 'swCancel'
            },
            focusConfirm: false,
            buttonsStyling: false,

            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            // confirmButtonColor: '#2CC84D',
            // confirmButtonColor: '#2CC84D',

            cancelButtonText: 'ไม่บันทึก',
            reverseButtons: true,

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
        // setDriverstate({ ...driverstate, isModalVisible: false });

    };
    const handleRemove = () => {

        Swal.fire({
            title: `ลบข้อมูลของ ฟหกฟหด่้ฟ่`,
            customClass: {
                confirmButton: 'swRemove',

                cancelButton: 'swCancelRemove'
            },
            focusConfirm: false,
            buttonsStyling: false,
            focusCancel: false,
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            // confirmButtonColor: '#2CC84D',
            // confirmButtonColor: '#2CC84D',

            cancelButtonText: 'ไม่บันทึก',
            reverseButtons: true,

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
        // setDriverstate({ ...driverstate, isModalVisible: false });

    };

    const handleCancel = () => {


        setDriverstate({ ...driverstate, isModalVisible: false });



    };

    const test = [0, 1, 2, 3, 4, 5, 6]
    const { Option } = Select
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    // const lastnameRef = useRef(null);
    const imgRef = useRef();

    const handleLastname = e =>{
        console.log(e.target.value);
        setDriverstate({...driverstate,driverData : { lastname : e.target.value}})

        // const [driverstate, setDriverstate] = useState({
        //     isModalVisible: false,
        //     openCreateModal: false,
        //     driverData: {
        //         name: null,
        //         lastname : null ,
        //     }
        // });
    }
    console.log(driverstate);
    const [form] = Form.useForm();
    return (
        <div>

            <div className=' padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                <p className='hrfont' style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>
                <div style={{ position: 'relative' }}>
                    <img style={{ height: '16px', width: '16px' }} src={countRequest} /> <span style={{ color: 'black', paddingRight: '8px' }}> <span style={{ paddingRight: '8px' }}>999 รายการ </span>
                        <Button onClick={(e) => openCreate(e)} style={{ backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '24px' }}>+ เพิ่มคนขับรถ</Button>
                    </span>

                </div>
            </div>
            <div className='margin hrfont'>

                <Row gutter={{ xs: 24, sm: 24 }}>

                    {test.map(res =>
                        // <div key={res} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}} >
                            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} >

                                <div style={{ position: 'relative', textAlign: 'center', paddingTop: '16px' }}>
                                    <div className='person'>
                                        <div className='hoverDriver'  >
                                            <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', cursor: 'pointer' }} src={editdriver}
                                                onClick={(e) => openEdit(e, res)} />
                                        </div>

                                        <img className='driverimg'
                                            src='https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80' />

                                    </div>
                                </div>

                            </Col>
                        // </div>
                    )}

                </Row>

                <Modal title="" visible={driverstate.isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                    <Row gutter={{ xs: 24, sm: 24 }} style={{ textAlign: 'center' }}>
                        <Col span={24}>
                            {!driverstate.openCreateModal ? <Button key="back" style={{ backgroundColor: '#C53030', color: 'white', width: '35%' }} onClick={() => handleRemove()}>
                                ลบ
            </Button> : ''}
                            <Button style={{ backgroundColor: '#2CC84D', color: 'white', width: '35%' }} onClick={handleOk}>
                                บันทึก
            </Button>
                        </Col>
                    </Row>,
                ]}>

                    <div className='person' style={{ textAlign: "center" }}>
                        <img style={{ width: '154px', height: '154px', borderRadius: '50%' }} src='https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80' />
                        <div className='editDriver'  >
                            <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', cursor: 'pointer' }} src={editdriver} onClick={() => handleClick()}
                            />
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />

                        </div>
                    </div>
                    <div style={{ marginTop: '24px' }}>
                        <Row gutter={{ xs: 24, sm: 24 }}>
                            <Col span={12}>
                                <h3 style={{ fontWeight: 'bold' }}>ชื่อ</h3>
                                {/* <p>{driverstate.driverData.name}</p> */}
                                <Input placeholder='ชื่อ' bordered={false} value={driverstate.driverData ? driverstate.driverData.name : null} />

                            </Col>
                            <Col span={12}>
                                <h3 style={{ fontWeight: 'bold' }}>นามสกุล</h3>
                                <Input placeholder='นามสกุล' bordered={false} onChange={(e)=>{handleLastname(e)}} />
                            </Col>
                            <Col span={24}>
                                <h3 style={{ fontWeight: 'bold' }}>รหัสพนักงาน</h3>
                                <Input placeholder='รหัสพนักงาน' bordered={false} />
                                <h3 style={{ fontWeight: 'bold' }}>เบอร์โทรศัพท์</h3>
                                <Input placeholder='เบอร์โทรศัพท์' bordered={false} />
                                <h3 style={{ fontWeight: 'bold' }}>ชื่อบัญชีผู้ใช้</h3>
                                <Input placeholder='ชื่อบัญชีผู้ใช้' bordered={false} />
                                <h3 style={{ fontWeight: 'bold' }}>รหัสผ่าน</h3>
                                <Input placeholder='รหัสผ่าน' bordered={false} />
                                <h3 style={{ fontWeight: 'bold' }}>ยืนยันรหัสผ่าน</h3>
                                <Input placeholder='ยืนยันรหัสผ่าน' bordered={false} />
                            </Col>
                        </Row>


                    </div>

                </Modal>
            </div>

        </div>
    )

}

export default ManageDriver