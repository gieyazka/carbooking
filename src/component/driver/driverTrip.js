import React, { useState, useRef, useReducer, Fragment } from 'react'
import { DataContext } from "../store/store"


import { Modal, Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio, Card } from 'antd';
import editdriver from '../asset/editdriver.png'
import forward from '../asset/forward.png'
import backward from '../asset/backward.png'
import Swal from 'sweetalert2';
import countRequest from '../asset/countRequest.png'

import { getDrivers, editDriver, addDrivers, removeDriver, getAllTrips } from '../util/index'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const Trips = () => {
    const [date, setDate] = useState(new moment())
    const localizer = momentLocalizer(moment)
    const data = [
        {
            
            title: "My event",
            allDay: false,
            start: new Date(2021, 0, 25, 10, 0), // 10.00 AM
            end: new Date(2021, 0, 25, 11, 0), // 2.00 PM
        }
    ]
    console.log(new Date(2021, 0, 25, 10, 0));
    React.useMemo(async () => {
        await getAllTrips().then(res => {
            console.log(res);
            for (const d of res) {
                console.log(d.booking.date);
            }
        })
    })
    return (
        <Fragment >
            <div className='driverCalendar' >
                <h2 style={{ position: 'relative', padding: '12px', textAlign: 'center', color: '#FFF' }}><img src={backward} onClick={() => { setDate(moment(date).subtract(1, 'months')) }} style={{ cursor: 'pointer' }} /> &nbsp; {date.format('MMMM YYYY')} &nbsp; <img src={forward} onClick={() => { setDate(moment(date).add(1, 'months')) }} style={{ cursor: 'pointer' }} /></h2>
                <Calendar
                    culture='ar-AE'
                    localizer={localizer}
                    events={data}
                    // startAccessor="start"
                    // endAccessor="end"
                    date={new Date(date)}
                    style={{ height: '45vh', color: 'black' }}
                    views={{ month: true }}
                    toolbar={false}
                    onNavigate={new Date(date)}
                // defaultDate={new Date(2015, 3, 1)}
                />
            </div>
        </Fragment>
        // </div>
    )

}

export default Trips