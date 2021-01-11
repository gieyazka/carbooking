import React, { useState, useEffect, useRef } from 'react'

import { DataContext } from "../store/store"
import moment from 'moment'
import { Row, Col, Select, Button, DatePicker, Card, Modal } from 'antd';
import mockCar from '../asset/mockCar.png'
import countRequest from '../asset/countRequest.png'
import filer from '../asset/filer.png'
import department from '../asset/hrdepartment.png'
import user from '../asset/hruser.png'
import calender from '../asset/hrcarender.png'
import location from '../asset/hrlocation.png'
import car from '../asset/carblack.png'
import hrmessage from '../asset/hrmessage.png'
import people from '../asset/people.png'
import statusdriver2 from '../asset/statusdriver2.png'

const App = () => {
    const [state, setState] = React.useContext(DataContext);
    const [sidebar, setSidebar] = useState(true)
    const [modal, setModal] = useState(false)
    const wrapperRef = useRef(null);

    // const [test2, setTest2] = useState([0, 1, 2])

    // console.log(state);
    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }
    const closeSidebar = () => {
        setSidebar(true)
    }

    const showData = () => {
        setModal(true)

    }

    function useOutsideAlerter(ref) {
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
    const { innerHeight, innerWidth } = window
    // console.log(innerHeight,innerWidth);
    if (innerWidth <= 575) {
        var device = 'horizontal'
    } else {
        var device = 'vertical'
    }
    return (
        <div>
            <div className={!sidebar == true ? 'contentFilter' : 'red'}></div>
            <Row style={{ color: 'black' }}>
                <Col span={24} >
                    <div >

                        <div className='padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                            <p style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>



                            <div style={{ position: 'relative' }}>
                                <img style={{ height: '16px', width: '16px' }} src={countRequest} /> 999 รายการ
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
                    </div>
                </Col>

            </Row>

            <div className='margin carfont'>
                <div className='horizonScroll'>
                    <div className='ScrollCar'>




                        <Card className='cardMobile' style={{ paddingBottom: "16px", backgroundColor: "#FFF", borderColor: '#000000', borderRadius: '20px', border: '1px solid rgba(0, 0, 0, .38)' }}>
                            <Row gutter={{ xs: 16, sm: 16 }}>
                                <Col xs={{ span: 24 }} sm={{ span: 5 }} align='center'>
                                    <div className='carPos' >
                                        <img src={mockCar} style={{ width: 'auto' }} />
                                        <p className='carfont' style={{ paddingTop: '2px' }}> บย-1568 ชลบุรี</p>
                                    </div>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 5 }} aling='left'>
                                    <div >
                                        <p className='carfont text'> คนขับรถ </p>

                                        <p className='carfont text'>กี้เอง <br /> 0955120247</p>
                                        {/* <p className='carfont text'></p> */}


                                    </div>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 14 }} >
                                    <div className='Scroll'>
                                        {/* <div> */}

                                        <Row >
                                            {state.trips.map((res, index) =>

                                                <Col className='jobView'>
                                                    <div onClick={() => { showData() }} className='font' style={{ cursor: 'pointer', position: 'relative', width: '184px', background: '#1D366D', borderRadius: '10px', zIndex: '2', paddingTop: '8%', paddingLeft: '8%', paddingBottom: '2%', marginTop: '4%' }} >
                                                        <p>AHR ระยอง</p>
                                                        <p>8:30 - 16:30</p>
                                                    </div>

                                                </Col>


                                            )}

                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Card>








                    </div>
                </div>
            </div>

            <Modal
                visible={modal}
                // onOk={handleOk}
                onCancel={() => { setModal(false) }}
                footer={[

                ]}
            >
                <div style={{ position: 'relative' ,fontFamily: 'Bai Jamjuree',fontStyle : 'normal',fontWeight: '500',fontSize: '16px',lineHeight: '140%' }}  >

                    <span style={{ position: 'absolute', right: '10%' }}>   <img  src={statusdriver2} /> &nbsp; คนขับรถ  </span>
                    <img src={car} /> <span style={{ paddingLeft: '4%' }} > รถเก๋ง  </span>

                </div>
                <div style={{ paddingTop: '4%' }} >
                    <img src={user} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > นายสมชาย ชาติชาย (AH)  </span>
                </div>
             
                <div style={{ paddingTop: '4%' }}>
                    <img src={calender} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > 10-10-2020    08:30-19:30</span>
                </div>
                <div style={{ paddingTop: '4%' }} >
                    <img src={location} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > AHR ระยอง</span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={hrmessage} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > ส่งของ</span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                    <img src={people} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > จำนวน  2 คน</span>
                </div>
                <div style={{ paddingTop: '4%' }}>
                   <p>เหตุผลที่ต้องการใช้รถ  : Meeting AHR</p>
                </div>
                <div >
                   <p>รายละเอียดอื่น ๆ   : -</p>
                </div>
            </Modal>

        </div>

    )

}


export default App