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
import noDriver from '../asset/noDriver.png'
import clearIcon from '../asset/clearIcon.png'
import { getTrips } from '../util/index'

const App = () => {
    const [state, setState] = React.useContext(DataContext);
    const [sidebar, setSidebar] = useState(true)
    const [modal, setModal] = useState({ open: false })
    const wrapperRef = useRef(null);

    // const [test2, setTest2] = useState([0, 1, 2])

    // console.log(state);
    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }
    const closeSidebar = () => {
        setSidebar(true)
    }

    const showData = (d) => {
        // console.log(d.driver.name);
        if (!d.driver) {
            setModal({ ...modal, open: true, booking: d.booking })

        } else {
            setModal({ ...modal, open: true, booking: d.booking, driver: d.driver.name })

        }

    }
    // console.log(modal);
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
    const [count, setCount] = useState(0)
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
    // console.log(state.trips);
    useEffect(() => {
        // filter
        if (filerBooking.search == true) {
            let countBooking = 0
            state.trips.map(d => {
                // console.log(res.destProvince);
                const res = d.booking
                // console.log(res);s
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
                else if (filerBooking.department == 'Other'
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
            setCount(countBooking)
        }
    }, [filerBooking])

    React.useEffect(async () => {
        const countTrip = async () => {
            const test = await getTrips().then(res => {
                setCount(res.length)
                setState({ ...state, trips: res })
            })

            // setCount(countData)
            // console.log(res);
        }
        await countTrip()
    }, [])
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
    // console.log(state.trips);
    return (
        <div>
            <div className={!sidebar == true ? 'contentFilter' : 'red'}></div>
            <Row style={{ color: 'black' }}>
                <Col span={24} >
                    <div >

                        <div className='padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                            <p style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>



                            <div style={{ position: 'relative' }}>
                                <img style={{ height: '16px', width: '16px' }} src={countRequest} /> {count} รายการ
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
                    </div>
                </Col>

            </Row>

            <div className='margin carfont'>
                <div className='horizonScroll'>
                    <div className='ScrollCar'>


                        {state.cars.map((res, index) =>

                            <Card key={res.id} className='cardMobile' style={{ paddingBottom: "16px", backgroundColor: "#FFF", borderColor: '#000000', borderRadius: '20px', border: '1px solid rgba(0, 0, 0, .38)' }}>
                                <Row gutter={{ xs: 16, sm: 16 }}>
                                    <Col xs={{ span: 24 }} sm={{ span: 5 }} align='center'>
                                        <div className='carPos' >
                                            <img src={res.picture[res.picture.length - 1] ? `https://ess.aapico.com${res.picture[res.picture.length - 1].url}` :
                                                'https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp'
                                            } className='imgCar' style={{ width: 'auto' }} />
                                            <p className='carfont' style={{ paddingTop: '2px' }}> {res.plateNo} {res.province}</p>
                                        </div>
                                    </Col>
                                    {/* <Col xs={{ span: 24 }} sm={{ span: 5 }} aling='left'> */}
                                    {/* <div > */}
                                    {/* <p className='carfont text'> คนขับรถ </p> */}

                                    {/* <p className='carfont text'>กี้เอง <br /> 0955120247</p> */}
                                    {/* <p className='carfont text'></p> */}


                                    {/* </div> */}
                                    {/* </Col> */}
                                    <Col xs={{ span: 24 }} sm={{ span: 19 }} >
                                        <div className='Scroll'>
                                            {/* <div> */}

                                            <Row >
                                                {state.trips ? state.trips.map((d, index) =>

                                                    d.car && d.car.id == res.id
                                                        && d.booking.company == filerBooking.company && d.car.id == res.id
                                                        || d.booking.department == filerBooking.department && d.car.id == res.id
                                                        || d.booking.reason == filerBooking.reason && d.car.id == res.id
                                                        || d.booking.date == filerBooking.date && d.car.id == res.id
                                                        || d.booking.destProvince == filerBooking.province && d.car.id == res.id

                                                        ?
                                                        <Col xs={{ span: 24 }} sm={{ span: 6 }} key={d.id} className='jobView'>
                                                            <div onClick={() => { showData(d) }} className='font'
                                                                style={d.status == 'free' ?
                                                                    { cursor: 'pointer', position: 'relative', background: '#1D366D', borderRadius: '10px', zIndex: '2', padding: '8px 12px 6px 12px',  marginTop: '4%' }
                                                                    : { cursor: 'pointer', position: 'relative', background: '#FEAB20', borderRadius: '10px', zIndex: '2', padding: '8px 12px 6px 12px',  marginTop: '4%' }
                                                                } >
                                                                <p>{(JSON.parse(d.booking.destination)+ " ")} {(JSON.parse(d.booking.destProvince) + " ")}</p>
                                                                <p>{d.booking.startTime} - {d.booking.endTime}</p>
                                                            </div>

                                                        </Col>
                                                        :

                                                        filerBooking.search == false && d.car && d.car.id == res.id ?
                                                            <Col  xs={{ span: 24 }} sm={{ span: 6 }} key={d.id} className='jobView'>
                                                                <div onClick={() => { showData(d) }} className='font'
                                                                    style={d.status == 'free' ?
                                                                        { cursor: 'pointer', position: 'relative', background: '#1D366D', borderRadius: '10px', zIndex: '2', padding: '8px 12px 6px 12px', marginTop: '4%' }
                                                                        : { cursor: 'pointer', position: 'relative', background: '#FEAB20', borderRadius: '10px', zIndex: '2', padding: '8px 12px 6px 12px', marginTop: '4%' }
                                                                    } >
                                                                    <p>{(JSON.parse(d.booking.destination)+ " ")} {(JSON.parse(d.booking.destProvince) + " ")}</p>
                                                                    <p>{d.booking.startTime} - {d.booking.endTime}</p>

                                                                </div>

                                                            </Col>
                                                            :
                                                            d.car && d.car.id == res.id && filerBooking.company == 'Other'
                                                                && d.booking.company != 'AH' && d.booking.company != 'AHP' && d.booking.company != 'AHT' && d.booking.company != 'AITS' && d.booking.company != 'ASICO'
                                                                || filerBooking.department == 'Other' && d.car.id == res.id && d.booking.department != 'Production' && d.booking.department != 'production' && d.booking.department != 'Marketing' && d.booking.department != 'marketing' && d.booking.department != 'QA & QC' && d.booking.department != 'Personnel' && d.booking.department != 'personnel' && d.booking.department != 'IT' && d.booking.department != 'it' && d.booking.department != 'Business Deverlopment' && d.booking.department != 'business deverlopment' && d.booking.department != 'Purchasing' && d.booking.department != 'purchasing' && d.booking.department != 'Safety' && d.booking.department != 'Safety'

                                                                || filerBooking.reason == 'Other' && d.car.id == res.id && d.booking.reason != 'ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร' && d.booking.reason != 'ส่งของ' && d.booking.reason != 'รับ - ส่งแขก' && d.booking.reason != 'ติดต่อลูกค้า'
                                                                ? <Col xs={{ span: 24 }} sm={{ span: 6 }} key={d.id} className='jobView'>
                                                                    <div onClick={() => { showData(d) }} className='font'
                                                                        style={d.status == 'free' ?
                                                                            { cursor: 'pointer', position: 'relative', background: '#1D366D', borderRadius: '10px', zIndex: '2', padding: '8px 12px 6px 12px',  marginTop: '4%' }
                                                                            : { cursor: 'pointer', position: 'relative', background: '#FEAB20', borderRadius: '10px', zIndex: '2', padding: '8px 12px 6px 12px',  marginTop: '4%' }
                                                                        } >
                                                                        <p>{(JSON.parse(d.booking.destination)+ " ")} {(JSON.parse(d.booking.destProvince) + " ")}</p>
                                                                        <p>{d.booking.startTime} - {d.booking.endTime}</p>

                                                                    </div>

                                                                </Col> : null

                                                ) : null}

                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>





                        )}


                    </div>
                </div>
            </div>
            {modal.booking ?
                <Modal
                    visible={modal.open}
                    // onOk={handleOk}
                    onCancel={() => { setModal({ open: false }) }}
                    footer={[

                    ]}
                >
                    <div style={{ position: 'relative', fontFamily: 'Bai Jamjuree', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', lineHeight: '140%' }}  >

                        <span style={{ position: 'absolute', right: '10%' }}>   {modal.booking.needDriver ? <img style={{}} src={statusdriver2} /> : <img src={noDriver} />}  &nbsp; คนขับรถ  </span>
                        <img src={car} /> <span style={{ paddingLeft: '4%' }} > {modal.driver && modal.driver} {modal.booking.carType}   </span>

                    </div>
                    <div style={{ paddingTop: '4%' }} >
                        <img src={user} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modal.booking.name} ({modal.booking.company})  </span>
                    </div>

                    <div style={{ paddingTop: '4%' }}>
                        <img src={calender} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modal.booking.date}    {modal.booking.startTime} - {modal.booking.endTime}</span>
                    </div>
                    <div style={{ paddingTop: '4%' }} >
                        <img src={location} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {(JSON.parse(modal.booking.destination)+ " ")} {(JSON.parse(modal.booking.destProvince)+ " ")}</span>
                    </div>
                    <div style={{ paddingTop: '4%' }}>
                        <img src={people} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > จำนวน  {modal.booking.totalPassenger} คน</span>
                    </div>
                    <div style={{ paddingTop: '4%' }}>
                        <img src={hrmessage} /> <span style={{ position: 'relative', paddingLeft: '4%' }} > {modal.booking.reason}</span>
                    </div>

                    {/* <div style={{ paddingTop: '4%' }}>
                        <p>เหตุผลที่ต้องการใช้รถ  : Meeting AHR</p>
                    </div> */}
                    <div style={{ paddingTop: '4%' }}>
                        <p>รายละเอียดอื่น ๆ   : {modal.booking.comment || '-'}</p>
                    </div>
                </Modal>
                : null}
        </div>

    )

}


export default App