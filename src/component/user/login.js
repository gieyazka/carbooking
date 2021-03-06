import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Input } from 'antd';
import password from '../asset/password1.png'
import car from '../asset/login.svg'
import loadingLogin from '../asset/wheel.gif'
import carBookingCover from '../asset/carBookingCover.svg'
import CoverCar from './coverCar.js'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { loginCheck, sendFirebaseNotification } from '../util/index.js'
import { Redirect, useHistory, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import GifLoader from 'react-gif-loader';
import { motion } from "framer-motion"
const Login = () => {

    const [screen, setScreen] = useState(null)
    const [data, setData] = useState({
        username: null,
        password: null,
    })
    const [loading, setloading] = useState(false)
    // console.log(innerHeight,innerWidth);
    useEffect(() => {
        if (window.innerWidth <= 575) {
            setScreen(true)
        } else {
            setScreen(false)
        }
    }, [window.innerWidth])
    const [language, setLanguage] = useState('EN')
    const switchLanguage = (lang) => {
        if (lang == 'EN') {
            setLanguage('EN')
        } else {
            setLanguage('TH')
        }
    }
    // useEffect(async() => {
    //     await sendFirebaseNotification(1)
    // }, [])
    // console.log(data)
    let history = useHistory();
    const onLogin = (e) => {
        e.preventDefault();
        setloading(true)
        loginCheck(data.username, data.password).then(res => {
            if (res.err) {
                setloading(false)
                Swal.fire({

                    icon: 'error',
                    title: language == 'TH' ? 'เข้าสู้ระบบไม่สำเร็จ' : 'Login Failed',
                    text: language == 'TH' ? 'กรุณาตรวจสอบ username และ password' : 'Please check your username and password',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                // console.log(19980513);
                let dataUser
                console.log(res.data.user.custom_role);
                if (res.data.user.custom_role == null) {
                    dataUser = 'user'

                } else if (res.data.user.custom_role.car_role == null) {
                    dataUser = 'user'
                } else {
                    dataUser = res.data.user.custom_role.car_role
                }
                setloading(false)

                const user = {
                    username: res.data.user.username,
                    company: res.data.user.company,
                    emp_id: res.data.user.empID,
                    role: dataUser
                }
                sessionStorage.setItem('user', JSON.stringify(user));
                Swal.fire({
                    icon: 'success',
                    title: language == 'TH' ? 'เข้าสู่ระบบสำเร็จ' : 'Login Success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    history.push('/user')

                })
            }
        }).catch(err => {
            setloading(false)

            console.log('err', err)
        })
    }
    React.useMemo(() => {
        if (sessionStorage.getItem("user")) {
            history.push('/user')
        }
    }, [])
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowDimensions;
    }
    useWindowDimensions();
    const h1Variant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                // repeat: Infinity, ease: easeInOut,
            },

        }
    }
    if (!screen) {
        return (

            <div style={{ width: '100vw', height: '100vh' }} >

                <GifLoader
                    loading={loading}
                    imageSrc={loadingLogin}
                    imageStyle={{
                        borderRadius: '10px', top: '50%',
                        left: '50%',
                        position: 'absolute',
                        transform: 'translate(-50%, -50%)'
                    }}
                    overlayBackground="rgba(0,0,0,0.5)"
                />
                <div >
                    <Row style={{ fontFamily: "Bai Jamjuree" }}>
                        <Col>
                            <div style={{ position: 'relative', backgroundColor: '#E5E5E5', height: '100vh', width: '75vw' }}>
                                <motion.h1
                                    variants={h1Variant}
                                    initial='hidden' animate='visible' style={{ color: '#1D366D', position: 'absolute', top: '12vh', left: '8vw', zIndex: 5 }}>Car Booking System</motion.h1>
                                {/* <div style={{ position: 'absolute', left: '-20vw', height: '50%',width : '100vw', zIndex: 1, bottom: '50vh' }}> */}
                                <CoverCar width='70vw' height='70vh' />
                                {/* </div> */}
                                {/* <img src={car} style={{ position: 'absolute', width: '43vw', bottom: '16vh', left: '8vw', height: '50%' }} /> */}
                            </div>
                        </Col>
                        <div style={{ position: 'absolute', right: '0', backgroundColor: '#1D366D', height: '100vh', width: '25vw' }}></div>

                        <Card style={{ zIndex: 20, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), -4px -4px 4px rgba(0, 0, 0, 0.05)', position: 'fixed', right: '12.5vw', top: '12vh', width: '24vw', paddingBottom: '20vh' }}>
                            <h1 style={{ textAlign: 'center', marginTop: '16%' }}>{language == 'TH' ? 'เข้าสู่ระบบ' : 'Sign In'}</h1>
                            <Row style={{ zIndex: 20 }} justify='end'>
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
                            </Row>
                            <form onSubmit={(e) => onLogin(e)}>
                                <Input style={{ fontSize: 'Bai Jamjuree' }} onChange={(e) => { setData({ ...data, username: e.target.value }) }} placeholder={language == 'TH' ? 'ชื่อผู้ใช้' : 'Username'} />
                                <Input.Password style={{ marginTop: '24px', border: ' 1px solid #d9d9d9', borderRadius: '8px' }} onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                                    placeholder={language == 'TH' ? 'รหัสผ่าน' : 'Password'}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                                <div style={{ marginTop: '24px', textAlign: 'right' }}>
                                    <button type='button' onClick={() => { window.open('https://ess.aapico.com/#/register') }} style={{ cursor: 'pointer', border: '1.5px solid ', backgroundColor: '#FFFFFF', borderColor: '#1D366D', borderRadius: '10px', color: '#1D366D', padding: '3px 12px ' }}> {language == 'TH' ? 'สมัครสมาชิก' : 'Register'}</button>

                                    <button type="submit" onClick={(e) => onLogin(e)} style={{ zIndex: 5, cursor: 'pointer', marginLeft: '8px', backgroundColor: '#1D366D', borderRadius: '10px', color: '#FFF', border: '0', padding: '4px 12px ' }}> {language == 'TH' ? 'เข้าสู่ระบบ' : 'Sign In'}</button>

                                </div>
                            </form>
                        </Card>
                    </Row>
                </div>

            </div>
        )
    } else {
        return (
            <div>
                <h1 style={{ textAlign: 'center', fontFamily: 'Bai Jamjuree', fontSize: '3em', marginTop: '6%' }}>{language == 'TH' ? 'เข้าสู่ระบบ' : 'Sign In'}</h1>
                <Row justify='center' style={{ width: '100vw', zIndex: 9 }}>
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
                    <div style={{ padding: '16px' }}>
                        <Input style={{ fontSize: 'Bai Jamjuree' }} onChange={(e) => { setData({ ...data, username: e.target.value }) }} placeholder={language == 'TH' ? 'ชื่อผู้ใช้' : 'Username'} />
                        <Input.Password style={{ marginTop: '24px', border: ' 1px solid #d9d9d9', borderRadius: '8px' }} onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                            placeholder={language == 'TH' ? 'รหัสผ่าน' : 'Password'}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <button onClick={() => { window.open('https://ess.aapico.com/#/register') }} style={{ zIndex: 999, border: '1.5px solid ', borderColor: '#1D366D', borderRadius: '10px', color: '#1D366D', padding: '3px 12px ', backgroundColor: '#FFF' }}> {language == 'TH' ? 'สมัครสมาชิก' : 'Register'}</button>

                        <button onClick={(e) => onLogin(e)} style={{ zIndex: '5', marginLeft: '8px', backgroundColor: '#1D366D', borderRadius: '10px', color: '#FFF', border: '0', padding: '4px 12px ' }}> {language == 'TH' ? 'เข้าสู่ระบบ' : 'Sign In'}</button>

                    </div>
                    <CoverCar width='100vw' height='70vh' />

                </Row>


                {/* <img src={car} style={{ zIndex: '-1', position: 'absolute', width: '80vw', top: '400px', left: '10vw', height: '40vh' }} /> */}
            </div >
        )
    }
}

export default Login