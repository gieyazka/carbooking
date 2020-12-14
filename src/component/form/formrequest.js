import React, { useState, useForm } from 'react'
import { Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio } from 'antd';
import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
import './formrequest.css'
const FromRequest = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { RangePicker } = TimePicker;
    const { Option } = Select;
    const [comment, setComment] = React.useState(true);
    const [state, setState] = useState({
        companyphone: '0877565422',
        mobilephone: null,
        radiocheck: 'yes'
    });
    

    const checkPhone = e => {
        let value = e.target.value
        value = value.replaceAll('-', '')
        if (value.length > 6) {
            value = value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6)
        } else if (value.length > 3) {
            value = value.slice(0, 3) + "-" + value.slice(3, 6)
        }
        form.setFieldsValue({
            mobile_phone: value,
        });
        setState({ ...state, mobilephone: value })

    }
    // console.log(state);
    const radioOnChange = e => {
        setState({ ...state, radiocheck: e.target.value })
    };
    const purposChange = value => {
        if (value == 'Other') {
            setComment(false)
        } else {
            setComment(true)
            form.setFieldsValue({
                other_purpos : null,
            });
        }
    }
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            {/* <div style={{ backgroundColor: '#1D366D', height: '40px', width: '100%' }}></div> */}
            <div className='margin fontForm'>
                <Row justify='center'> <h2 style={{ marginTop: '8px' }}>Car Booking</h2>  </Row>
                <Form name="requestForm" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}
                    initialValues={{ driver: 'yes' }}
                >
                    {/* <Row gutter={[24,12]} justify='center'> */}
                    <Row gutter={{ xs: 16, sm: 24 }} justify='center'>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 24 }} sm={{ span: 16 }} >
                            <p>บริษัท (Company)</p>
                            <Form.Item
                                name="company"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกบริษัท',
                                    },]} >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="เลือกบริษัท"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='fontForm'>ชื่อ - นามสกุล (Full Name)</p>
                            <Form.Item
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    }, {
                                        pattern: new RegExp(/(^[A-Za-zก-๙.]{3,16})([ ]{0,1})([A-Za-zก-๙]{3,16})?([ ]{0,1})?([,A-Za-zก-๙]{3,16})?([ ]{0,1})?([,-Za-zก-๙]{3,16})/),
                                        message: 'pattern invalid',
                                    }]} >
                                <Input placeholder="ชื่อ - นามสกุล (Full Name)" />
                            </Form.Item>
                            <p className='fontForm'>โทรศัพท์มือถือ (Mobile Phone Number)</p>
                            <Form.Item
                                name="mobile_phone"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },{  
                                        len : 12,
                                        pattern: new RegExp(/(^\d{3})([-]{1})(\d{3})([-]{1})(\d{4})/g),
                                        message : 'pattern invalid'
                                    }]} >
                                <Input onChange={(e) => { checkPhone(e) }} placeholder="โทรศัพท์มือถือ (Mobile Phone Number)" />
                            </Form.Item>
                            <p className='fontForm'>วันที่ต้องการ (Date Required)</p>
                            <Form.Item
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >

                                <DatePicker
                                    placeholder="วันที่ต้องการ (Date Required)"
                                    style={{ width: '100%' }}
                                    onChange={onChange} />

                            </Form.Item>
                            <p className='fontForm'>ประเภทรถ (Type of car)</p>
                            <Form.Item
                                name="car_type"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >

                                <Select placeholder="ประเภทรถ" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>

                            </Form.Item>
                            <p className='fontForm'>สถานที่ไป (Place)</p>
                            <Form.Item
                                name="place"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >

                                <Input placeholder="สถานที่ไป (Place)" />

                            </Form.Item>
                        </Col>



                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='fontForm'>แผนก/ฝ่าย (Sect./Dept.)</p>
                            <Form.Item
                                name="department"
                                rules={[
                                    {
                                        required: true, message: 'กรุณาเลือกแผนก',
                                    },]} >
                                <Select placeholder="เลือกแผนก" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                            <p className='fontForm'>โทรศัพท์ภายใน (Telephone Number)</p>
                            <Form.Item
                                name="company_phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Input placeholder="โทรศัพท์ภายใน (Telephone Number)" />
                            </Form.Item>
                            <p className='fontForm'>เวลา (Time)</p>
                            <Form.Item
                                name="time"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <RangePicker

                                />
                            </Form.Item>
                            <p className='fontForm'>จำนวนคน (Amount)</p>
                            <Form.Item
                                name="amout"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Select placeholder="จำนวนคน" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                            <p className='fontForm'>จังหวัด</p>
                            <Form.Item
                                name="province"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Select placeholder="จังหวัด" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 6 }} sm={{ span: 4 }} >
                            <p className='fontForm'>ต้องการคนขับรถ<br />(Driver Required)</p>

                        </Col>
                        <Col xs={{ span: 6 }} sm={{ span: 4 }} >

                            <Form.Item
                                name="driver"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Radio.Group onChange={radioOnChange} value={state.radiocheck}>
                                    <Radio value='yes'>ต้องการ (Yes)</Radio> <br></br>
                                    <Radio value='no'>ไม่ต้องการ (No)</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                            <p className='fontForm'>อีเมลล์ของหัวหน้า (Manager's Email)</p>
                            <Form.Item
                                name="manager_email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Select placeholder="Email" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='fontForm'>เหตุผลที่ต้องการใช้รถ (Purpos of using vehicle)</p>
                            <Form.Item
                                name="purpos"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >

                                <Select placeholder="???" style={{ width: '100%' }} onChange={purposChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Other">Other</Option>
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                        <p className='fontForm'>ระบุ</p>
                            <Form.Item
                                name="other_purpos"
                                rules={[
                                    {
                                        required: !comment,
                                        message: '*require',
                                    },]} >
                                <Input disabled={comment} placeholder="อื่น ๆ" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 24 }} sm={{ span: 16 }} >
                            <p className='fontForm'>รายละเอียดอื่น ๆ (Other comment)</p>
                            <Form.Item
                                name="comment"
                            >

                                <TextArea rows={4} />

                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 24 }} style={{ position: 'relative', textAlign: 'center' }}>
                            <Form.Item >
                                {/* <span style={{position:'absolute',left:'50%',transform:' translate(-50%,-50%)'}}> */}
                                <Button className='btn' style={{ borderColor: '#FEAB20', color: '#FEAB20' }} onClick={() => form.resetFields()} >Clear</Button>&nbsp;
                                    <Button className='btn' style={{ backgroundColor: '#309E48', color: '#FFFFFF' }} htmlType="submit">
                                    Send
                              </Button>

                                {/* </span> */}
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </div>
        </div>
    )
}

export default FromRequest