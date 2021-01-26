import React, { useState, useRef, useReducer, Fragment } from 'react'
import { DataContext } from "../store/store"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../form/formrequest.css'
import io from 'socket.io-client';


import { Modal, Form, Input, Row, Col, Select, InputNumber, Button, DatePicker, Space, TimePicker, Radio, Card } from 'antd';
import forward from '../asset/forward.png'
import backward from '../asset/backward.png'
import Swal from 'sweetalert2';
import user from '../asset/hruser.png'
import calender from '../asset/hrcarender.png'
import location from '../asset/hrlocation.png'
import car from '../asset/carblack.png'
import hrmessage from '../asset/hrmessage.png'
import people from '../asset/people.png'
import statusdriver2 from '../asset/statusdriver2.png'
import noDriver from '../asset/noDriver.png'
import playIcon from '../asset/playIcon.png'
import pause from '../asset/pause.png'
import playIconDisable from '../asset/playIconDisable.png'
import clearIcon from '../asset/clearIcon.png'
import { getTrips } from '../util/index'
import { getAllTrips, editTrips } from '../util/index'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { set } from 'lodash';
import 'moment/locale/th';
var _ = require('lodash');
const socket = io('https://ess.aapico.com', { transports: ['websocket'] });
const Trips = () => {
    // console.log(moment());
    const [date, setDate] = useState(new moment())
    const localizer = momentLocalizer(moment)
    var data = [{}]
    const [tripDetail, setTripDetail] = useState({
        events: []
    })
    const handleCalendarEvent = (e) => {
        setModalData({ tripData: e, open: true })
    }
    const valueRef = useRef();
    const valueEndRef = useRef();
    const [modalData, setModalData] = useState({ open: false });
    const [tripModal, setTripModal] = useState({ open: false });
    const handleCancel = () => {
        setModalData({ ...modalData, open: false });
    };
    const handleTripCancel = () => {
        setTripModal({ ...tripModal, open: false });
    };
    const tripsControl = async (d) => {

        setTripModal({ ...tripModal, updateTrip: d, open: true });
    }
    const loginEmpId = JSON.parse(sessionStorage.getItem('user')).emp_id
    console.log(loginEmpId);
    // console.log(JSON.parse(sessionStorage.getItem('user')).emp_id);
    React.useEffect(() => {

        socket.on(loginEmpId, data => {

            const oldTrip = tripDetail.allTrips
            oldTrip.push(data)
            Swal.fire({

                icon: 'info',
                title: 'คุณมีงานใหม่',
                showConfirmButton: false,
                timer: 1500
            })
            setTripDetail({ ...tripDetail, allTrips: oldTrip })
        })


        return () => {
            socket.off('connect');
            // socket.off('disconnect');
            socket.off('sendData');
            socket.off(loginEmpId);

        };
    });


    const sendStartMile = async (d) => {


        if (d.status == 'free') {
            if (valueRef.current.state.value == null) {
                Swal.fire({

                    icon: 'warning',
                    title: 'กรุณากรอกเลขไมล์',
                    showConfirmButton: false,
                    timer: 1000
                })
                return
            }
            Swal.fire({
                title: `ยืนยันการเริ่มงานของ ${d.booking.name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ยืนยัน',
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let startMile = valueRef.current.state.inputValue
                    valueRef.current.state.inputValue = null
                    // console.log(valueRef.current.state);

                    editTrips(d, startMile).then(res => {
                        setTripDetail({ ...tripDetail, allTrips: res })
                        setTripModal({ open: false });
                        // console.log(res);
                    })
                }
            })

        } else if (d.status == 'trip') {

            if (valueEndRef.current.state.value == null) {
                Swal.fire({

                    icon: 'warning',
                    title: 'กรุณากรอกเลขไมล์',
                    showConfirmButton: false,
                    timer: 1000
                })
                return
            }
            console.log(d, parseInt(d.startMileage), parseInt(valueEndRef.current.state.value));
            if (parseInt(d.startMileage) > parseInt(valueEndRef.current.state.value)) {
                Swal.fire({
                    icon: 'warning',
                    title: `เลขไมล์น้อยกว่าเลขไมล์เริ่มต้น ${d.startMileage}`,
                    showConfirmButton: false,
                    timer: 1000
                })
                return
            }
            let endMile = valueEndRef.current.state.inputValue
            // console.log(valueEndRef.current.state);
            Swal.fire({
                title: `ยืนยันการเริ่มงานของ ${d.booking.name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ยืนยัน',
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await editTrips(d, endMile).then(res => {
                        console.log(res);
                        setTripDetail({ ...tripDetail, allTrips: res })
                        setTripModal({ open: false });
                        // console.log(res);
                    })
                }
            })
        }

        // console.log(d);
    }
    React.useMemo(async () => {
        await getAllTrips().then(res => {
            for (const d of res) {

                if (d.user == JSON.parse(sessionStorage.getItem('user')).emp_id
                    || d.driver && JSON.parse(sessionStorage.getItem('user')).role == 'driver'
                    // || d.driver 
                    && d.driver.emp_id == JSON.parse(sessionStorage.getItem('user')).emp_id) {
                    data.push({
                        id: d.id,
                        data: d,
                        title: `${d.booking.destination} ${d.booking.destProvince}`,
                        allDay: false,
                        start: moment(d.booking.date, 'DD-mm-YYYY')._d,
                        end: moment(d.booking.date, 'DD-mm-YYYY')._d
                    })
                }
            }
            setTripDetail({ allTrips: res, events: data })
        })
    }, [])
    console.log(tripDetail);
    var i = 0
    // console.log(JSON.parse(sessionStorage.getItem('user')).emp_id );
    return (
        <Fragment >
            <div className='driverCalendar' >
                <h2 style={{ position: 'relative', padding: '12px', textAlign: 'center', color: '#FFF' }}><img src={backward} onClick={() => { setDate(moment(date).subtract(1, 'months')) }} style={{ cursor: 'pointer' }} /> &nbsp; {date.locale('th').format('MMMM YYYY')} &nbsp; <img src={forward} onClick={() => { setDate(moment(date).add(1, 'months')) }} style={{ cursor: 'pointer' }} /></h2>
                <Calendar
                    popup
                    culture='ar-AE'
                    localizer={localizer}
                    events={tripDetail.events}
                    startAccessor="start"
                    endAccessor="end"
                    date={date._d}
                    style={{ height: '500px', color: 'black' }}
                    views={{ month: true }}
                    toolbar={false}
                    onNavigate={date._d}
                    onSelectEvent={event => handleCalendarEvent(event.data)}

                />
            </div>
            <div className='tripCard'>
                {tripDetail.allTrips && tripDetail.allTrips.map((res, index) =>
                    res.status != 'finish' && res.user == JSON.parse(sessionStorage.getItem('user')).emp_id
                        || res.driver && res.status != 'finish' && JSON.parse(sessionStorage.getItem('user')).role == 'driver'
                        && res.driver.emp_id == JSON.parse(sessionStorage.getItem('user')).emp_id ?

                        (
                            <Card key={res.id} style={res.status == 'trip' ?
                                { backgroundColor: '#FEAB20', color: '#FFF', borderRadius: '10px', position: 'relative', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.05)', width: '100%', fontSize: '16px', fontFamily: 'Bai Jamjuree' }
                                :
                                { position: 'relative', borderRadius: '10px', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.05)', width: '100%', background: '#FFF', fontSize: '16px', fontFamily: 'Bai Jamjuree' }
                            }>
                                {/* {res.driver && res.driver.emp_id} */}
                                <p style={{ fontSize: '24px' }}>{res.booking.date} &nbsp; {res.booking.startTime}</p>
                                <p >{res.booking.destination} &nbsp; {res.booking.destProvince}</p>
                                {i++ == 0 ? <img src={res.status == 'free' ? playIcon : pause} onClick={() => tripsControl(res)} style={{ cursor: 'pointer', position: 'absolute', top: '50%', right: '2vw', transform: 'translateY(-50%)' }} />
                                    : <img src={res.status == 'free' ? playIconDisable : pause} style={{ position: 'absolute', top: '50%', right: '2vw', transform: 'translateY(-50%)' }} />}
                            </Card>
                        ) : null
                )}
            </div>
            <Modal visible={tripModal.open} onCancel={handleTripCancel}
                footer={[

                ]}>


                {tripModal.open && tripModal.updateTrip.status == 'free' ?
                    <div style={{ textAlign: 'center', margin: '0 12%' }}>
                        <h2>Enter mileage before start job</h2>
                        <h2>โปรดกรอกเลขไมล์ก่อนเริ่มงาน</h2>
                        <InputNumber ref={valueRef} style={{ marginTop: '8px', width: '100%' }} defaultValue={tripModal.updateTrip.car.mileage} placeholder="ไมล์เริ่มต้น (Start Mileage)" />
                        <button onClick={() => sendStartMile(tripModal.updateTrip)} style={{ cursor: 'pointer', color: '#FFF', fontFamily: "Bai Jamjuree", marginTop: '24px', padding: '8px 24px', background: '#309E48', borderRadius: '10px', border: 0, fontSize: '1.3em' }}>Start</button>
                    </div>
                    :
                    <div style={{ textAlign: 'center', margin: '0 12%' }}>
                        <h2>Enter mileage before end job</h2>
                        <h2>โปรดกรอกเลขไมล์ก่อนปิดงาน</h2>
                        <h4>เลขไมล์เริ่มต้น (Start Mileage) : {tripModal.updateTrip && tripModal.updateTrip.startMileage} </h4>
                        <InputNumber ref={valueEndRef} style={{ marginTop: '8px', width: '100%' }} placeholder="ไมล์สิ้นสุด (End Mileage)" />
                        <button onClick={() => sendStartMile(tripModal.updateTrip)} style={{ cursor: 'pointer', color: '#FFF', fontFamily: "Bai Jamjuree", marginTop: '24px', padding: '8px 24px', background: '#FB0000', borderRadius: '10px', border: 0, fontSize: '1.3em' }}>End</button>
                    </div>
                }

            </Modal>
            <Modal visible={modalData.open} onCancel={handleCancel}
                footer={[

                ]}>
                {modalData.open ?
                    <>

                        < div style={{ position: 'relative', fontFamily: 'Bai Jamjuree', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', lineHeight: '140%' }}  >
                            <div>
                                <img src={car} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modalData.tripData.driver && modalData.tripData.driver.name + " " + modalData.tripData.driver.lastname} &nbsp;  {modalData.tripData.booking.carType}   </span>

                            </div>
                            <div style={{ paddingTop: '4%' }} >
                                {modalData.tripData.booking.needDriver ? <img style={{}} src={statusdriver2} /> : <img src={noDriver} />}  <span style={{ position: 'relative', paddingLeft: '5%' }} >  คนขับรถ  </span>
                            </div>


                            <div style={{ paddingTop: '4%' }}>
                                <img src={calender} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modalData.tripData.booking.date}    {modalData.tripData.booking.startTime} - {modalData.tripData.booking.endTime}</span>
                            </div>
                            <div style={{ paddingTop: '4%' }} >
                                <img src={location} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modalData.tripData.booking.destination} {modalData.tripData.booking.destProvince}</span>
                            </div>
                            <div style={{ paddingTop: '4%' }}>
                                <img src={people} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > จำนวน  {modalData.tripData.booking.totalPassenger} คน</span>
                            </div>
                            <div style={{ paddingTop: '4%' }}>
                                <img src={hrmessage} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modalData.tripData.booking.reason}</span>
                            </div>

                            <div style={{ paddingTop: '4%' }}>
                                <p>รายละเอียดอื่น ๆ   : {modalData.tripData.booking.comment || '-'}</p>
                            </div>
                        </div>
                    </>
                    : null}
            </Modal>
        </Fragment >
        // </div>
    )

}

export default Trips