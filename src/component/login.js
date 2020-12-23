import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Input } from 'antd';
import password from './asset/password1.png'
import car from './asset/login.png'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const Login = () => {

    const [screen, setScreen] = useState(null)
    const [data, setData] = useState({
        username : null,
        password : null,
    })
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
    // console.log(data)


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
    if (!screen) {
        return (

            <div >
                {/* <div>
                width: {width} ~ height: {height}
            </div> */}
                <div >
                    <Row style={{ fontFamily: "Bai Jamjuree" }}>
                        <Col>
                            <div style={{ backgroundColor: '#E5E5E5', height: '100vh', width: '75vw' }}>
                                <h1 style={{ color: '#1D366D', position: 'absolute', top: '12vh', left: '8vw' }}>Car Booking System</h1>

                                <img src={car} style={{ position: 'absolute', width: '43vw', bottom: '16vh', left: '8vw', height: '50%' }} />
                            </div>
                        </Col>
                        <Col>
                            <div style={{ backgroundColor: '#1D366D', height: '100vh', width: '25vw' }}></div>
                        </Col>
                        <Card style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), -4px -4px 4px rgba(0, 0, 0, 0.05)', position: 'fixed', right: '12.5vw', top: '12vh', width: '24vw', paddingBottom: '20vh' }}>
                            <h1 style={{ textAlign: 'center', marginTop: '16%' }}>{language == 'TH' ? 'เข้าสู่ระบบ' : 'Sign In'}</h1>
                            <Row justify='end'>
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
                            <Input style={{ fontSize: 'Bai Jamjuree' }} onChange={(e) => { setData({...data,username : e.target.value}) }} placeholder={language == 'TH' ? 'ชื่อผู้ใช้' : 'Username'} />
                            <Input.Password style={{ marginTop: '24px', border: ' 1px solid #d9d9d9', borderRadius: '8px' }}  onChange={(e) => { setData({...data,password : e.target.value}) }}
                                placeholder={language == 'TH' ? 'รหัสผ่าน' : 'Password'}
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                            <div style={{ marginTop: '24px', textAlign: 'right' }}>
                                <button style={{ border: '1.5px solid ', borderColor: '#1D366D', borderRadius: '10px', color: '#1D366D', padding: '3px 12px ' }}> {language == 'TH' ? 'สมัครสมาชิก' : 'Register'}</button>

                                <button style={{ marginLeft: '8px', backgroundColor: '#1D366D', borderRadius: '10px', color: '#FFF', border: '0', padding: '4px 12px ' }}> {language == 'TH' ? 'เข้าสู่ระบบ' : 'Sing In'}</button>

                            </div>
                        </Card>
                    </Row>
                </div>

            </div>
        )
    } else {
        return (
            <div>
                <h1 style={{ fontFamily: 'Bai Jamjuree', marginLeft: '2em', fontSize: '3em', marginTop: '16%' }}>{language == 'TH' ? 'เข้าสู่ระบบ' : 'Sign In'}</h1>
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
                        <Input style={{ fontSize: 'Bai Jamjuree' }}  onChange={(e) => { setData({...data,username : e.target.value}) }} placeholder={language == 'TH' ? 'ชื่อผู้ใช้' : 'Username'} />
                        <Input.Password style={{ marginTop: '24px', border: ' 1px solid #d9d9d9', borderRadius: '8px' }}  onChange={(e) => { setData({...data,password : e.target.value}) }}
                            placeholder={language == 'TH' ? 'รหัสผ่าน' : 'Password'}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <button style={{ border: '1.5px solid ', borderColor: '#1D366D', borderRadius: '10px', color: '#1D366D', padding: '3px 12px ' }}> {language == 'TH' ? 'สมัครสมาชิก' : 'Register'}</button>

                        <button style={{ marginLeft: '8px', backgroundColor: '#1D366D', borderRadius: '10px', color: '#FFF', border: '0', padding: '4px 12px ' }}> {language == 'TH' ? 'เข้าสู่ระบบ' : 'Sing In'}</button>

                    </div>
                </Row>
                <img src={car} style={{ position: 'absolute', width: '80vw', bottom: '8vh', left: '10vw', height: '40vh' }} />
            </div>
        )
    }
}

export default Login