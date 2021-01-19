import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Input } from 'antd';
import password from './asset/password1.png'
import car from './asset/login.png'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { loginCheck, checkBookingById, updateManangerStatus } from './util/index.js'
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
const Approve = () => {

    const [screen, setScreen] = useState(null)
    // let params = new URLSearchParams(document.location.search.substring(1));
    // let name = params.get("name")
    // let history = useHistory();
    // const path = window.location.origin;
    // console.log(path);
    let { id, uuid } = useParams();
    // const [booking,setBooking] = React.useState()
    React.useMemo(async () => {

        await checkBookingById(id).then(async res => {
            console.log(res.data[0], uuid);
            if (res.data[0].uuid == uuid) {
                await updateManangerStatus(id).then(d => {
                    console.log(d.data);
                    Swal.fire({

                        icon: 'success',
                        title: 'Approve success',
                        text: `อนุมัติคำขอของ ${d.data.name} สำเร็จ`,
                        showConfirmButton: false,
                        // timer: 1500
                    })
                }
                ).catch(err => {
                    Swal.fire({

                        icon: 'error',
                        title: 'Approve fail',
                        text: 'please try again ',
                        showConfirmButton: false,
                        // timer: 1500
                    })
                })
            } else {
                window.open(window.location.origin, "_self");
                // window.close();
            }

            // setBooking(res)
        })
    })

    return (
        <div>
            {/* {id} */}

            {/* <h1 style={{ fontFamily: 'Bai Jamjuree', marginLeft: '2em', fontSize: '3em', marginTop: '16%' }}>{language == 'TH' ? 'เข้าสู่ระบบ' : 'Sign In'}</h1>
                <Row justify='end' style={{ marginRight: '16vw' }}>
                    <Col>
                        <p onClick={() => { switchLanguage('EN') }}
                            style={language == 'TH' ? { cursor: 'pointer', fontWeight: 'normal' } : { cursor: 'pointer', fontWeight: 'Bold' }}
                        >EN </p>
                    </Col>
                    <Col>
                        <p>  &nbsp; | &nbsp; </p>

                    </Col>
                    <Col>
                        <p onClick={() => { switchLanguage('TH') }}
                            style={language == 'TH' ? { cursor: 'pointer', fontWeight: 'Bold' } : { cursor: 'pointer', fontWeight: 'normal' }}
                        >TH</p>

                    </Col>
                    <div style={{ marginLeft: '5em' }}>
                        <Input style={{ fontSize: 'Bai Jamjuree' }} onChange={(e) => { setData({ ...data, username: e.target.value }) }} placeholder={language == 'TH' ? 'ชื่อผู้ใช้' : 'Username'} />
                        <Input.Password style={{ marginTop: '24px', border: ' 1px solid #d9d9d9', borderRadius: '8px' }} onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                            placeholder={language == 'TH' ? 'รหัสผ่าน' : 'Password'}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <button style={{ border: '1.5px solid ', borderColor: '#1D366D', borderRadius: '10px', color: '#1D366D', padding: '3px 12px ' }}> {language == 'TH' ? 'สมัครสมาชิก' : 'Register'}</button>

                        <button onClick={(e) => onLogin(e)} style={{ marginLeft: '8px', backgroundColor: '#1D366D', borderRadius: '10px', color: '#FFF', border: '0', padding: '4px 12px ' }}> {language == 'TH' ? 'เข้าสู่ระบบ' : 'Sign In'}</button>

                    </div>
                </Row>
                <img src={car} style={{ position: 'absolute', width: '80vw', bottom: '8vh', left: '10vw', height: '40vh' }} /> */}
        </div>
    )
}


export default Approve