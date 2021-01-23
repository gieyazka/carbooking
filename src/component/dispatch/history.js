import React, { useState, useRef, useReducer, Fragment } from 'react'
import { DataContext } from "../store/store"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../form/formrequest.css'


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
const History = () => {
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
    const [modalData, setModalData] = useState({ open: false });
    const handleCancel = () => {
        setModalData({ ...modalData, open: false });
    };
    React.useMemo(async () => {
        await getAllTrips().then(res => {
            for (const d of res) {
                data.push({
                    id: d.id,
                    data: d,
                    title: `${d.booking.destination} ${d.booking.destProvince}`,
                    allDay: false,
                    start: moment(d.booking.date, 'DD-mm-YYYY')._d,
                    end: moment(d.booking.date, 'DD-mm-YYYY')._d
                })

            }
            setTripDetail({ allTrips: res, events: data })
        })
    }, [])
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
                    style={{ height: '80vh', color: 'black' }}
                    views={{ month: true }}
                    toolbar={false}
                    onNavigate={date._d}
                    onSelectEvent={event => handleCalendarEvent(event.data)}
                />
            </div>


            <Modal visible={modalData.open} onCancel={handleCancel}
                footer={[

                ]}>
                {modalData.open ?
                    <>

                        < div style={{ position: 'relative', fontFamily: 'Bai Jamjuree', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', lineHeight: '140%' }}  >
                            <div >
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

export default History