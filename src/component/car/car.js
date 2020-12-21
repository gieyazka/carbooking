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
            name: null
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
            focusCancel : false,
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
                        <Button onClick={(e) => openCreate(e)} style={{ backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '24px' }}>+ เพิ่มรถ</Button>
                    </span>

                </div>
            </div>
            <div className='margin hrfont'>

                <Row gutter={{ xs: 24, sm: 24 }}>

                    {test.map(res =>

                        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} >
                            <div style={{ position: 'relative', textAlign: 'center', paddingTop: '16px' }}>
                                <div className='person'>
                                    <div className='hoverDriver'  >
                                        <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', cursor: 'pointer' }} src={editdriver}
                                            onClick={(e) => openEdit(e, res)} />
                                    </div>

                                    <img className='driverimg'
                                        src='https://www.autodeft.com/_uploads/images/Aston%20Martin%20Valkyrie_01.jpg' />

                                </div>
                            </div>

                        </Col>

                    )}

                </Row>
                <Modal title="" visible={driverstate.isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                    <Row gutter={{ xs: 24, sm: 24 }} style={{ textAlign: 'center' }}>
                        <Col span={24}>
                            {!driverstate.openCreateModal ? <Button key="back" style={{ backgroundColor: '#C53030', color: 'white', width: '35%' }} onClick={() => handleRemove()}>
                                ลบ
            </Button> : ''}
                            <Button key="submit" style={{ backgroundColor: '#2CC84D', color: 'white', width: '35%' }} onClick={handleOk}>
                                บันทึก
            </Button>
                        </Col>
                    </Row>,
                ]}>
                    <div className='person' style={{ textAlign: "center" }}>
                        <img style={{ width: '183px', height: '183px' }} src='https://wsa1.pakwheels.com/assets/default-display-image-car-638815e7606c67291ff77fd17e1dbb16.png' />
                        <div className='hoverCar'  >
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
                    <div style={{ marginTop: '24px' ,fontFamily : 'Bai Jamjuree'}} >
                        <Row gutter={{ xs: 24, sm: 24 }}>
                            <Col span={6}></Col>
                            <Col span={8}>
                                <h3 style={{ fontWeight: 'bold' }}>เลขทะเบียนรถ</h3>
                                {/* <p>{driverstate.driverData.name}</p> */}
                                <Input placeholder='เลขทะเบียนรถ' bordered={false} value={driverstate.driverData ? driverstate.driverData.name : null} />
                                <h3 style={{ fontWeight: 'bold' }}>ประเภทรถ</h3>
                                <Input placeholder='ประเภทรถ' bordered={false} />
                                <h3 style={{ fontWeight: 'bold' }}>เลขไมล์รถ</h3>
                                <Input placeholder='เลขไมล์รถ' bordered={false} />
                            </Col>
                            <Col span={8}>
                                <h3 style={{ fontWeight: 'bold' }}>จังหวัด</h3>
                                <Input placeholder='จังหวัด' bordered={false} />
                                <h3 style={{ fontWeight: 'bold' }}>ยี่ห้อ</h3>
                                <Input placeholder='ยี่ห้อ' bordered={false} />
                            </Col>
                            {/* <Col span={4}></Col> */}
                           
                        </Row>


                    </div>

                </Modal>

            </div>
        </div>
    )

}

export default ManageDriver