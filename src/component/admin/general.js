import React, { useState, useEffect, useRef } from 'react'

import { DataContext } from "../store/store"
import moment from 'moment'
import { Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio, Card } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import iconCar from '../asset/iconcar.png'
import Statusdriver from '../asset/statusdriver.png'
import user from '../asset/user.png'
import calender from '../asset/calender.png'
import location from '../asset/location.png'
import message from '../asset/message.png'
import detail from '../asset/detail.png'
import mockCar from '../asset/mockCar.png'
import dragicon from '../asset/dragicon.png'
import dragicon1 from '../asset/dragicon1.png'
import cleardata from '../asset/cleardata.png'
import countRequest from '../asset/countRequest.png'
import senddatabtn from '../asset/senddatabtn.png'
import filer from '../asset/filer.png'
const RequestCar = ({ test }) => {
    // console.log(res);

    const { innerHeight, innerWidth } = window
    // console.log(innerHeight,innerWidth);
    if (innerWidth <= 575) {
        var device = 'horizontal'
    } else {
        var device = 'vertical'
    }

    return (

        <div >
            <div className="horizonScroll" >
                <div className='ScrollCar'>
                    <Droppable droppableId="droppable1" direction={`${device}`}>
                        {(provided, snapshot) => (

                            <div
                                className='dragRequest'
                                ref={provided.innerRef}
                            // style={getListStyle(snapshot.isDraggingOver)}
                            >

                                {test.map((res, index) =>
                                    <Draggable
                                        key={res}
                                        draggableId={`test${res}`}
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
                                                        <img src={iconCar} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > {res} </span>
                                                        <img src={Statusdriver} style={{ paddingLeft: '20%' }} /> <span className='font' style={{ position: 'relative', paddingLeft: '2%' }} > คนขับรถ </span>

                                                        <img src={dragicon1} className='dragicon1'   {...provided.dragHandleProps} />
                                                    </div>
                                                    <div style={{ paddingTop: '4%' }}>
                                                        <img src={user} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > นายสมชาย ชาติชาย (AH)  </span>
                                                    </div>
                                                    <div style={{ paddingTop: '4%' }}>
                                                        <img src={calender} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > 10/10/2020 08:30 - 16:30  </span>
                                                    </div>
                                                    <div style={{ paddingTop: '4%', paddingLeft: '1.5%' }}>
                                                        <img src={location} /> <span className='font' style={{ position: 'relative', paddingLeft: '4.5%' }} > AHR ระยอง  </span>
                                                    </div>
                                                    <div style={{ paddingTop: '4%' }}>
                                                        <img src={message} /> <span className='font' style={{ position: 'relative', paddingLeft: '4%' }} > ส่งของ  </span>
                                                    </div>
                                                    <div style={{ paddingTop: '4%' }}>
                                                        <img src={detail} /> <span className='font' style={{ color: '#47F044', position: 'relative', paddingLeft: '4%' }} > ดูรายละเอียดเพิ่มเติม </span>
                                                    </div>

                                                </Card>
                                            </div>
                                        )}
                                    </Draggable>

                                )}

                                {provided.placeholder}
                            </div>
                        )}

                    </Droppable>
                </div>

            </div>


        </div>

    )
}

const Car = ({ testt }) => {

    const [state, setState] = React.useContext(DataContext);
    const { Option } = Select
    const { innerHeight, innerWidth } = window
    const [pastTest, setpastTest] = useState({ test2: state.test2, test: state.test })
    // if (!state.test2[0]) {
    //     alert('true')
    // }
    // React.useEffect(()=>{
    //      pastTest = state.test2

    // },[])
    const clearData = () => {
        console.log('click clear Data');
        // setState({ ...state, test2: [] });
        setState({ ...state, test: pastTest.test, test2: pastTest.test2 });
        console.log(pastTest);
        console.log(state.test2);
    }

    if (innerWidth <= 575) {
        var device = 'horizontal'
    } else {
        var device = 'vertical'
    }
    return (
        <div className='horizonScroll'>
            <div className='ScrollCar'>

                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (

                        <div
                            className='dragRequest'
                            ref={provided.innerRef}
                        // style={getListStyle(snapshot.isDraggingOver)}
                        >


                            <Card className='cardMobile' style={{ paddingBottom: "16px", backgroundColor: '#FFF', borderColor: '#000000', borderRadius: '20px', border: '1px solid rgba(0, 0, 0, .38)' }}>
                                <Row gutter={{ xs: 16, sm: 16 }}>
                                    <Col xs={{ span: 24 }} sm={{ span: 5 }} align='center'>
                                        <div className='carPos' >
                                            <img src={mockCar} style={{ width: 'auto' }} />
                                            <p className='carfont' style={{ paddingTop: '2px' }}> บย-1568 ชลบุรี</p>
                                        </div>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 5 }} aling='left'>
                                        <div >
                                            <p className='carfont text'> คนขับรถ
                                           <span className='carfont'>
                                                    <Select size='large'
                                                        style={{ fontFamily: 'Bai Jamjuree' }}
                                                        className='selectWidth'
                                                        showSearch
                                                        placeholder="เลือกบริษัท"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        <Option style={{ fontSize: '1vw', padding: '4px' }} value="jack">Jack</Option>
                                                        <Option style={{ fontSize: '1vw', padding: '4px' }} value="jack" value="lucy">Lucy</Option>
                                                        <Option style={{ fontSize: '1vw', padding: '4px' }} value="jack" value="tom">Tom</Option>
                                                    </Select>

                                                </span>
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 7 }} >
                                        <div className='Scroll'>

                                            {state.test2.map((res, index) =>
                                                <Draggable
                                                    key={(res + 10) * (res + 1) + 50}
                                                    draggableId={`test${res + 1 * res + 10 + 5}`}
                                                    index={index}
                                                >
                                                    {provided => (
                                                        <div
                                                            // style={{ width: '100%' }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                        >
                                                            <div className='font' style={{ position: 'relative', width: '100%', background: '#1D366D', borderRadius: '10px', zIndex: '2', width: '100%', paddingTop: '8%', paddingLeft: '8%', paddingBottom: '2%', marginTop: '4%' }} >
                                                                <img src={dragicon} {...provided.dragHandleProps} style={{ position: 'absolute', top: '50%', right: '0%', transform: 'translate(-50%,-50%)' }} />
                                                                <p>AHR ระยอง</p>
                                                                <p>8:30 - 16:30</p>
                                                            </div>


                                                        </div>
                                                    )}
                                                </Draggable>
                                            )}

                                        </div>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 7 }}  >
                                        <div className='posGeneralBtn'  >
                                            <span>  <Button className='fontGeneralBtn' onClick={() => clearData()} style={{ backgroundColor: '#40A9FF', color: '#FFF' }}  ><img src={cleardata} /><span style={{ paddingLeft: '8px' }}>เคลียค่า</span></Button> &nbsp;
                          <Button className='fontGeneralBtn' style={{ backgroundColor: '#2CC84D', color: '#FFF' }}  > <img src={senddatabtn} /><span style={{ paddingLeft: '8px' }}>มอบหมายงาน</span></Button></span>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>




                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>




            </div>
        </div>
    )
}

const General = () => {
    const [state, setState] = React.useContext(DataContext);
    const [sidebar, setSidebar] = useState(true)
    const wrapperRef = useRef(null);

    // const [test2, setTest2] = useState([0, 1, 2])
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);

        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        // console.log(removed);
        destClone.splice(droppableDestination.index, 0, removed);
        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        // console.log(result);
        return { result, removed };
    };

    const getList = id => {
        console.log(id);
        if (id == 'droppable1') return state.test //return state from component
        else return state.test2
    }
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);

        console.log(result);
        const [removed] = result.splice(startIndex, 1);
        console.log(removed);
        result.splice(endIndex, 0, removed);
        console.log(result);
        return result;
    };
    const onDragEnd = result => {
        // console.log(result);
        const { source, destination } = result;
        // console.log(source, destination);
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            console.log(getList(source.droppableId),
                source.index,
                destination.index);
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );
            console.log(items);
            if (source.droppableId === 'droppable1') {
                setState({ ...state, test: items })
            }
            // if (source.droppableId === 'droppable2') {
            //     // setRick(items)
            // }
        }
        else {
            console.log(source, destination);
            console.log(getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination);
            const { result, removed } = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
            console.log(result);
            console.log(removed);
            // if (destination.droppableId != 'droppable1') {
            // socket.emit(removed.username, removed);
            // }
            console.log('result', result.droppable1, result.droppable2);
            setState({ test2: result.droppable2, test: result.droppable1 })
            // setTest(result.droppable1)
            // setTest2(result.droppable2)
            // setMorty(result.droppable1)
            // setRick(result.droppable2)

        }
    };
    // console.log(state);
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

    // console.log(test);
    return (
        <div >
            <div className={!sidebar == true ? 'test' : 'red' }></div>
            <Row  style={{ color: 'black' }}>
                <Col span={24} >
                    <div >

                        <div className='padDate' style={{ marginBottom: '16px', fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }} >
                            <p style={{ paddingTop: '4px' }} >{new moment().format('DD-MM-YYYY')}  </p>



                            <div style={{ position: 'relative' }}>
                                <img style={{ height: '16px', width: '16px' }} src={countRequest} /> 999 รายการ <span >
                                    <Button onClick={() => { toggleSidebar() }} style={{ fontSize: '1em', backgroundColor: '#1D366D', color: '#FFFFFF', borderRadius: '20px' }}><img src={filer} /> <span style={{ paddingLeft: '8px' }}></span>กรอง</Button>
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
            <div className='margin font'>
                <DragDropContext onDragEnd={onDragEnd}>


                    <Row gutter={{ xs: 16, sm: 16 }}>
                        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                            <RequestCar test={state.test} />

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