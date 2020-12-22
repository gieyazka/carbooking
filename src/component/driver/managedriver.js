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
            lastname: null,
            tel: null,
            username: null,
            emp_id: null,
            password: null,
            confirm_password: null,
            img: null,

        }
    });
    const hiddenFileInput = React.useRef(null)
    //edit img driver

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
        console.log(driverstate.driverData);
        if (driverstate.driverData) {
            let telReg = /^[0-9]{10}$/;
            if (!telReg.test(driverstate.driverData.tel)) {
                Swal.fire({

                    icon: 'warning',
                    title: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (!driverstate.driverData.name || !driverstate.driverData.lastname || !driverstate.driverData.tel || !driverstate.driverData.username || !driverstate.driverData.emp_id || !driverstate.driverData.img || !driverstate.driverData.password) {
                Swal.fire({

                    icon: 'warning',
                    title: 'กรุณากรอกข้อมูลให้ครบ',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (driverstate.driverData.password != driverstate.driverData.confirm_password) {
                Swal.fire({

                    icon: 'warning',
                    title: 'รหัสผ่านไม่ตรงกัน',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    title: `บันทึกข้อมูลของ ${driverstate.driverData.name}`,
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
                        Swal.fire({

                            icon: 'success',
                            title: 'บันทึกข้อมูลสำเร็จ',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            setDriverstate({ ...driverstate, isModalVisible: false });

                        })

                    } else if (result.isDenied) {

                        // setDriverstate({ ...driverstate, isModalVisible: false });
                    }
                })
            }
        } else {
            Swal.fire({

                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบ',
                showConfirmButton: false,
                timer: 1500
            })
        }



    };
    const handleRemove = () => {

        Swal.fire({
            title: `ลบข้อมูลของ ${driverstate.driverData.name}`,
            customClass: {
                confirmButton: 'swRemove',

                cancelButton: 'swCancelRemove'
            },
            focusConfirm: false,
            buttonsStyling: false,
            focusCancel: false,
            showCancelButton: true,
            confirmButtonText: 'ลบ',
            // confirmButtonColor: '#2CC84D',
            // confirmButtonColor: '#2CC84D',

            cancelButtonText: 'ไม่ลบ',
            reverseButtons: true,

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({

                    icon: 'success',
                    title: `ลบข้อมูลของ ${driverstate.driverData.name} สำเร็จ`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setDriverstate({ ...driverstate, isModalVisible: false });

                }).catch(()=>{
                    setDriverstate({ ...driverstate, isModalVisible: false });
                    
                })
            } else if (result.isDenied) {
                // Swal.fire('Changes are not saved', '', 'info')
            }
        })
        // setDriverstate({ ...driverstate, isModalVisible: false });

    };

    const handleCancel = () => {


        setDriverstate({ ...driverstate, isModalVisible: false, driverData: null });



    };
    console.log(driverstate);
    const test = [0, 1, 2, 3, 4, 5, 6]
    const { Option } = Select
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    // const lastnameRef = useRef(null);
    // const imgRef = useRef();

    const handleDriverData = e => {
        console.log(e.target, e.target.name);
        if (e.target.name == 'name') {
            setDriverstate({ ...driverstate, driverData: { ...driverstate.driverData, name: e.target.value } })
        }
        if (e.target.name == 'lastname') {
            setDriverstate({ ...driverstate, driverData: { ...driverstate.driverData, lastname: e.target.value } })
        }
        if (e.target.name == 'emp_id') {
            setDriverstate({ ...driverstate, driverData: { ...driverstate.driverData, emp_id: e.target.value } })
        }
        if (e.target.name == 'img') {
            // console.log( e.target.files[0]);
            setDriverstate({ ...driverstate, driverData: { ...driverstate.driverData, imgname: e.target.files[0] ? e.target.files[0].name : null, img: URL.createObjectURL(e.target.files[0]) } })
        }
        if (e.target.name == 'tel') {
            setDriverstate({ ...driverstate, driverData: { ...driverstate.driverData, tel: e.target.value } })
        }
        if (e.target.name == 'username') {
            setDriverstate({ ...driverstate, driverData: { ...driverstate.driverData, username: e.target.value } })
        }
        if (e.target.name == 'password') {
            setDriverstate({ ...driverstate, driverData: { ...driverstate.driverData, password: e.target.value } })
        }
        if (e.target.name == 'confirm_password') {
            setDriverstate({ ...driverstate, driverData: { ...driverstate.driverData, confirm_password: e.target.value } })
        }

    }
    console.log(driverstate);
    const [form] = Form.useForm();
    return (
        <div>

            <div className=' padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                <p className='hrfont' style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>
                <div style={{ position: 'relative' }}>
                    <img style={{ height: '16px', width: '16px' }} src={countRequest} /> <span style={{ color: 'black', paddingRight: '8px' }}> <span style={{ paddingRight: '8px' }}>999 รายการ </span>
                        <button onClick={(e) => openCreate(e)} style={{ border: '0', padding: '4px 12px', backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '24px' }}>+ เพิ่มคนขับรถ</button>
                    </span>

                </div>
            </div>
            <div className='margin hrfont'>

                <Row gutter={{ xs: 24, sm: 24 }}>

                    {test.map((res, index) =>
                        // <div key={res} style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}} >
                        <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} >

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
                        <img style={{ width: '154px', height: '154px', borderRadius: '50%' }} src={driverstate.driverData ? driverstate.driverData.img ? driverstate.driverData.img : 'https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg'
                        
                        : 'https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg'} />
                        <div className='editDriver'  >
                            <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', cursor: 'pointer' }} src={editdriver} onClick={() => handleClick()}
                            />
                            <input
                                name='img'
                                type="file"
                                ref={hiddenFileInput}
                                onChange={(e) => { handleDriverData(e) }}
                                style={{ display: 'none' }}
                                accept="image/x-png,image/gif,image/jpeg"
                            />

                        </div>
                    </div>
                    <div style={{ marginTop: '24px' }}>
                        <Row gutter={{ xs: 24, sm: 24 }}>
                            <Col span={12}>

                                <h3 style={{ fontWeight: 'bold' }}>ชื่อ</h3>
                                {/* <p>{driverstate.driverData.name}</p> */}
                                <Input style={{ width: '100%', backgroundColor: '#EDEDED' }} placeholder='ชื่อ' bordered={false} name='name' onChange={(e) => { handleDriverData(e) }} value={driverstate.driverData ? driverstate.driverData.name : null} />

                            </Col>
                            <Col span={12}>
                                <h3 style={{ fontWeight: 'bold' }}>นามสกุล</h3>
                                <Input style={{ width: '100%', backgroundColor: '#EDEDED' }} placeholder='นามสกุล' bordered={false} name='lastname' onChange={(e) => { handleDriverData(e) }} value={driverstate.driverData ? driverstate.driverData.lastname : null} />
                            </Col>
                            <Col span={24}>
                                <h3 style={{ fontWeight: 'bold' }}>รหัสพนักงาน</h3>
                                <Input style={{ width: '100%', backgroundColor: '#EDEDED' }} placeholder='รหัสพนักงาน' name='emp_id' bordered={false} onChange={(e) => { handleDriverData(e) }} value={driverstate.driverData ? driverstate.driverData.emp_id : null} />
                                <h3 style={{ fontWeight: 'bold' }} >เบอร์โทรศัพท์</h3>
                                <Input style={{ width: '100%', backgroundColor: '#EDEDED' }} placeholder='เบอร์โทรศัพท์' name='tel' bordered={false} onChange={(e) => { handleDriverData(e) }} value={driverstate.driverData ? driverstate.driverData.tel : null} />
                                <h3 style={{ fontWeight: 'bold' }}>ชื่อบัญชีผู้ใช้</h3>
                                <Input style={{ width: '100%', backgroundColor: '#EDEDED' }} placeholder='ชื่อบัญชีผู้ใช้' name='username' bordered={false} onChange={(e) => { handleDriverData(e) }} value={driverstate.driverData ? driverstate.driverData.username : null} />
                                <h3 style={{ fontWeight: 'bold' }}>รหัสผ่าน</h3>
                                <Input style={{ width: '100%', backgroundColor: '#EDEDED' }} placeholder='รหัสผ่าน' name='password' bordered={false} onChange={(e) => { handleDriverData(e) }} value={driverstate.driverData ? driverstate.driverData.password : null} />
                                <h3 style={{ fontWeight: 'bold' }}>ยืนยันรหัสผ่าน</h3>
                                <Input style={{ width: '100%', backgroundColor: '#EDEDED' }} placeholder='ยืนยันรหัสผ่าน' name='confirm_password' bordered={false} onChange={(e) => { handleDriverData(e) }} value={driverstate.driverData ? driverstate.driverData.confirm_password : null} />
                            </Col>
                        </Row>


                    </div>

                </Modal>
            </div>

        </div>
    )

}

export default ManageDriver