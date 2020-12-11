import React, { useState } from 'react'
import { Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio } from 'antd';
import './formrequest.css'
const FromRequest = () => {
    const { TextArea } = Input;
    const { RangePicker } = TimePicker;
    const { Option } = Select;
    const [value, setValue] = React.useState(1);

    const radioOnChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
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
            <div style={{ backgroundColor: '#1D366D', height: '40px', width: '100%' }}></div>
            <div className='margin font'>
                <Row justify='center'> <h2 style={{ marginTop: '8px' }}>Car Booking</h2>  </Row>
                <Form name="requestForm" onFinish={onFinish} onFinishFailed={onFinishFailed}
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
                                    //  dropdownStyle={{ backgroundColor: 'green' }}
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
                            <p className='font'>ชื่อ - นามสกุล (Full Name)</p>
                            <Form.Item
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >
                                <Input placeholder="ชื่อ - นามสกุล (Full Name)" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>แผนก/ฝ่าย (Sect./Dept.)</p>
                            <Form.Item
                                name="department"
                                rules={[
                                    {
                                        required: true, message: 'กรุณาเลือกแผนก',
                                    },]} >
                                <Select defaultValue="lucy" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>โทรศัพท์มือถือ (Mobile Phone Number)</p>
                            <Form.Item
                                name="mobile_phone"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >
                                <Input placeholder="โทรศัพท์มือถือ (Mobile Phone Number)" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>โทรศัพท์ภายใน (Telephone Number)</p>
                            <Form.Item
                                name="company_phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Input placeholder="โทรศัพท์ภายใน (Telephone Number)" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>วันที่ต้องการ (Date Required)</p>
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
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>เวลา (Time)</p>
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
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>ประเภทรถ (Type of car)</p>
                            <Form.Item
                                name="car_type"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >

                                <Select defaultValue="ประเภทรถ" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>จำนวนคน (Amount)</p>
                            <Form.Item
                                name="amout"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Select defaultValue="จำนวนคน" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>สถานที่ไป (Place)</p>
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
                            <p className='font'>จังหวัด</p>
                            <Form.Item
                                name="province"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Select defaultValue="จังหวัด" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 4 }} >
                            <p className='font'>ต้องการคนขับรถ<br />(Driver Required)</p>

                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 12 }} >

                            <Form.Item
                                name="driver"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value='yes'>ต้องการ (Yes)</Radio> <br></br>
                                    <Radio value='no'>ไม่ต้องการ (No)</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>เหตุผลที่ต้องการใช้รถ (Purpos of using vehicle)</p>
                            <Form.Item
                                name="purpos"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >

                                <Select defaultValue="Other" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p className='font'>อีเมลล์ของหัวหน้า (Manager's Email)</p>
                            <Form.Item
                                name="manager_email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Select defaultValue="Email" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>

                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 24 }} sm={{ span: 16 }} >
                            <p className='font'>รายละเอียดอื่น ๆ (Other comment)</p>
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
                                <Button className='btn' style={{ borderColor: '#FEAB20', color: '#FEAB20' }} >Clear</Button>&nbsp;
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