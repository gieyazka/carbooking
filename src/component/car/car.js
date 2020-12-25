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
    const [carState, setcarState] = useState({
        isModalVisible: false,
        openCreateModal: false,
        carData: {
            plate_car: null,
            province: null,
            start_mileage: null,
            type_car: null,
            model: null,
            end_mileage: null,
        }
    });
    const hiddenFileInput = React.useRef(null)
    //edit img driver
    const handleCarData = e => {
        console.log(e);

        if (e.target.name == 'plate_car') {
            setcarState({ ...carState, carData: { ...carState.carData, plate_car: e.target.value } })
        }

        if (e.target.name == 'start_mileage') {
            setcarState({ ...carState, carData: { ...carState.carData, start_mileage: e.target.value } })
        }
        if (e.target.name == 'img') {
            // console.log( e.target.files[0]);
            setcarState({ ...carState, carData: { ...carState.carData, imgname: e.target.files[0] ? e.target.files[0].name : null, img: URL.createObjectURL(e.target.files[0]) } })
        }



    }
    console.log(carState);
    const handleClick = event => {

        hiddenFileInput.current.click();
    };

    //
    const openEdit = (e, data) => {

        setcarState({ ...carState, openCreateModal: false, isModalVisible: true, carData: { name: data } });
    };
    const openCreate = (e) => {

        setcarState({ ...carState, openCreateModal: true, isModalVisible: true, carData: null });
    };
    const handleOk = () => {

        if (carState.carData) {
            if (!carState.carData.plate_car || !carState.carData.province || !carState.carData.start_mileage || !carState.carData.type_car || !carState.carData.model) {
                Swal.fire({

                    icon: 'warning',
                    title: 'กรุณากรอกข้อมูลให้ครบ',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    title: `บันทึกข้อมูลของ ${carState.carData.name}`,
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
                            setcarState({ ...carState, isModalVisible: false });

                        })

                    } else if (result.isDenied) {

                        // setcarState({ ...carState, isModalVisible: false });
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
        // setcarState({ ...carState, isModalVisible: false });

    };

    const handleCancel = () => {


        setcarState({ ...carState, isModalVisible: false });



    };

    const test = [0, 1, 2, 3, 4, 5, 6]
    const { Option } = Select


    const imgRef = useRef();
    // const openEdit = (e, data) => {

    //     showModal(data)
    //     // swal(`this is click from res id : ${data}`);
    // }
    console.log(carState);
    return (
        <div>
            <div className=' padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                <p className='hrfont' style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>
                <div style={{ position: 'relative' }}>
                    <img style={{ height: '16px', width: '16px' }} src={countRequest} /> <span style={{ color: 'black', paddingRight: '8px' }}> <span style={{ paddingRight: '8px' }}>999 รายการ </span>
                        <button onClick={(e) => openCreate(e)} style={{ border: '0', padding: '4px 16px', backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '24px' }}>+ เพิ่มรถ</button>
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
                <Modal title="" visible={carState.isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                    <Row gutter={{ xs: 24, sm: 24 }} style={{ marginBottom : '8px',textAlign: 'center' }}>
                        <Col span={24}>
                            {!carState.openCreateModal ? <Button key="back" style={{ backgroundColor: '#C53030', color: 'white', width: '35%' }} onClick={() => handleRemove()}>
                                ลบ
            </Button> : ''}
                            <Button key="submit" style={{ backgroundColor: '#2CC84D', color: 'white', width: '35%' }} onClick={handleOk}>
                                บันทึก
            </Button>
                        </Col>
                    </Row>,
                ]}>
                    <div className='person' style={{ textAlign: "center" }}>
                        <img style={{ width: '183px', height: '183px' }} src={carState.carData ? carState.carData.img ? carState.carData.img : 'https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg'

                            : 'https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg'} />
                        <div className='hoverCar'  >
                            <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', cursor: 'pointer' }} src={editdriver} onClick={() => handleClick()}
                            />
                            <input
                                name='img'
                                type="file"
                                ref={hiddenFileInput}
                                onChange={(e) => { handleCarData(e) }}
                                style={{ display: 'none' }}
                                accept="image/x-png,image/gif,image/jpeg"
                            />

                        </div>
                    </div>
                    <div style={{ marginTop: '24px', fontFamily: 'Bai Jamjuree' }} >
                        <Row gutter={{ xs: 24, sm: 24 }} >
                            <Col span={5}></Col>
                            <Col span={8}>
                                <h3 style={{ fontWeight: 'bold' }}>เลขทะเบียนรถ</h3>
                                {/* <p>{carState.carData.name}</p> */}

                                <Input name='plate_car' placeholder='เลขทะเบียนรถ'
                                    style={{ width: '100%', backgroundColor: '#EDEDED' }} bordered={false}
                                    value={carState.carData ? carState.carData.plate_car : null}
                                    onChange={(e) => { handleCarData(e) }} />
                                <h3 style={{ fontWeight: 'bold' }}>ประเภทรถ</h3>
                                <Select value={carState.carData ? carState.carData.type_car : null} name='type_car' placeholder='ประเภทรถ' bordered={false}
                                    style={{ width: '100%', backgroundColor: '#EDEDED' }}
                                    onChange={(e) => { setcarState({ ...carState, carData: { ...carState.carData, type_car: e } }) }}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >

                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                                <h3 style={{ fontWeight: 'bold' }}>เลขไมล์รถ</h3>
                                <Input name='start_mileage' placeholder='เลขไมล์รถ' style={{ width: '100%', backgroundColor: '#EDEDED' }} bordered={false} onChange={(e) => { handleCarData(e) }}
                                    value={carState.carData ? carState.carData.start_mileage : null} />

                            </Col>
                            <Col span={8}>
                                <h3 style={{ fontWeight: 'bold' }}>จังหวัด</h3>
                                <Select value={carState.carData ? carState.carData.province : null} name='province' placeholder='จังหวัด' bordered={false}
                                    onChange={(e) => { setcarState({ ...carState, carData: { ...carState.carData, province: e } }) }}
                                    style={{ width: '100%', backgroundColor: '#EDEDED' }}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >

                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                                <h3 style={{ fontWeight: 'bold' }}>ยี่ห้อ</h3>
                                <Select value={carState.carData ? carState.carData.model : null} name='model' placeholder='ยี่ห้อ' bordered={false}
                                    onChange={(e) => { setcarState({ ...carState, carData: { ...carState.carData, model: e } }) }}
                                    style={{ width: '100%', backgroundColor: '#EDEDED' }}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >

                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                            </Col>
                            {/* <Col span={4}></Col> */}

                        </Row>


                    </div>

                </Modal>

            </div>
        </div >
    )

}

export default ManageDriver