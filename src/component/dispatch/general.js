import React, { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2';
import { DataContext } from "../store/store"
import moment from 'moment'
import { Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio, Card, Modal } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import iconCar from '../asset/iconcar.png'
import Statusdriver from '../asset/statusdriver.png'
import user from '../asset/user.png'
import calender from '../asset/calender.png'
import location from '../asset/location.png'
import location1 from '../asset/hrlocation.png'
import message from '../asset/message.png'
import detail from '../asset/detail.png'
import mockCar from '../asset/mockCar.png'
import dragicon from '../asset/dragicon.png'
import dragicon1 from '../asset/dragicon1.png'
import cleardata from '../asset/cleardata.png'
import countRequest from '../asset/countRequest.png'
import senddatabtn from '../asset/senddatabtn.png'
import filer from '../asset/filer.png'
import noDriver1 from '../asset/noDriver1.png'
import noDriver from '../asset/noDriver.png'

import car from '../asset/carblack.png'
import hrmessage from '../asset/hrmessage.png'
import people from '../asset/people.png'
import statusdriver2 from '../asset/statusdriver2.png'
import user1 from '../asset/hruser.png'
import calender1 from '../asset/hrcarender.png'
import clearIcon from '../asset/clearIcon.png'
import { addTrips, getBooking, getBookingDispatch } from '../util/index'
const RequestCar = ({ filerBooking }) => {
    // console.log(filerBooking);
    const [state, setState] = React.useContext(DataContext);
    // console.log(state);
    const [modal, setModal] = useState(false)
    const [bookingData, setbookingData] = useState({})
    const { innerHeight, innerWidth } = window
    // console.log(innerHeight,innerWidth);
    if (innerWidth <= 575) {
        var device = 'horizontal'
    } else {
        var device = 'vertical'
    }
    const showData = (d) => {
        console.log(d);
        if (d.booking) {
            setbookingData(d.booking)
        } else {
            setbookingData(d)

        }
        setModal(true)

    }
    return (

        <div >
            <div className="horizonScroll" >
                <div className='ScrollCar'>
                    {state.booking[0] ? <div className='cardBooking'>
                        <Droppable droppableId="droppable1" direction={`${device}`}>
                            {(provided, snapshot) => (

                                <div
                                    className='dragRequest'
                                    ref={provided.innerRef}
                                // style={getListStyle(snapshot.isDraggingOver)}
                                >

                                    {state.booking && state.booking.map((res, index) =>
                                        res.company == filerBooking.company
                                            || res.department == filerBooking.department
                                            || res.reason == filerBooking.reason
                                            || res.date == filerBooking.date
                                            || res.destProvince == filerBooking.province
                                            ?
                                            <Draggable
                                                key={res.id}
                                                draggableId={`${res.id}`}
                                                index={index}
                                            >
                                                {provided => (
                                                    <div
                                                        // style={{ width: '100%' }}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                    >
                                                        <Card className='cardMobile' >
                                                            <div style={{ position: 'relative', width: 'auto' }}>
                                                                <img src={iconCar} /> <span className='font' style={{ paddingLeft: '4%' }} > {res.carType || res.booking.carType} </span>
                                                                {/* <img src={Statusdriver} style={{ paddingLeft: '20%' }} /> <span className='font' style={{ position: 'relative', paddingLeft: '2%' }} > คนขับรถ </span> */}
                                                                <div style={{ position: 'absolute', bottom: '-4px', left: '60%', width: '100%' }}>{res.needDriver || res.booking && res.booking.needDriver ? <img style={{}} src={Statusdriver} /> : <img style={{}} src={noDriver1} />} <span className='font' style={{ paddingLeft: '2%' }} > คนขับรถ </span>
                                                                    <img src={dragicon1}    {...provided.dragHandleProps} />

                                                                </div>
                                                            </div>
                                                            <div style={{ paddingTop: '4%' }}>
                                                                <img src={user} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res.name || res.booking.nae} ({res.company || res.booking.company})  </span>
                                                            </div>
                                                            <div style={{ paddingTop: '4%' }}>
                                                                <img src={calender} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res.date && res.date.replaceAll('-', '/') || res.booking.date.replaceAll('-', '/')} &nbsp; {res.startTime || res.booking.startTime} - {res.endTime || res.booking.endTime}  </span>
                                                            </div>
                                                            <div style={{ paddingTop: '4%', paddingLeft: '1.5%' }}>
                                                                <img src={location} /> <span className='font' style={{ position: 'relative', paddingLeft: '4.5%' }} > {res.destination || res.booking.destination} {res.destProvince || res.booking.destProvince}  </span>
                                                            </div>
                                                            <div style={{ paddingTop: '4%' }}>
                                                                <img src={message} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res.reason || res.booking.reason}  </span>
                                                            </div>
                                                            <div onClick={() => showData(res)} style={{ cursor: 'pointer', paddingTop: '4%' }}>
                                                                <img src={detail} /> <span className='font' style={{ color: '#47F044', position: 'relative', paddingLeft: '4%' }} > ดูรายละเอียดเพิ่มเติม  </span>
                                                            </div>

                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                            :
                                            filerBooking.search == false ?
                                                <Draggable
                                                    key={res.id}
                                                    draggableId={`${res.id}`}
                                                    index={index}
                                                >
                                                    {provided => (
                                                        <div
                                                            // style={{ width: '100%' }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                        >
                                                            <Card className='cardMobile' >
                                                                <div style={{ position: 'relative', width: 'auto' }}>
                                                                    <img src={iconCar} /> <span className='font' style={{ paddingLeft: '4%' }} > {res.carType || res.booking.carType} </span>
                                                                    {/* <img src={Statusdriver} style={{ paddingLeft: '20%' }} /> <span className='font' style={{ position: 'relative', paddingLeft: '2%' }} > คนขับรถ </span> */}
                                                                    <div style={{ position: 'absolute', bottom: '-4px', left: '60%', width: '100%' }}>{res.needDriver || res.booking && res.booking.needDriver ? <img style={{}} src={Statusdriver} /> : <img style={{}} src={noDriver1} />} <span className='font' style={{ paddingLeft: '2%' }} > คนขับรถ </span>
                                                                        <img src={dragicon1}    {...provided.dragHandleProps} />

                                                                    </div>
                                                                </div>
                                                                <div style={{ paddingTop: '4%' }}>
                                                                    <img src={user} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res.name || res.booking.nae} ({res.company || res.booking.company})  </span>
                                                                </div>
                                                                <div style={{ paddingTop: '4%' }}>
                                                                    <img src={calender} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res.date && res.date.replaceAll('-', '/') || res.booking.date.replaceAll('-', '/')} &nbsp; {res.startTime || res.booking.startTime} - {res.endTime || res.booking.endTime}  </span>
                                                                </div>
                                                                <div style={{ paddingTop: '4%', paddingLeft: '1.5%' }}>
                                                                    <img src={location} /> <span className='font' style={{ position: 'relative', paddingLeft: '4.5%' }} > {res.destination || res.booking.destination} {res.destProvince || res.booking.destProvince}  </span>
                                                                </div>
                                                                <div style={{ paddingTop: '4%' }}>
                                                                    <img src={message} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res.reason || res.booking.reason}  </span>
                                                                </div>
                                                                <div onClick={() => showData(res)} style={{ cursor: 'pointer', paddingTop: '4%' }}>
                                                                    <img src={detail} /> <span className='font' style={{ color: '#47F044', position: 'relative', paddingLeft: '4%' }} > ดูรายละเอียดเพิ่มเติม  </span>
                                                                </div>

                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                                : filerBooking.company == 'Other' && res.company != 'AH' && res.company != 'AHP' && res.company != 'AHT' && res.company != 'AITS' && res.company != 'ASICO'
                                                    || filerBooking.department == 'Other' && res.department != 'Production' && res.department != 'production' && res.department != 'Marketing' && res.department != 'marketing' && res.department != 'QA & QC' && res.department != 'Personnel' && res.department != 'personnel' && res.department != 'IT' && res.department != 'it' && res.department != 'Business Deverlopment' && res.department != 'business deverlopment' && res.department != 'Purchasing' && res.department != 'purchasing' && res.department != 'Safety' && res.department != 'Safety'

                                                    || filerBooking.reason == 'Other' && res.reason != 'ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร' && res.reason != 'ส่งของ' && res.reason != 'รับ - ส่งแขก' && res.reason != 'ติดต่อลูกค้า'
                                                    ?
                                                    <Draggable
                                                        key={res.id}
                                                        draggableId={`${res.id}`}
                                                        index={index}
                                                    >
                                                        {provided => (
                                                            <div
                                                                // style={{ width: '100%' }}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                            >
                                                                <Card className='cardMobile' >
                                                                    <div style={{ position: 'relative', width: 'auto' }}>
                                                                        <img src={iconCar} /> <span className='font' style={{ paddingLeft: '4%' }} > {res.carType || res.booking.carType} </span>
                                                                        {/* <img src={Statusdriver} style={{ paddingLeft: '20%' }} /> <span className='font' style={{ position: 'relative', paddingLeft: '2%' }} > คนขับรถ </span> */}
                                                                        <div style={{ position: 'absolute', bottom: '-4px', left: '60%', width: '100%' }}>{res.needDriver || res.booking && res.booking.needDriver ? <img style={{}} src={Statusdriver} /> : <img style={{}} src={noDriver1} />} <span className='font' style={{ paddingLeft: '2%' }} > คนขับรถ </span>
                                                                            <img src={dragicon1}    {...provided.dragHandleProps} />

                                                                        </div>
                                                                    </div>
                                                                    <div style={{ paddingTop: '4%' }}>
                                                                        <img src={user} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res.name || res.booking.nae} ({res.company || res.booking.company})  </span>
                                                                    </div>
                                                                    <div style={{ paddingTop: '4%' }}>
                                                                        <img src={calender} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res.date && res.date.replaceAll('-', '/') || res.booking.date.replaceAll('-', '/')} &nbsp; {res.startTime || res.booking.startTime} - {res.endTime || res.booking.endTime}  </span>
                                                                    </div>
                                                                    <div style={{ paddingTop: '4%', paddingLeft: '1.5%' }}>
                                                                        <img src={location} /> <span className='font' style={{ position: 'relative', paddingLeft: '4.5%' }} > {res.destination || res.booking.destination} {res.destProvince || res.booking.destProvince}  </span>
                                                                    </div>
                                                                    <div style={{ paddingTop: '4%' }}>
                                                                        <img src={message} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res.reason || res.booking.reason}  </span>
                                                                    </div>
                                                                    <div onClick={() => showData(res)} style={{ cursor: 'pointer', paddingTop: '4%' }}>
                                                                        <img src={detail} /> <span className='font' style={{ color: '#47F044', position: 'relative', paddingLeft: '4%' }} > ดูรายละเอียดเพิ่มเติม  </span>
                                                                    </div>

                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                    : null

                                    )}

                                    {provided.placeholder}
                                </div>
                            )}

                        </Droppable>
                    </div> : null}
                </div>

            </div>

            <Modal
                visible={modal}
                // onOk={handleOk}
                onCancel={() => { setModal(false) }}
                footer={[

                ]}
            >
                <div style={{ position: 'relative', fontFamily: 'Bai Jamjuree', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', lineHeight: '140%' }}  >

                    <span style={{ position: 'absolute', right: '10%' }}>  {bookingData.needDriver ? <img src={statusdriver2} /> : <img src={noDriver} />} &nbsp; คนขับรถ  </span>
                    <img src={car} /> <span style={{ paddingLeft: '4%' }} > {bookingData.carType}  </span>

                </div>
                <div style={{ paddingTop: '4%' }} >
                    <img src={user1} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {bookingData.name} ({bookingData.company})  </span>
                </div>

                <div style={{ paddingTop: '4%' }}>
                    <img src={calender1} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {bookingData.date && bookingData.date.replaceAll('-', '/')} &nbsp; {bookingData.startTime} - {bookingData.endTime}</span>
                </div>
                <div style={{ paddingTop: '4%' }} >
                    <img src={location1} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {bookingData.destination} {bookingData.destProvince}  </span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={hrmessage} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {bookingData.reason}</span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={people} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > จำนวน  {bookingData.totalPassenger} คน</span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <p>เหตุผลที่ต้องการใช้รถ  : {bookingData.reason}</p>
                </div>
                <div >
                    <p>รายละเอียดอื่น ๆ   : {bookingData.comment || '-'}</p>
                </div>
            </Modal>
        </div>

    )
}

const Car = ({ testt }) => {

    const [state, setState] = React.useContext(DataContext);
    // console.log(state);
    const { Option } = Select
    const { innerHeight, innerWidth } = window
    const [pastTest, setpastTest] = useState({ ...state })
    const getListStyle = isDraggingOver => ({
        height: isDraggingOver ? "auto" : "100%",
    });
    const clearData = (data, id) => {
        let clearTrips = state.booking
        let trips = data
        data.map((d, index) => {
            if (id == d.destCarId) {
            // console.log(d);
                delete d.destCarId
                // console.log(d);
                clearTrips.push(d)
            }
        })
        const filter = data.filter(res => res.destCarId != id)
        setState({ ...state, booking: clearTrips, trips: filter });

    }
    const changeDriver = (value, carId) => {

        // console.log(value, carId);
        let arr = state.selectCar || []
        arr.push({ value, carId })
        console.log(arr);
        setState({ ...state, selectCar: arr })
    }
    // console.log(state);
    const saveDispatch = async (data, carData) => {
        // console.log(data, carData);
        var driverName = null

        let disatchInsertById = []
        data.map(async (d, index) => {
            if (state.selectCar) {
                for (const nameDriver of state.selectCar) {
                    console.log(nameDriver);
                    if (nameDriver.carId == d.destCarId) {
                        driverName = nameDriver.value
                    }
                }
            }
            // console.log(driverName);
            if (carData.id == d.destCarId) {
                const insertData = {
                    user: d.user,
                    status: 'free',
                    car: parseInt(d.destCarId),
                    driver: driverName,
                    booking: d.id
                }
                // disatchInsertById.push(d)
                // console.log(d);
                let bookingId = d.id
                console.log(insertData);
                await addTrips(insertData, bookingId).then(async res => {
                    // console.log(res);
                    let newTrip = res, newBooking

                    await getBookingDispatch().then(d => {
                        newBooking = d
                    })
                    console.log(newTrip, newBooking)
                    setState({ ...state, trips: newTrip, booking: newBooking })
                    Swal.fire({

                        icon: 'success',
                        title: 'บันทึกข้อมูลสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }
        })
        // console.log(disatchInsertById);
    }
    if (innerWidth <= 575) {
        var device = 'horizontal'
    } else {
        var device = 'vertical'
    }
    return (
        <div className='horizonScroll'>
            <div className='ScrollCar'>
                {state.cars.map((res, index) =>
                    <Droppable key={index} droppableId={`${res.id}`}>
                        {(provided, snapshot) => (

                            <div
                                className='dragRequest'
                                ref={provided.innerRef}

                            // style={getListStyle(snapshot.isDraggingOver)}
                            >


                                <Card className='cardMobile' style={{ backgroundColor: snapshot.isDraggingOver ? "lightblue" : "#FFF", borderColor: '#000000', borderRadius: '20px', border: '1px solid rgba(0, 0, 0, .38)' }}>
                                    <Row gutter={{ xs: 16, sm: 16 }}>
                                        <Col xs={{ span: 24 }} sm={{ span: 8 }} align='center'>
                                            <div className='carPos' >
                                                <img src={res.picture[res.picture.length - 1] ? `http://10.10.10.227:1337${res.picture[res.picture.length - 1].url}` :
                                                    'https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp'
                                                } className='imgCar' />
                                                <p className='carfont' style={{ paddingTop: '2px', height: '100%' }}> {res.plateNo} {res.province}</p>
                                            </div>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 5 }} aling='left'>
                                            <div style={{ position: 'relative' }} >
                                                <p className='carfont text'> คนขับรถ   </p>
                                                <span className='carfont'>
                                                    <Select key={res.id}
                                                        size='large'
                                                        style={{ fontFamily: 'Bai Jamjuree', width: '100%' }}
                                                        className='selectWidth'
                                                        onChange={(e) => {
                                                            changeDriver(e, res.id, res);
                                                        }}
                                                        showSearch
                                                        placeholder="เลือกคนขับรถ"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {state.drivers}
                                                    </Select>

                                                </span>

                                            </div>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 6 }} >
                                            <div className='Scroll'>
                                                {/* <div> */}
                                                {state.trips.map((data, index) =>

                                                    data.car && data.car.id == res.id
                                                        || data.destCarId && res.id == data.destCarId
                                                        ?
                                                        <Draggable
                                                            key={data.id}
                                                            draggableId={`trip${data.id}`}
                                                            index={index}
                                                            isDragDisabled={!data.destCarId}
                                                        >
                                                            {provided => (
                                                                <div
                                                                    // style={{ width: '100%' }}
                                                                    ref={provided.innerRef}

                                                                    {...provided.draggableProps}
                                                                >
                                                                    <div className='font' style={{ position: 'relative', width: '100%', background: '#1D366D', borderRadius: '10px', zIndex: '2', width: '100%', paddingTop: '8%', paddingLeft: '8%', paddingBottom: '2%', marginTop: '4%' }} >
                                                                    {data.destCarId ?  <img src={dragicon} {...provided.dragHandleProps} style={{ position: 'absolute', top: '50%', right: '0%', transform: 'translate(-50%,-50%)' }} />
                                                              : null }  <p>{data.booking && data.booking.destination || data.destination} {data.booking && data.booking.destProvince || data.destProvince}</p>
                                                                        <p>{data.booking && data.booking.startTime || data.startTime} - {data.booking && data.booking.endTime || data.endTime}</p>
                                                                    </div>


                                                                </div>
                                                            )}
                                                        </Draggable>
                                                        : null
                                                )}

                                            </div>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 5 }}  >
                                            <div className='posGeneralBtn'  >
                                                <Button className='fontGeneralBtn' onClick={() => { saveDispatch(state.trips, res) }} style={{ fontSize: '1em', backgroundColor: '#2CC84D', color: '#FFF' }}  > <img src={senddatabtn} /><span style={{ paddingLeft: '8px' }}>มอบหมายงาน</span ></Button>
                                                <Button className='fontGeneralBtn' onClick={(e) => clearData(state.trips, res.id)} style={{ fontSize: '1em', backgroundColor: '#40A9FF', color: '#FFF', }}  ><img src={cleardata} /><span style={{ paddingLeft: '8px' }}>เคลียค่า</span></Button>โ
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>




                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>


                )}

            </div>
        </div>
    )
}

const General = () => {
    let filterCompany = null
    let filterType = null
    const [filerBooking, setFilter] = useState({
        search: false,
        company: null,
        department: null,
        reason: null,
        date: null,
        province: null
    })
    const [state, setState] = React.useContext(DataContext);
    // console.log(state);
    const [sidebar, setSidebar] = useState(true)
    const wrapperRef = useRef(null);


    const move = (source, destination, droppableSource, droppableDestination) => {
        console.log(source, destination, droppableSource, droppableDestination);
        const sourceClone = Array.from(source);
        const result = {};
        let removed = {}
        const destClone = Array.from(destination);
        // console.log(sourceClone);
        // console.log(droppableDestination.index, droppableSource.index);
        if (droppableDestination.droppableId != 'droppable1') {
            let [removed] = sourceClone.splice(droppableSource.index, 1);
            if (!removed.destCarId) {
                console.log(484);
                removed = { ...removed, destCarId: droppableDestination.droppableId }
                destClone.splice(droppableDestination.index, 0, removed); // insert to state
                result['droppableId1'] = sourceClone;
                result['trips'] = destClone;
            } else {
                destination.map(res => {
                    if (res.id == removed.id) {
                        removed.destCarId = droppableDestination.droppableId
                    }
                })
                result['droppableId1'] = state.booking;
                result['trips'] = destClone;
            }

        } else {
            let [removed] = sourceClone.splice(droppableSource.index, 1);

            destClone.splice(droppableDestination.index, 0, removed);
            result['trips'] = sourceClone;
            result['droppableId1'] = destClone;
        }
        return { result, removed };
    };
    const getList = id => {
        if (id == 'droppable1') return state.booking //return state from component
        else return state.trips
    }
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );
            // console.log(items);
            if (source.droppableId === 'droppable1') {
                setState({ ...state, booking: items })
            }
        }
        else {
            const { result, removed } = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
            setState({ ...state, booking: result['droppableId1'], trips: result['trips'] })
        }
    };

    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }
    const closeSidebar = () => {
        // console.log('closesidebar');
        setSidebar(true)
    }
    // console.log(sidebar);
    function useOutsideAlerter(ref) {
        // console.log(ref);
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                // console.log(ref.current.contains(event.target));
                let focusDatePick = document.querySelector('.ant-picker-focused ')
                // console.log(focusDatePick);
                if (focusDatePick) {
                    var datePick = document.querySelector('.ant-picker-dropdown ')
                    // console.log(datePick);

                }
                let focusProvinceSelect = document.querySelector('.ant-select-focused ')
                // console.log(focusProvinceSelect);
                if (focusProvinceSelect) {
                    var provincePick = document.querySelector('.ant-select-dropdown ')
                    // console.log(datePick);

                }
                // console.log(ref.current);

                if (ref.current && !ref.current.contains(event.target)) {
                    // alert('out')
                    if (!datePick && !provincePick) {
                        // console.log('!datepick');
                        if (sidebar == true) {
                            closeSidebar()
                        }
                    }
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(wrapperRef);
    const { Option } = Select;
    const filterBooking = (dataFilter, filter) => {
        // console.log(dataFilter, filter);
        let countBooking = 0
        if (filter == 'Company') {
            setFilter({ ...filerBooking, search: true, company: dataFilter })
        } else if (filter == 'Department') {
            setFilter({ ...filerBooking, search: true, department: dataFilter })
        } else if (filter == 'Reason') {
            setFilter({ ...filerBooking, search: true, reason: dataFilter })
        } else if (filter == 'Date') {
            setFilter({ ...filerBooking, search: true, date: dataFilter })
        } else if (filter == 'Province') {
            setFilter({ ...filerBooking, search: true, province: dataFilter })
        }
    }
    useEffect(() => {
        // filter
        let countBooking = 0

        if (filerBooking.search == true) {
            state.booking.map(res => {
                // console.log(res.destProvince);
                if (res.company == filerBooking.company) {
                    countBooking += 1
                } else if (res.department == filerBooking.department) {
                    countBooking += 1
                } else if (res.reason == filerBooking.reason) {
                    countBooking += 1
                }
                else if (res.date == filerBooking.date) {
                    // console.log(res.date );
                    countBooking += 1
                }
                else if (res.destProvince == filerBooking.province) {
                    countBooking += 1
                }
                else if (filerBooking.company == 'Other' && res.company != 'AH' && res.company != 'AHP' && res.company != 'AHT' && res.company != 'AITS' && res.company != 'ASICO') {
                    countBooking += 1
                }
                else if (filerBooking.department == 'Other' && res.hrApprove == null
                    && res.department != 'Production' && res.department != 'production'
                    && res.department != 'Marketing' && res.department != 'marketing'
                    && res.department != 'QA & QC'
                    && res.department != 'Personnel' && res.department != 'personnel'
                    && res.department != 'IT' && res.department != 'it'
                    && res.department != 'Business Deverlopment' && res.department != 'business deverlopment'
                    && res.department != 'Purchasing' && res.department != 'purchasing'
                    && res.department != 'Safety' && res.department != 'Safety') {
                    countBooking += 1
                } else if (filerBooking.reason == 'Other' && res.reason != 'ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร' && res.reason != 'ส่งของ' && res.reason != 'รับ - ส่งแขก' && res.reason != 'ติดต่อลูกค้า') {
                    countBooking += 1

                }
            })
            // console.log(countBooking);
            setState({ ...state, count: countBooking })

        }

    }, [filerBooking])
    const clearBtn = () => {
        setFilter({
            search: false,
            company: null,
            department: null,
            reason: null,
            date: null,
            province: null
        })
        let countData = 0
        state.booking.map(data => {
            if (data.hrApprove == null) {
                countData += 1
            }
        })
        setState({ ...state, count: countData })
    }
    // console.log(test);
    return (
        <div >
            <div className={!sidebar == true ? 'contentFilter' : 'red'}></div>
            <Row style={{ color: 'black' }}>
                <Col span={24} >
                    <div >

                        <div className='padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                            <p style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>



                            <div style={{ position: 'relative' }}>
                                <img style={{ height: '16px', width: '16px' }} src={countRequest} /> {state.count} รายการ


                            </div>
                        </div>
                    </div>
                </Col>

            </Row>
            <div className='margin font'>
                <DragDropContext onDragEnd={onDragEnd}>

                    <Row gutter={{ xs: 16, sm: 16 }}>
                        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ textAlign: 'right', marginBottom: '4px' }}>
                                    <span style={{ cursor: 'pointer', padding: '8px', textAlign: 'right' }} >
                                        <button onClick={() => { toggleSidebar() }} style={{ padding: '8px 16px', fontSize: '1.3em', backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '20px', border: '0' }}>
                                            <img src={filer} />กรอง</button>
                                    </span>
                                </div>
                                <div ref={wrapperRef} className={sidebar == true ? 'sideFilter' : 'sideFilter isactive'} >

                                    <div style={{ position: 'absolute', color: 'black', top: '120px', left: '8%', fontFamily: 'Bai Jamjuree' }}>
                                        <p>บริษัท</p>
                                        <Row>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button value='AH' className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'AH', filterType = 'Company')} >AH</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button value='AHP' className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'AHP', filterType = 'Company')} >AHP</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button value='AHT' className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'AHT', filterType = 'Company')} >AHT</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button value='AITS' className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'AITS', filterType = 'Company')} >AITS</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button value='ASICO' className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'ASICO', filterType = 'Company')}>ASICO</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button value='Other' className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'Other', filterType = 'Company')}>อื่น ๆ</Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col span={1}>
                                            </Col>
                                            <Col span={22}>
                                                <hr />
                                            </Col>
                                            <Col span={1}>
                                            </Col>
                                        </Row>
                                        <p>แผนก</p>
                                        <Row>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'Production', filterType = 'Department')} >Production</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'Marketing', filterType = 'Department')} >Marketing</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'QA & QC', filterType = 'Department')} >QA & QC</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'Personnel', filterType = 'Department')} >Personnel</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'IT', filterType = 'Department')} >IT</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'Business Deverlopment', filterType = 'Department')} >Business Deverlopment</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'Purchasing', filterType = 'Department')} >Purchasing</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'Safety', filterType = 'Department')} >Safety</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'Other', filterType = 'Department')} >อื่น ๆ</Button>
                                            </Col>

                                        </Row>

                                        <hr style={{ marginRight: '20px' }} />



                                        <p>เหตุผลที่ต้องการใช้รถ</p>
                                        <Row>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร', filterType = 'Reason')} >ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'ส่งของ', filterType = 'Reason')}>ส่งของ</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'รับ - ส่งแขก', filterType = 'Reason')}>รับ - ส่งแขก</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'ติดต่อลูกค้า', filterType = 'Reason')}>ติดต่อลูกค้า</Button>
                                            </Col>
                                            <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Button className='filterbgColor' onClick={(e) => filterBooking(filterCompany = 'Other', filterType = 'Reason')} >อื่น ๆ</Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col span={1}>
                                            </Col>
                                            <Col span={22}>
                                                <hr />
                                            </Col>
                                            <Col span={1}>
                                            </Col>
                                        </Row>
                                        <p>วันที่</p>
                                        <Row >
                                            <Col sm={{ span: 22 }} xs={{ span: 22 }} style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <DatePicker onChange={(e) => filterBooking(filterCompany = moment(e).format('DD-MM-YYYY'), filterType = 'Date')} ref={wrapperRef} style={{ width: '100%' }} />
                                            </Col>
                                        </Row>
                                        <p style={{ paddingTop: '8px' }}>จังหวัด</p>
                                        <Row >
                                            <Col sm={{ span: 22 }} xs={{ span: 22 }} style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                                <Select
                                                    onChange={(e) => filterBooking(filterCompany = e, filterType = 'Province')}
                                                    showSearch
                                                    style={{ width: '100%' }}
                                                    placeholder="Select province"
                                                    optionFilterProp="children"

                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {state.province}
                                                </Select>
                                            </Col>

                                        </Row>
                                        <br />
                                        <Row >
                                            <Col span={24} style={{ textAlign: 'center' }}>
                                                <button onClick={() => clearBtn()} style={{ border: ' 1px solid #D9D9D9', boxSizing: 'border-box', borderRadius: '24px', padding: '8px 16px', fontFamily: 'Bai Jamjuree', cursor: 'pointer' }} ><img src={clearIcon} />Clear</button>

                                            </Col>

                                        </Row>
                                    </div>
                                </div>
                            </div>

                            <RequestCar filerBooking={filerBooking} />

                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
                            <Car testt={state.test2} />

                        </Col>
                    </Row>

                </DragDropContext>

            </div>

        </div>
    )
}

export default General