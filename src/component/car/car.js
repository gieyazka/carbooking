import React, { useState, useRef, useReducer } from 'react'
import { DataContext } from "../store/store"
import moment from 'moment'
import { Modal, Form, Input, Row, Col, Select, Button } from 'antd';
import editdriver from '../asset/editdriver.png'
import Swal from 'sweetalert2';
import countRequest from '../asset/countRequest.png'
import { IconMap } from 'antd/lib/result';
import { addCars, getCars, editCars, removeCars } from '../util/index'
import loadingLogin from '../asset/wheel.gif'
import dataProvince from '../../province.json'
const ManageDriver = () => {
    const [loading, setloading] = useState(false)
    const { Option } = Select
    const [state, setState] = React.useContext(DataContext);
    const [carState, setcarState] = useState({
        isModalVisible: false,
        openCreateModal: false,
        carData: {
            plateNo: null,
            province: null,
            mileage: null,
            type: null,
            model: null,
            end_mileage: null,
        }, allCar: null

    });
    React.useMemo(async () => {
        let cars, drivers
        var provinceArray = []
        var i = 0
        for (const data in dataProvince) {
            provinceArray.push(<Option key={i} value={dataProvince[data].name.th}>{dataProvince[data].name.th}</Option>);
            i++
        }
        await getCars().then(res => {
            cars = res
        })
        var i = 0
        let driverArr = []
        for (const data in drivers) {
            driverArr.push(<Option key={i} value={drivers[data].id}>{drivers[data].name}</Option>);
            i++
        }
        let brandCar = []
        brandCar.push(<Option key={0} value='Toyota'>Toyota</Option>);
        brandCar.push(<Option key={1} value='Honda'>Honda</Option>);
        brandCar.push(<Option key={2} value='Mazda'>Mazda</Option>);
        brandCar.push(<Option key={3} value='Ford'>Ford</Option>);
        brandCar.push(<Option key={4} value='Isuzu'>Isuzu</Option>);
        brandCar.push(<Option key={5} value='Chevrolet'>Chevrolet</Option>);
        brandCar.push(<Option key={6} value='Nissan'>Nissan</Option>);
        brandCar.push(<Option key={7} value='MG'>MG</Option>);
        brandCar.push(<Option key={8} value='Suzuki'>Suzuki</Option>);
        brandCar.push(<Option key={9} value='BMW'>BMW</Option>);
        brandCar.push(<Option key={10} value='Mitsubishi'>Mitsubishi</Option>);
        brandCar.push(<Option key={12} value='Proton'>Proton</Option>);
        brandCar.push(<Option key={12} value='Jeep'>Jeep</Option>);
        brandCar.push(<Option key={13} value='Mercedes-benz'>Mercedes-benz</Option>);
        brandCar.push(<Option key={14} value='Hyundai'>Hyundai</Option>);
        brandCar.push(<Option key={15} value='Lexus'>Lexus</Option>);
        brandCar.push(<Option key={16} value='Mini'>Mini</Option>);
        brandCar.push(<Option key={17} value='Peugeot'>Peugeot</Option>);
        brandCar.push(<Option key={18} value='TATA'>TATA</Option>);
        brandCar.push(<Option key={19} value='Ferrari'>Ferrari</Option>);
        brandCar.push(<Option key={20} value='KIA'>KIA</Option>);
        brandCar.push(<Option key={21} value='Lotus'>Lotus</Option>);
        brandCar.push(<Option key={22} value='McLaren'>McLaren</Option>);
        brandCar.push(<Option key={23} value='Porsche'>Porsche</Option>);
        brandCar.push(<Option key={24} value='Ssangyong'>Ssangyong</Option>);
        brandCar.push(<Option key={25} value='Thairung'>Thairung</Option>);
        brandCar.push(<Option key={26} value='Aston Martin'>Aston Martin</Option>);
        brandCar.push(<Option key={27} value='Aston Martin'>Aston Martin</Option>);
        brandCar.push(<Option key={28} value='Aston Martin'>Aston Martin</Option>);
        brandCar.push(<Option key={29} value='Lambogrini'>Lambogrini</Option>);
        brandCar.push(<Option key={30} value='Maserati'>Maserati</Option>);
        brandCar.push(<Option key={31} value='Mitsuoka'>Mitsuoka</Option>);
        brandCar.push(<Option key={32} value='Audi'>Audi</Option>);
        brandCar.push(<Option key={33} value='Citroen'>Citroen</Option>);
        brandCar.push(<Option key={34} value='Subaru'>Subaru</Option>);
        brandCar.push(<Option key={35} value='Foton'>Foton</Option>);
        brandCar.push(<Option key={36} value='Jaguar'>Jaguar</Option>);
        brandCar.push(<Option key={37} value='Land Rover'>Land Rover</Option>);
        brandCar.push(<Option key={38} value='Rolls-Royce'>Rolls-Royce</Option>);
        brandCar.push(<Option key={39} value='Flokswagen'>Flokswagen</Option>);
        brandCar.push(<Option key={40} value='Bentley'>Bentley</Option>);
        brandCar.push(<Option key={41} value='DFSK'>DFSK</Option>);
        brandCar.push(<Option key={42} value='Skoda'>Skoda</Option>);

        let typeCar = []
        typeCar.push(<Option key={0} value='Car (เก๋ง)'>Car (เก๋ง)</Option>);
        typeCar.push(<Option key={1} value='Pick up (กระบะ)'>Pick up (กระบะ)</Option>);
        typeCar.push(<Option key={2} value='Bus (ตู้)'>Bus (ตู้)</Option>);
        typeCar.push(<Option key={3} value='PPV'>PPV</Option>);
        typeCar.push(<Option key={4} value='SUV'>SUV</Option>);
        setState({ ...state, province: provinceArray, typeCar: typeCar, brandCar: brandCar })
    }, [])

    const hiddenFileInput = React.useRef(null)
    //edit img driver
    const handleCarData = e => {
        // console.log(e);
        if (e.target.name == 'plateNo') {
            setcarState({ ...carState, carData: { ...carState.carData, plateNo: e.target.value } })
        }
        if (e.target.name == 'mileage') {
            setcarState({ ...carState, carData: { ...carState.carData, mileage: e.target.value } })
        }
        if (e.target.name == 'img') {
            // console.log(e);
            // console.log(e.target.files[0]);
            if (e.target.files[0]) {
                setcarState({ ...carState, carData: { ...carState.carData, imgname: e.target.files[0] ? e.target.files[0] : null, img: URL.createObjectURL(e.target.files[0]) } })
            }
        }
    }

    const handleClick = event => {

        hiddenFileInput.current.click();
    };

    React.useMemo(async () => {
        const getCardata = async () => {
            return await getCars().then(res => res)
        }
        await getCardata().then(async (res) => {
            // console.log(res);
            setcarState({ ...carState, allCar: res })
        })


    }, [])

    //
    const openEdit = (e, data) => {
        // console.log(data);
        setcarState({ ...carState, openCreateModal: false, isModalVisible: true, carData: data });
    };
    const openCreate = (e) => {

        setcarState({ ...carState, openCreateModal: true, isModalVisible: true, carData: null });
    };
    // console.log(carState);
    const handleOk = () => {

        if (carState.carData) {
            if (!carState.carData.plateNo || !carState.carData.province || !carState.carData.mileage || !carState.carData.type || !carState.carData.model) {
                Swal.fire({

                    icon: 'warning',
                    title: 'กรุณากรอกข้อมูลให้ครบ',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    title: `บันทึกข้อมูลรถ ${carState.carData.plateNo}`,
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

                }).then(async (result) => {
                    setloading(true)
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        await addCars(carState.carData).then(async res => {

                            setcarState({ ...carState, allCar: res, isModalVisible: false })
                            setloading(false)

                            Swal.fire({

                                icon: 'success',
                                title: 'บันทึกข้อมูลสำเร็จ',
                                showConfirmButton: false,
                                timer: 1500
                            })
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
    const handleEdit = () => {

        if (carState.carData) {
            if (!carState.carData.plateNo || !carState.carData.province || !carState.carData.mileage || !carState.carData.type || !carState.carData.model) {
                Swal.fire({

                    icon: 'warning',
                    title: 'กรุณากรอกข้อมูลให้ครบ',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    title: `บันทึกข้อมูลรถ ${carState.carData.plateNo}`,
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

                }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        setloading(true)

                        await editCars(carState.carData).then(async res => {
                            setcarState({ ...carState, allCar: res, isModalVisible: false })
                            setloading(false)
                            Swal.fire({

                                icon: 'success',
                                title: 'บันทึกข้อมูลสำเร็จ',
                                showConfirmButton: false,
                                timer: 1500
                            })
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
            title: `ลบข้อมูลของ `,
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

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setloading(true)

                await removeCars(carState.carData).then(async res => {
                    setcarState({ ...carState, allCar: res, isModalVisible: false })
                    setloading(false)

                    Swal.fire({

                        icon: 'success',
                        title: 'ลบข้อมูลสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            } else if (result.isDenied) {


                // Swal.fire('Changes are not saved', '', 'info')
            }
        })
        // setcarState({ ...carState, isModalVisible: false });

    };
    const handleCancel = () => {
        // console.log(hiddenFileInput.current.value);
        hiddenFileInput.current.value = null
        setcarState({ ...carState, isModalVisible: false });
    };

    const imgRef = useRef();
    // console.log(carState)
    return (
        <div>
            < div style={!loading ? { display: 'none' } : { zIndex: 99999, height: 'calc(100vh + 64px)', width: '100%', textAlign: 'center', position: 'fixed', top: '0', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <img src="/carbooking/static/media/wheel.7bfd793f.gif" style={{ borderRadius: '10px', top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }} />
            </div >

            {/* <img src={state.carData.img  || null} /> */}
            <div className=' padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                <p className='hrfont' style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>
                <div style={{ position: 'relative' }}>
                    <img style={{ height: '16px', width: '16px' }} src={countRequest} /> <span style={{ color: 'black', paddingRight: '8px' }}> <span style={{ paddingRight: '8px' }}>{carState.allCar && carState.allCar.length || 0} รายการ </span>
                        <button onClick={(e) => openCreate(e)} style={{ border: '0', padding: '4px 16px', backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '24px' }}>+ เพิ่มรถ</button>
                    </span>

                </div>
            </div>

            <div className='margin hrfont'>

                <Row gutter={{ xs: 24, sm: 24 }}>

                    {carState.allCar && carState.allCar.map(res => (

                        <Col key={res.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} >

                            <div key={res.id} style={{ position: 'relative', textAlign: 'center', paddingTop: '16px' }}>
                                <div className='person'>
                                    <div className='hoverDriver'  >
                                        <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', cursor: 'pointer' }} src={editdriver}
                                            onClick={(e) => openEdit(e, res)} />
                                    </div>

                                    <img className='driverimg'
                                        src={res.picture[res.picture.length - 1] ? `https://ess.aapico.com${res.picture[res.picture.length - 1].url}` :
                                            'https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp'
                                        } />

                                </div>
                            </div>
                        </Col>

                    ))}

                </Row>
                <Modal title="" visible={carState.isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                    <Row gutter={{ xs: 24, sm: 24 }} style={{ marginBottom: '8px', textAlign: 'center' }}>
                        <Col span={24}>
                            {!carState.openCreateModal ? <Button key="back" style={{ backgroundColor: '#C53030', color: 'white', width: '35%' }} onClick={() => handleRemove()}>
                                ลบ
            </Button> : ''}
                            {!carState.openCreateModal ? <Button key="edit" style={{ backgroundColor: '#2CC84D', color: 'white', width: '35%' }}
                                onClick={handleEdit}>
                                แก้ไข
            </Button> : ''}
                            {carState.openCreateModal ? <Button key="submit" style={{ backgroundColor: '#2CC84D', color: 'white', width: '35%' }} onClick={handleOk}>
                                บันทึก
            </Button> : ''}

                        </Col>
                    </Row>,
                ]}>
                    <div className='person' style={{ textAlign: "center" }}>

                        <img style={{ width: '183px', height: '183px' }}
                            src={carState.carData && carState.carData.img ? carState.carData.img : carState.carData != null ? carState.carData && carState.carData.plateNo
                                ? carState.carData.picture && carState.carData.picture[carState.carData.picture.length - 1]
                                    ? `https://ess.aapico.com${carState.carData.picture[carState.carData.picture.length - 1].url}`
                                    : 'https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp'
                                : 'https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp'
                                : 'https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp'} />
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

                                <Input name='plateNo' placeholder='เลขทะเบียนรถ'
                                    style={{ width: '100%', backgroundColor: '#EDEDED' }} bordered={false}
                                    value={carState.carData ? carState.carData.plateNo : null}
                                    onChange={(e) => { handleCarData(e) }} />
                                <h3 style={{ fontWeight: 'bold' }}>ประเภทรถ</h3>
                                <Select value={carState.carData ? carState.carData.type : null} name='type' placeholder='ประเภทรถ' bordered={false}
                                    style={{ width: '100%', backgroundColor: '#EDEDED' }}
                                    onChange={(e) => { setcarState({ ...carState, carData: { ...carState.carData, type: e } }) }}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {state.typeCar}
                                </Select>
                                <h3 style={{ fontWeight: 'bold' }}>เลขไมล์รถ</h3>
                                <Input name='mileage' placeholder='เลขไมล์รถ' style={{ width: '100%', backgroundColor: '#EDEDED' }} bordered={false} onChange={(e) => { handleCarData(e) }}
                                    value={carState.carData ? carState.carData.mileage : null} />

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

                                    {state.province}
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

                                    {state.brandCar}
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