import React, { useState } from 'react'

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
import senddatabtn from '../asset/senddatabtn.png'
const RequestCar = ({test}) => {
    // console.log(res);
    
    const {innerHeight,innerWidth} = window
    // console.log(innerHeight,innerWidth);
    if(innerWidth <= 575){
        var device = 'horizontal'
    }else{
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

                                {test.map((res,index) =>
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

const Car = () => {
    const { Option } = Select
    return (
        <div className='horizonScroll'>
            <div className='ScrollCar'>

                <Card className='cardMobile' style={{ backgroundColor: '#FFF', borderColor: '#000000', borderRadius: '20px', border: '1px solid rgba(0, 0, 0, .38)' }}>
                    <Row gutter={{ xs: 16, sm: 16 }}>
                        <Col xs={{ span: 24 }} sm={{ span: 4 }} align='center'>
                            <div >
                                <img src={mockCar} />
                                <p className='carfont' style={{ paddingTop: '2px' }}> บย-1568 ชลบุรี</p>
                            </div>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 6}} aling='center'>
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '1.3vh', }} className='carfont '>  คนขับรถ
                             <Select size='large'
                                        style={{ paddingLeft: '8px', fontSize: '1vw', fontFamily: 'Bai Jamjuree' }}
                                        className='selectWidth'
                                        showSearch
                                        placeholder="เลือกบริษัท"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option style={{ fontSize: '1vw',padding:'4px'}} value="jack">Jack</Option>
                                        <Option style={{ fontSize: '1vw',padding:'4px'}} value="jack"  value="lucy">Lucy</Option>
                                        <Option style={{ fontSize: '1vw',padding:'4px'}} value="jack"  value="tom">Tom</Option>
                                    </Select>

                                </span>
                            </div>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 7 }} >
                            <div className='Scroll'>
                                <div className='font' style={{ position: 'relative', width: '100%', background: '#1D366D', borderRadius: '10px', zIndex: '2', width: '100%', paddingTop: '8%', paddingLeft: '8%', paddingBottom: '2%', marginTop: '4%' }} >
                                    <img src={dragicon} style={{ position: 'absolute', top: '50%', right: '0%', transform: 'translate(-50%,-50%)' }} />
                                    <p>AHR ระยอง</p>
                                    <p>8:30 - 16:30</p>
                                </div>
                                <div className='font' style={{ position: 'relative', width: '100%', background: '#1D366D', borderRadius: '10px', zIndex: '2', width: '100%', paddingTop: '8%', paddingLeft: '8%', paddingBottom: '2%', marginTop: '4%' }} >
                                    <img src={dragicon} style={{ position: 'absolute', top: '50%', right: '0%', transform: 'translate(-50%,-50%)' }} />
                                    <p>AHR ระยอง</p>
                                    <p>8:30 - 16:30</p>
                                </div>

                            </div>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 7 }}  >
                            <div className='posGeneralBtn'  >
                                <span>  <Button className='fontGeneralBtn' style={{ backgroundColor: '#40A9FF', color: '#FFF' }}  ><img src={cleardata} /><span style={{ paddingLeft: '8px' }}>เคลียค่า</span></Button> &nbsp;
                          <Button className='fontGeneralBtn' style={{ backgroundColor: '#2CC84D', color: '#FFF' }}  > <img src={senddatabtn} /><span style={{ paddingLeft: '8px' }}>มอบหมายงาน</span></Button></span>
                            </div>
                        </Col>
                    </Row>
                </Card>




            </div>
        </div>
    )
}

const General = () => {
    const [test,setTest] = useState([0,1,2,3])
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
        if (id == 'droppable1') return test //return state from component
        else return id
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
            console.log( getList(source.droppableId),
            source.index,
            destination.index);
            const items = reorder(
                getList(source.droppableId),
                source.index,  
                destination.index
            );
            console.log(items);
            if (source.droppableId === 'droppable1') {
                setTest(items)
            }
            // if (source.droppableId === 'droppable2') {
            //     // setRick(items)
            // }
        }
        else {
            // console.log(source, destination);
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
            // console.log(result);
            // console.log(removed);
            if (destination.droppableId === 'droppable2') {
                // socket.emit(removed.username, removed);
            }
            // setMorty(result.droppable1)
            // setRick(result.droppable2)

        }
    };
    console.log(test);
    return (
        <div>

            <div className='margin font'>
                <DragDropContext onDragEnd={onDragEnd}>

                    <Row justify='space-between' style={{ color: 'black' }}>
                        <Col><p style={{ fontFamily: 'Bai Jamjuree', fontSize: '1.3em' }}>{new moment().format('DD-MM-YYYY')}</p></Col>

                    </Row>
                    <Row gutter={{ xs: 16, sm: 16 }}>
                        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                            <RequestCar test={test} />

                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
                            <Car />

                        </Col>
                    </Row>

                </DragDropContext>

            </div>

        </div>
    )
}

export default General