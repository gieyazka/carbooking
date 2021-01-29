import React, { useState, useEffect, useRef } from 'react'

import { DataContext } from "../store/store"
import moment from 'moment'
import { Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio, Card, Modal } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import iconCar from '../asset/iconcar.png'
import department from '../asset/hrdepartment.png'
import user from '../asset/hruser.png'
import calender from '../asset/hrcarender.png'
import location from '../asset/hrlocation.png'
import hrmessage from '../asset/hrmessage.png'
import hrdescription from '../asset/hrdescription.png'
import noDriver from '../asset/noDriver.png'
import xicon from '../asset/xicon.png'
import assignicon from '../asset/assignicon.png'
import statusdriver2 from '../asset/statusdriver2.png'
import countRequest from '../asset/countRequest.png'
import clearIcon from '../asset/clearIcon.png'
import car from '../asset/carblack.png'
import people from '../asset/people.png'
import Swal from 'sweetalert2'
import loadingLogin from '../asset/wheel.gif'
// import statusdriver2 from '../asset/statusdriver2.png'

import filer from '../asset/filer.png'
import { getBookingHr, handleHrApprove } from '../util/index'

const Hrapprove = () => {
    const TestBtn = Button
    let filterCompany = null
    let filterType = null
    // console.log(res);
    const [sidebar, setSidebar] = useState(true)
    const [bookingData, setBookingData] = useState([])
    const wrapperRef = useRef(null);
    const [state, setState] = React.useContext(DataContext);
    const { Option } = Select
    const [filerBooking, setFilter] = useState({
        search: false,
        company: null,
        department: null,
        reason: null,
        date: null,
        province: null
    })
    const { innerHeight, innerWidth } = window
    // console.log(innerHeight,innerWidth);
    if (innerWidth <= 575) {
        var device = 'horizontal'
    } else {
        var device = 'vertical'
    }
    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }
    const closeSidebar = () => {
        // console.log('closesidebar');
        setSidebar(true)
    }
    const [modal, setModal] = useState({
        carType: null,
        comment: null,
        company: null,
        date: null,
        department: null,
        destProvince: null,
        destination: null,
        endTime: null,
        startTime: null,
        name: null,
        driver: null,
        reason: null,
        totalPassenger: null,
        open: false
    })

    const hrCancleClick = (res) => {
        Swal.fire({
            text: `ไม่อนุมัติคำขอของ ${res.name} ?`,
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'gray',
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ยืนยัน',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                setloading(true)
                const status = false
                const id = res.id
                let name = null
                await handleHrApprove(res.id, status).then(async (d) => {
                    await getBookingHr().then(async data => {
                        data.map(booking => {

                            if (booking.id == id) {
                                name = booking.name
                            }
                        })
                        setloading(false)

                        Swal.fire({
                            text: `ไม่อนุมัติคำขอของ ${d.data.name} สำเร็จ`,
                            // text: "You won't be able to revert this!",
                            icon: 'info',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setBookingData(data)
                        // return res
                    })
                })
                setloading(false)

            }
        })
        // console.log(res);
    }
    const [loading, setloading] = useState(false)

    const hrApproveClick = (res) => {
        Swal.fire({
            text: `อนุมัติคำขอของ ${res.name} ?`,
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(43, 164, 65)',
            cancelButtonColor: 'gray',
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ยืนยัน',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                setloading(true)
                const status = true
                const id = res.id
                let name = null
                await handleHrApprove(res.id, status).then(async (d) => {
                    await getBookingHr().then(async data => {
                        data.map(booking => {

                            if (booking.id == id) {
                                name = booking.name
                                // console.log( booking.name);
                            }
                        })

                        // console.log(d);
                        setloading(false)

                        Swal.fire({
                            text: `อนุมัติคำขอของ ${d.data.name} สำเร็จ`,
                            // text: "You won't be able to revert this!",
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setBookingData(data)
                        // return res
                    }).catch(err => {
                        console.log(err)
                    })
                })

                setloading(false)

            }
        })
        // console.log(res);
    }



    const filterBooking = (dataFilter, filter) => {
        // console.log(dataFilter, filter);

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
        if (filerBooking.search == true) {
            let countBooking = 0
            bookingData.map(res => {
                // console.log(res.destProvince);
                if (res.hrApprove == null && res.company == filerBooking.company) {
                    countBooking += 1
                } else if (res.hrApprove == null && res.department == filerBooking.department) {
                    countBooking += 1
                } else if (res.hrApprove == null && res.reason == filerBooking.reason) {
                    countBooking += 1
                }
                else if (res.hrApprove == null && res.date == filerBooking.date) {
                    // console.log(res.date );
                    countBooking += 1
                }
                else if (res.hrApprove == null && res.destProvince == filerBooking.province) {
                    countBooking += 1
                }
                else if (filerBooking.company == 'Other' && res.hrApprove == null && res.company != 'AH' && res.company != 'AHP' && res.company != 'AHT' && res.company != 'AITS' && res.company != 'ASICO') {
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
                } else if (res.hrApprove == null && filerBooking.reason == 'Other' && res.reason != 'ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร' && res.reason != 'ส่งของ' && res.reason != 'รับ - ส่งแขก' && res.reason != 'ติดต่อลูกค้า') {
                    countBooking += 1

                }
            })
            // console.log(countBooking);
            setCount(countBooking)
        }
    }, [filerBooking])
    // console.log(filerBooking);

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
        bookingData.map(data => {
            if (data.hrApprove == null) {
                countData += 1
            }
        })
        setCount(countData)
    }
    // console.log(filerBooking);
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
    const showData = ({ needDriver, totalPassenger, carType, comment, company, date, department, destProvince, destination, endTime, startTime, name, driver, reason }) => {
        // console.log(carType, comment, company, reason);
        setModal({ needDriver, totalPassenger, carType, comment, company, date, department, destProvince, destination, endTime, startTime, name, driver, reason, open: true })
    }
    useOutsideAlerter(wrapperRef);
    const [count, setCount] = useState(0)
    React.useMemo(async () => {
        const bookingControl = async () => {
            setBookingData(await getBookingHr().then(async res => {
                let countData = 0
                res.map(data => {
                    if (data.hrApprove == null) {
                        countData += 1
                    }
                })
                setCount(countData)
                // console.log(res);
                return res
            }))
        }
        await bookingControl()
    }, [])
    // console.log(modal);
    return (
        <div>
            < div style={!loading ? { display: 'none' } : { zIndex: 99999, height: 'calc(100vh + 64px)', width: '100%', textAlign: 'center', position: 'fixed', top: '0', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <img src="/carbooking/static/media/wheel.7bfd793f.gif" style={{ borderRadius: '10px', top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }} />
            </div >
            <div className={!sidebar == true ? 'contentFilter' : 'red'}></div>
            <div className='padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                <p style={{ color: 'black', paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>
                <div style={{ position: 'relative' }}>
                    <img style={{ height: '16px', width: '16px' }} src={countRequest} /> <span style={{ color: 'black' }}>{count} รายการ </span>
                    <span style={{ padding: '8px' }} >
                        <button onClick={() => { toggleSidebar() }} style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '1em', backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '20px', border: '0' }}>
                            <img src={filer} />กรอง</button>
                    </span>
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
            </div>
            <div className='margin hrfont'>
                <Row gutter={{ xs: 24, sm: 24 }}>
                    {/* filter no other */}


                    {bookingData.map(res =>

                        res.hrApprove == null && res.company == filerBooking.company
                            || res.hrApprove == null && res.department == filerBooking.department
                            || res.hrApprove == null && res.reason == filerBooking.reason
                            || res.hrApprove == null && res.date == filerBooking.date
                            || res.hrApprove == null && res.destProvince == filerBooking.province ?

                            (

                                <Col key={res.id} xs={{ span: 24 }} sm={{ span: 8 }} style={{ marginTop: '8px' }}>

                                    <Card style={{ width: '100%', background: '#475384', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)' }}>
                                        <Card style={{
                                            position: 'relative',
                                            width: '100%', background: '#F7FAFC', boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.2)'
                                        }}>
                                            <div  >
                                                <img src={user} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.name} ({res.company})  </span>
                                            </div>
                                            <div style={{ paddingTop: '4%' }} >
                                                <img src={department} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.department}  </span>
                                            </div>
                                            <div style={{ paddingTop: '4%' }}>
                                                <img src={calender} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.date} &nbsp; &nbsp;  {res.startTime} - {res.endTime}</span>
                                            </div>
                                            <div style={{ paddingTop: '4%' }} >
                                                <img src={location} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.destination} &nbsp; {res.destProvince} </span>
                                            </div>
                                            <div style={{ paddingTop: '4%' }}>
                                                <img src={hrmessage} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.reason}</span>
                                            </div>

                                        </Card>
                                        <Row>
                                            <Col style={{ paddingTop: '8%' }} span={4} >
                                                <div className='cursor'>
                                                    <img onClick={() => { showData(res) }} src={hrdescription} />
                                                </div>
                                            </Col>
                                            <Col style={{ paddingTop: '8%', textAlign: 'right' }} span={20} >
                                                <div style={{ paddingTop: '4px' }}>
                                                    <Button onClick={() => { hrCancleClick(res) }} style={{ borderRadius: '24px', borderColor: '#E53E3E', backgroundColor: '#E53E3E', color: "#FFF" }}><img style={{ marginBottom: '2px' }} src={xicon} /> <span style={{ paddingLeft: '4px' }}>ไม่อนุมัติ</span></Button> &nbsp;
                                        <Button onClick={() => { hrApproveClick(res) }} style={{ borderRadius: '24px', borderColor: '#2BA441', backgroundColor: '#2BA441', color: "#FFF" }}><img style={{ marginBottom: '2px' }} src={assignicon} /> <span style={{ paddingLeft: '4px' }}>อนุมัติ</span></Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>

                                </Col>
                            ) : res.hrApprove == null && filerBooking.search == false ? (
                                // no filter
                                <Col key={res.id} xs={{ span: 24 }} sm={{ span: 8 }} style={{ marginTop: '8px' }}>

                                    <Card style={{ width: '100%', background: '#475384', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)' }}>
                                        <Card style={{
                                            position: 'relative',
                                            width: '100%', background: '#F7FAFC', boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.2)'
                                        }}>
                                            <div  >
                                                <img src={user} /> <span style={{ top: '2px', position: 'relative', paddingLeft: '4%' }} > {res.name} ({res.company})  </span>
                                            </div>
                                            <div style={{ paddingTop: '3%' }} >
                                                <img src={department} /> <span style={{ top: '2px', position: 'relative', paddingLeft: '4%' }} > {res.department}  </span>
                                            </div>
                                            <div style={{ paddingTop: '3%' }}>
                                                <img src={calender} /> <span style={{ top: '2px', position: 'relative', paddingLeft: '4%' }} > {res.date} &nbsp; &nbsp;  {res.startTime} - {res.endTime}</span>
                                            </div>
                                            <div style={{ paddingTop: '3%' }} >
                                                <img src={location} /> <span style={{ top: '2px', position: 'relative', paddingLeft: '4%' }} > {res.destination} &nbsp; {res.destProvince} </span>
                                            </div>
                                            <div style={{ paddingTop: '3%' }}>
                                                <img src={hrmessage} /> <span style={{ top: '2px', position: 'relative', paddingLeft: '4%' }} > {res.reason}</span>
                                            </div>

                                        </Card>
                                        <Row>
                                            <Col style={{ paddingTop: '8%' }} span={4} >
                                                <div className='cursor'>
                                                    <img onClick={() => { showData(res) }} src={hrdescription} />
                                                </div>
                                            </Col>
                                            <Col style={{ paddingTop: '8%', textAlign: 'right' }} span={20} >
                                                <div style={{ paddingTop: '4px' }}>
                                                    <Button onClick={() => { hrCancleClick(res) }} style={{ borderRadius: '24px', borderColor: '#E53E3E', backgroundColor: '#E53E3E', color: "#FFF" }}><img style={{ marginBottom: '2px' }} src={xicon} /> <span style={{ paddingLeft: '4px' }}>ไม่อนุมัติ</span></Button> &nbsp;
                                        <Button onClick={() => { hrApproveClick(res) }} style={{ borderRadius: '24px', borderColor: '#2BA441', backgroundColor: '#2BA441', color: "#FFF" }}><img style={{ marginBottom: '2px' }} src={assignicon} /> <span style={{ paddingLeft: '4px' }}>อนุมัติ</span></Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>

                                </Col>
                                // other filter
                            )
                                : res.hrApprove == null && filerBooking.company == 'Other' && res.company != 'AH' && res.company != 'AHP' && res.company != 'AHT' && res.company != 'AITS' && res.company != 'ASICO'
                                    || res.hrApprove == null && filerBooking.department == 'Other' && res.department != 'Production' && res.department != 'production' && res.department != 'Marketing' && res.department != 'marketing' && res.department != 'QA & QC' && res.department != 'Personnel' && res.department != 'personnel' && res.department != 'IT' && res.department != 'it' && res.department != 'Business Deverlopment' && res.department != 'business deverlopment' && res.department != 'Purchasing' && res.department != 'purchasing' && res.department != 'Safety' && res.department != 'Safety'

                                    || res.hrApprove == null && filerBooking.reason == 'Other' && res.reason != 'ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร' && res.reason != 'ส่งของ' && res.reason != 'รับ - ส่งแขก' && res.reason != 'ติดต่อลูกค้า'

                                    ? (
                                        <Col key={res.id} xs={{ span: 24 }} sm={{ span: 8 }} style={{ marginTop: '8px' }}>

                                            <Card style={{ width: '100%', background: '#475384', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)' }}>
                                                <Card style={{
                                                    position: 'relative',
                                                    width: '100%', background: '#F7FAFC', boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.2)'
                                                }}>
                                                    <div  >
                                                        <img src={user} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.name} ({res.company})  </span>
                                                    </div>
                                                    <div style={{ paddingTop: '4%' }} >
                                                        <img src={department} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.department}  </span>
                                                    </div>
                                                    <div style={{ paddingTop: '4%' }}>
                                                        <img src={calender} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.date} &nbsp; &nbsp;  {res.startTime} - {res.endTime}</span>
                                                    </div>
                                                    <div style={{ paddingTop: '4%' }} >
                                                        <img src={location} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.destination} &nbsp; {res.destProvince} </span>
                                                    </div>
                                                    <div style={{ paddingTop: '4%' }}>
                                                        <img src={hrmessage} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {res.reason}</span>
                                                    </div>

                                                </Card>
                                                <Row>
                                                    <Col style={{ paddingTop: '8%' }} span={4} >
                                                        <div className='cursor'>
                                                            <img onClick={() => { showData(res) }} src={hrdescription} />
                                                        </div>
                                                    </Col>
                                                    <Col style={{ paddingTop: '8%', textAlign: 'right' }} span={20} >
                                                        <div style={{ paddingTop: '4px' }}>
                                                            <Button onClick={() => { hrCancleClick(res) }} style={{ borderRadius: '24px', borderColor: '#E53E3E', backgroundColor: '#E53E3E', color: "#FFF" }}><img style={{ marginBottom: '2px' }} src={xicon} /> <span style={{ paddingLeft: '4px' }}>ไม่อนุมัติ</span></Button> &nbsp;
                                        <Button onClick={() => { hrApproveClick(res) }} style={{ borderRadius: '24px', borderColor: '#2BA441', backgroundColor: '#2BA441', color: "#FFF" }}><img style={{ marginBottom: '2px' }} src={assignicon} /> <span style={{ paddingLeft: '4px' }}>อนุมัติ</span></Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card>

                                        </Col>
                                    ) : null
                    )}

                </Row>
            </div>
            <Modal
                visible={modal.open}
                // onOk={handleOk}
                onCancel={() => { setModal({ ...modal, open: false }) }}
                footer={[

                ]}
            >
                <div style={{ position: 'relative', fontFamily: 'Bai Jamjuree', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', lineHeight: '140%' }}  >

                    <span style={{ position: 'absolute', right: '10%' }}>  {modal.needDriver ? <img src={statusdriver2} /> : <img src={noDriver} />}&nbsp;  <span style={{ marginTop: '8%' }}>คนขับรถ</span>   </span>
                    <img src={car} /> <span style={{ paddingLeft: '4%' }} > {modal.carType}  </span>

                </div>
                <div style={{ paddingTop: '4%' }} >
                    <img src={user} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modal.name} ({modal.company})  </span>
                </div>

                <div style={{ paddingTop: '4%' }}>
                    <img src={calender} /> <span style={{ position: 'relative', paddingLeft: '4%' }} >{modal.date} &nbsp; &nbsp;  {modal.startTime} - {modal.endTime} </span>
                </div>
                <div style={{ paddingTop: '4%' }} >
                    <img src={location} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modal.destination} &nbsp; {modal.destProvince}</span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={hrmessage} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modal.reason}</span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={people} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > จำนวน  {modal.totalPassenger} คน</span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <p>เหตุผลที่ต้องการใช้รถ  : {modal.reason}</p>
                </div>
                <div >
                    <p>รายละเอียดอื่น ๆ   : {modal.comment || ' - '}</p>
                </div>
            </Modal>
        </div >
    )
}
export default Hrapprove