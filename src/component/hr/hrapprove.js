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
import xicon from '../asset/xicon.png'
import assignicon from '../asset/assignicon.png'
import statusdriver2 from '../asset/statusdriver2.png'
import countRequest from '../asset/countRequest.png'
import car from '../asset/carblack.png'
import people from '../asset/people.png'

// import statusdriver2 from '../asset/statusdriver2.png'

import filer from '../asset/filer.png'
import { getBooking } from '../util/index'
const Hrapprove = () => {
    const TestBtn = Button
    // console.log(res);
    const [sidebar, setSidebar] = useState(true)
    const [bookingData, setBookingData] = useState([])
    const wrapperRef = useRef(null);
    const [state, setState] = React.useContext(DataContext);
    const { Option } = Select

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
        totalPassenger : null ,

        open: false
    })

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
    const showData = ({totalPassenger, carType, comment, company, date, department, destProvince, destination, endTime, startTime, name, driver, reason }) => {
        // console.log(carType, comment, company, reason);
        setModal({ totalPassenger,carType, comment, company, date, department, destProvince, destination, endTime, startTime, name, driver, reason, open: true })

    }
    useOutsideAlerter(wrapperRef);
    React.useMemo(async () => {


        const bookingControl = async () => {
            setBookingData(await getBooking().then(async res => {
                return res
            }))

        }
        await bookingControl()



    }, [])

    // console.log(bookingData);
    console.log(modal);
    return (
        <div>

            <div className={!sidebar == true ? 'contentFilter' : 'red'}></div>
            <div className='padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                <p style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>
                <div style={{ position: 'relative' }}>
                    <img style={{ height: '16px', width: '16px' }} src={countRequest} /> <span style={{ color: 'black' }}>999 รายการ </span>
                    <span style={{ padding: '8px' }} >
                        <button onClick={() => { toggleSidebar() }} style={{ padding: '4px 12px', fontSize: '1em', backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '20px', border: '0' }}>
                            <img src={filer} />กรอง</button>
                    </span>
                    <div ref={wrapperRef} className={sidebar == true ? 'sideFilter' : 'sideFilter isactive'} >

                        <div style={{ position: 'absolute', color: 'black', top: '120px', left: '8%', fontFamily: 'Bai Jamjuree' }}>
                            <p>บริษัท</p>
                            <Row>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >AH</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >AHP</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >AHT</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >AITS</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >ASICO</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >อื่น ๆ</Button>
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
                                    <Button >Production</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >Marketing</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >QA & QC</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >Personnel</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >IT</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >Business Deverlopment</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >Purchasing</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >Safety</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >อื่น ๆ</Button>
                                </Col>

                            </Row>

                            <hr />



                            <p>เหตุผลที่ต้องการใช้รถ</p>
                            <Row>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >ส่งออก</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >รับ - ส่งแขก</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >ติดต่อลูกค้า</Button>
                                </Col>
                                <Col style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Button >อื่น ๆ</Button>
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
                                    <DatePicker ref={wrapperRef} style={{ width: '100%' }} />
                                </Col>
                            </Row>
                            <p style={{ paddingTop: '8px' }}>จังหวัด</p>
                            <Row >
                                <Col sm={{ span: 22 }} xs={{ span: 22 }} style={{ paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px' }}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Select a person"
                                        optionFilterProp="children"

                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </Col>

                            </Row>

                        </div>
                    </div>
                </div>
            </div>
            <div className='margin hrfont'>
                <Row gutter={{ xs: 24, sm: 24 }}>
                    {bookingData.map(res => (
                        <Col xs={{ span: 24 }} sm={{ span: 8 }} style={{ marginTop: '8px' }}>

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
                                            <Button style={{ borderRadius: '24px', borderColor: '#E53E3E', backgroundColor: '#E53E3E', color: "#FFF" }}><img style={{ marginBottom: '2px' }} src={xicon} /> <span style={{ paddingLeft: '4px' }}>ไม่อนุมัติ</span></Button> &nbsp;
                                        <Button style={{ borderRadius: '24px', borderColor: '#2BA441', backgroundColor: '#2BA441', color: "#FFF" }}><img style={{ marginBottom: '2px' }} src={assignicon} /> <span style={{ paddingLeft: '4px' }}>อนุมัติ</span></Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                        </Col>
                    ))}

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

                    <span style={{ position: 'absolute', right: '10%' }}>   <img src={statusdriver2} /> &nbsp; คนขับรถ  </span>
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