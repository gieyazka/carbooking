

import React, { useState, useEffect, useRef, Fragment } from 'react'
import filer from '../asset/filer.png'
import { DataContext } from "../store/store"
import moment from 'moment'
import { Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio, Card, Modal } from 'antd';
import clearIcon from '../asset/clearIcon.png'
const Filter = () => {
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
    const wrapperRef = useRef(null);
    const [state, setState] = React.useContext(DataContext);
    let filterCompany = null
    let filterType = null
    const [bookingData, setBookingData] = useState([])
    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }
    const closeSidebar = () => {
        console.log('closesidebar');
        setSidebar(true)
    }
    const [sidebar, setSidebar] = useState(true)
    const [filerBooking, setFilter] = useState({
        search: false,
        company: null,
        department: null,
        reason: null,
        date: null,
        province: null
    })
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
    // React.useMemo(async () => {
    //     const bookingControl = async () => {
    //         setBookingData(await getBooking().then(async res => {
    //             let countData = 0
    //             res.map(data => {
    //                 if (data.hrApprove == null) {
    //                     countData += 1
    //                 }
    //             })
    //             setCount(countData)
    //             // console.log(res);
    //             return res
    //         }))
    //     }
    //     await bookingControl()
    // }, [])
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
            // setCount(countBooking)
        }
    }, [filterBooking])
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

    return (
        <Fragment>
            ทดสอบ   
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
        </Fragment>
    )
}

export default Filter