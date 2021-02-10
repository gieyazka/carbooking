import React, { useState, useForm } from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Row, Col, Select, Button, DatePicker, Space, TimePicker, Radio } from 'antd';
import { BrowserRouter as Router, Route, Link, useLocation, useHistory } from "react-router-dom";
import './formrequest.css'
import dataProvince from '../../province.json'
import moment from 'moment';
import { saveBooking, sendEmail, getDepartment, getManagerEmail, getEmployeeById } from '../util/index'
import Swal from 'sweetalert2'
import { DataContext } from "../store/store"
import loadingLogin from '../asset/wheel.gif'
import addForm from '../asset/addForm.png'
import deleteForm from '../asset/deleteForm.png'

import { motion, AnimatePresence } from 'framer-motion'

const FromRequest = () => {
    let history = useHistory();
    const { Search } = Input;
    const [form] = Form.useForm();
    const [state, setState] = React.useContext(DataContext);
    const { TextArea } = Input;
    const { RangePicker } = TimePicker;
    const { Option } = Select;
    const [comment, setComment] = React.useState(true);
    const [formDropdown, setFormDropdown] = React.useState({
        department: [],
        managerEmail: null,

    });
    const [destState, setDestState] = useState([{}])
    const [loading, setloading] = useState(false)
    React.useMemo(() => {
        var provinceArray = []

        var i = 0
        for (const data in dataProvince) {
            provinceArray.push(<Option key={i} value={dataProvince[data].name.th}>{dataProvince[data].name.th}</Option>);
            i++
        }
        let typeCar = []
        typeCar.push(<Option key={0} value='Car (เก๋ง)'>Car (เก๋ง)</Option>);
        typeCar.push(<Option key={1} value='Pick up (กระบะ)'>Pick up (กระบะ)</Option>);
        typeCar.push(<Option key={2} value='Bus (ตู้)'>Bus (ตู้)</Option>);
        typeCar.push(<Option key={3} value='PPV'>PPV</Option>);
        typeCar.push(<Option key={4} value='SUV'>SUV</Option>);
        setState({ ...state, province: provinceArray, typeCar: typeCar })
    }, [])
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
    const radioOnChange = e => {
        setState({ ...state, radiocheck: e.target.value })
    };
    const purposChange = value => {
        if (value == 'Other') {
            setComment(false)
        } else {
            setComment(true)
            form.setFieldsValue({
                other_purpos: null,
            });
        }
    }
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    const addFormData = (v) => {
        let data = [...destState]
        // for (let i = 0; i <= v; i++) {
        data.push({})

        // }
        setDestState(data)
    }
    const removeFormData = () => {
        // console.log('asdsadd');
        let data = [...destState]
        data.pop()
        setDestState(data)
    }
    // console.log(formDropdown);
    const onFinish = async (values) => {
        // console.log(values);
        setloading(true)

        let place = [], province = []
        values.place.map(res => {

            place.push(res)
        })
        values.province.map(res => {

            province.push(res)
        })
        values.place = JSON.stringify(place)
        values.province = JSON.stringify(province)
        // console.log(values);

        // return

        if (values.purpos == 'Other') {
            values.purpos = values.other_purpos
        }
        values.mobile_phone = values.mobile_phone.replaceAll('-', '')
        const saveForm = await saveBooking(values).then(res => {
            setloading(false)
            Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // form.resetFields()
                history.push('/user/status')

            })
        }).catch(err => {
            setloading(false)
            Swal.fire({
                icon: 'error',
                title: 'บันทึกไม่สำเร็จ',
                text: 'กรุณาลองใหม่อีกครั้ง',
                showConfirmButton: false,
                timer: 1500
            })
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    function disabledDate(current) {
        // Can not select days before today and today

        return current && current < moment().subtract('1', 'days').endOf('day');
    }
    const handleCompanyChange = async (department) => {
        // console.log(JSON.parse(sessionStorage.getItem('user')).company);
        // console.log(department);
        await getManagerEmail(formDropdown.company, department)
            .then(res => {
                // console.log(res[0].Approver)
                console.log(res);
                if (res[0]) {
                    let managerName = res[0].Approver.split("|");
                    setFormDropdown({ ...formDropdown, managerEmail: `${managerName[0]}@aapico.com` })

                }
                // console.log(`${managerName[0]}@aapico.com`);

            })
    }
    const rangePickerRef = React.useRef();
    const onBlur = () => {
        const rangePickerDomNode = ReactDOM.findDOMNode(rangePickerRef.current);
        const [startInput, endInput] = rangePickerDomNode.querySelectorAll('.ant-picker-input input');
        console.log(startInput.value);
        if (startInput.value) {
            var startValue = moment(startInput.value, 'HH:mm');

        }
        let endValue = moment(endInput.value, 'HH:mm');
        if (!endValue.isValid()) {
            endValue = null;
        }
        console.log(rangePickerDomNode);
        form.setFieldsValue({
            time: [startValue, endValue]
        });
    };
    const onSearch = async (value) => {
        setloading(true)
        let department = null
        await getEmployeeById(value).then(async res => {
            // console.log(res);
            if (!res) {
                return
            }
            if (res.organize == null) {
                department = res.group_en_desc
            } else {
                department = res.organize.department
            }
            let empDetail = {
                emp_id: res.emp_id,
                department: department,
                company: res.company,
                name: res.eng_name
            }
            let arr = []
            var i = 0
            await getDepartment(empDetail.company).then(r => {
                r.map(res => {
                    // console.log(res);
                    arr.push(<Option key={i} value={res}>{res}</Option>);
                    i++
                })
            })
            setFormDropdown({
                ...formDropdown, department: arr, company: empDetail.company
            })
            form.setFieldsValue({
                company: empDetail.company,
                fullname: empDetail.name
            });
        }).catch(err => err)
        setloading(false)

    }
    React.useEffect(() => {
        form.setFieldsValue({
            manager_email: formDropdown.managerEmail
        });
    }, [formDropdown]);
    return (

        <div >
            <div style={!loading ? { display: 'none' } : { zIndex: 99999, height: 'calc(100vh + 64px)', width: '100%', textAlign: 'center', position: 'fixed', top: '0', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <img src="/carbooking/static/media/wheel.7bfd793f.gif" style={{ borderRadius: '10px', top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }} />
            </div>

            {/* <div style={{ backgroundColor: '#1D366D', height: '40px', width: '100%' }}></div> */}
            <div className='margin fontForm'>

                <Row justify='center'> <h2 style={{ marginTop: '8px', paddingTop: '8px', fontSize: '22px' }}>Car Booking</h2>  </Row>
                <Form name="requestForm" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}
                    initialValues={{ driver: true }}
                >
                    {/* <Row gutter={[24,12]} justify='center'> */}
                    <Row gutter={{ xs: 16, sm: 24 }} justify='center'>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 24 }} sm={{ span: 8 }} >
                            <p>รหัสพนักงาน (Employee Id)</p>
                            <Form.Item
                                name="emp_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกบริษัท',
                                    },]} >
                                <Search placeholder="รหัสพนักงาน (Employee Id)" onSearch={(value) => { onSearch(value) }} enterButton />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 8 }} >
                            <p>บริษัท (Company)</p>
                            <Form.Item
                                name="company"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกบริษัท',
                                    },]} >
                                <Input readOnly={true} placeholder="บริษัท (Company)" style={{ width: '100%' }} />

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p >ชื่อ - นามสกุล (Full Name)</p>
                            <Form.Item
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    }, {
                                        // pattern: new RegExp(/(^[A-Za-zก-๙.]{3,16})([ ]{0,1})([A-Za-zก-๙]{3,16})?([ ]{0,1})?([,A-Za-zก-๙]{3,16})?([ ]{0,1})?([,-Za-zก-๙]{3,16})/),
                                        message: 'pattern invalid',
                                    }]} >
                                <Input readOnly={true} placeholder="ชื่อ - นามสกุล (Full Name)" />
                            </Form.Item>
                            <p >โทรศัพท์มือถือ (Mobile Phone Number)</p>
                            <Form.Item
                                name="mobile_phone"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    }, {
                                        len: 12,
                                        pattern: new RegExp(/(^\d{3})([-]{1})(\d{3})([-]{1})(\d{4})/g),
                                        message: 'pattern invalid'
                                    }]} >
                                <Input maxLength='12' autoComplete="none" onChange={(e) => { checkPhone(e) }} placeholder="โทรศัพท์มือถือ (Mobile Phone Number)" />
                            </Form.Item>
                            <p >วันที่ต้องการ (Date Required)</p>
                            <Form.Item
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >

                                <DatePicker
                                    disabledDate={disabledDate}
                                    placeholder="วันที่ต้องการ (Date Required)"
                                    style={{ width: '100%' }}
                                    onChange={onChange} />

                            </Form.Item>
                            <p >ประเภทรถ (Type of car)</p>
                            <Form.Item
                                name="car_type"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >

                                <Select placeholder="ประเภทรถ (Type of car)" style={{ width: '100%' }} onChange={handleChange} >
                                    {state.typeCar}
                                </Select>

                            </Form.Item>

                            <p >สถานที่ไป (Place)</p>
                            {destState.map((res, index) =>
                            (
                                <Form.Item
                                    name={['place', index]}
                                    rules={[
                                        {
                                            required: true,
                                            message: '*require',
                                        },]} >

                                    <Input placeholder="สถานที่ไป (Place)" />
                                </Form.Item>
                            )
                            )}
                        </Col>



                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p >แผนก/ฝ่าย (Sect./Dept.)</p>
                            <Form.Item
                                name="department"
                                rules={[
                                    {
                                        required: true, message: 'กรุณากรอกแผนก',
                                    },]} >
                                {/* <Input readOnly={true} placeholder="แผนก (Department)" style={{ width: '100%' }} /> */}


                                <Select
                                    showSearch
                                    onChange={(e) => handleCompanyChange(e)}
                                    style={{ width: '100%' }}
                                    placeholder="เลือกแผนก"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >

                                    {formDropdown.department}
                                </Select>
                            </Form.Item>
                            <p >โทรศัพท์ภายใน (Telephone Number)</p>
                            <Form.Item
                                name="company_phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Input autoComplete="none" placeholder="โทรศัพท์ภายใน (Telephone Number)" />
                            </Form.Item>
                            <p >เวลา (Time)</p>
                            <Form.Item
                                name="time"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <RangePicker
                                    onBlur={() => onBlur()} ref={rangePickerRef}
                                    format='HH:mm'
                                />
                            </Form.Item>
                            <p >จำนวนคน (Amount)</p>
                            <Form.Item
                                name="amout"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Select placeholder="จำนวนคน (Amount)" style={{ width: '100%' }} onChange={handleChange} >
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                    <Option value="8">8</Option>
                                    <Option value="9">9</Option>
                                    <Option value="10">10</Option>
                                </Select>
                            </Form.Item>
                            <p >จังหวัด (Province)</p>
                            {destState.map((res, index) =>
                            (
                                <div style={{ position: 'relative' }}>

                                    <Form.Item


                                        name={['province', index]}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'require',
                                            },]} >
                                        <Select
                                            autoComplete="none"
                                            showSearch
                                            style={{ width: 'calc(100% - 36px)' }}
                                            placeholder="จังหวัด (Province)"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {state.province}
                                        </Select>


                                    </Form.Item>
                                    {index === 0
                                        ? <img src={addForm} onClick={() => addFormData()} style={{ position: 'absolute', top: '4px', right: 0, marginLeft: '12px', width: '24px', height: '24px', cursor: 'pointer' }} />
                                        : index === destState.length - 1 ? <img src={deleteForm} onClick={() => removeFormData()} style={{ position: 'absolute', top: '4px', right: 0, cursor: 'pointer', marginLeft: '12px', width: '24px', height: '24px' }} />
                                            : null
                                    }
                                </div>
                            )
                            )}
                        </Col>

                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 6 }} sm={{ span: 4 }} >
                            <p >ต้องการคนขับรถ<br />(Driver Required)</p>

                        </Col>
                        <Col xs={{ span: 6 }} sm={{ span: 4 }} >

                            <Form.Item
                                name="driver"
                                rules={[
                                    {
                                        required: true,
                                        message: 'require',
                                    },]} >
                                <Radio.Group onChange={radioOnChange} >
                                    <Radio value={true}>ต้องการ (Yes)</Radio> <br></br>
                                    <Radio value={false}>ไม่ต้องการ (No)</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                            <p >อีเมลล์ของหัวหน้า (Manager's Email)</p>
                            <Form.Item
                                name="manager_email"

                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    }, {
                                        pattern: new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
                                        message: 'Email invalid',
                                    }]}>
                                <Input readOnly={true} placeholder="อีเมลล์ของหัวหน้า (Manager's Email)" style={{ width: '100%' }} onChange={handleChange} >

                                </Input>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p >เหตุผลที่ต้องการใช้รถ (Purpos of using vehicle)</p>
                            <Form.Item
                                name="purpos"
                                rules={[
                                    {
                                        required: true,
                                        message: '*require',
                                    },]} >

                                <Select placeholder="เหตุผลที่ต้องการใช้รถ (Purpos of using vehicle)" style={{ width: '100%' }} onChange={purposChange} >
                                    <Option value="ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร">ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร</Option>
                                    <Option value="ส่งของ">ส่งของ</Option>
                                    <Option value="รับ - ส่งแขก">รับ - ส่งแขก</Option>
                                    <Option value="ติดต่อลูกค้า">ติดต่อลูกค้า</Option>
                                    <Option value="Other">อื่น ๆ</Option>
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }} sm={{ span: 8 }} >
                            <p >ระบุ</p>
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
                            <p >รายละเอียดอื่น ๆ (Other comment)</p>
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