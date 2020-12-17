import React, { useState, useEffect, useRef } from 'react'

import { DataContext } from "../store/store"
import moment from 'moment'
import { Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio, Card } from 'antd';
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

import countRequest from '../asset/countRequest.png'

import filer from '../asset/filer.png'

const Hrapprove = () => {
    const TestBtn = Button
    // console.log(res);
    const [sidebar, setSidebar] = useState(true)
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
    return (
        <div>
            <div className={!sidebar == true ? 'contentFilter' : 'red'}></div>
            <div className='padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                <p style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>
                <div style={{ position: 'relative' }}>
                    <img style={{ height: '16px', width: '16px' }} src={countRequest} /> <span style={{ color: 'black', paddingRight: '8px' }}> <span style={{ paddingRight: '8px' }}>999 รายการ </span>
                        <Button onClick={() => { toggleSidebar() }} style={{ fontSize: '1em', backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '20px' }}><img src={filer} /> <span style={{ paddingLeft: '8px' }}>กรอง</span></Button>
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
                    <Col xs={{ span: 24 }} sm={{ span: 8 }} style={{ marginTop : '8px'}}>
                        <Card style={{ width: '100%', background: '#475384', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)' }}>
                            <Card style={{
                                position: 'relative',
                                width: '100%', background: '#F7FAFC', boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.2)'
                            }}>
                                <div  >
                                    <img src={user} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > นายสมชาย ชาติชาย (AH)  </span>
                                </div>
                                <div style={{ paddingTop: '4%' }} >
                                    <img src={department} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > Accounting  </span>
                                </div>
                                <div style={{ paddingTop: '4%' }}>
                                    <img src={calender} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > 10-10-2020  08:30-19:30</span>
                                </div>
                                <div style={{ paddingTop: '4%' }} >
                                    <img src={location} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > AHR ระยอง</span>
                                </div>
                                <div style={{ paddingTop: '4%' }}>
                                    <img src={hrmessage} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > ส่งของ</span>
                                </div>

                            </Card>
                            <Row>
                                <Col style={{ paddingTop: '8%'}} span={4} >
                                    <div  class='cursor'>
                                        <img src={hrdescription} />
                                    </div>
                                </Col>
                                <Col style={{ paddingTop: '8%',textAlign:'right' }} span={20} >
                                    <div style={{paddingTop : '4px'}}>
                                        <Button style={{borderRadius : '24px',borderColor : '#E53E3E',backgroundColor : '#E53E3E' ,color : "#FFF"}}><img style={{marginBottom : '2px'}} src={xicon} /> <span style={{paddingLeft :'4px'}}>ไม่อนุมัติ</span></Button> &nbsp;
                                        <Button style={{borderRadius : '24px',borderColor : '#2BA441',backgroundColor : '#2BA441',color : "#FFF"}}><img style={{marginBottom : '2px'}} src={assignicon} /> <span style={{paddingLeft :'4px'}}>อนุมัติ</span></Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default Hrapprove