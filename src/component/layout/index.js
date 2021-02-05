import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Formrequest from '../form/formrequest'
import Dispatch from '../dispatch/general'
import View from '../dispatch/view'
import History from '../dispatch/history'
import EditTrips from '../dispatch/editTrip'
import Hrapprove from '../hr/hrapprove'
import firebase from '../firebase'
import ManageDriver from '../driver/managedriver'
import Trip from '../user/trip'
import Status from '../user/status'
import Car from '../car/car'
import logout from '../asset/logout.png'
import Login from '../user/login'
import { Layout, Menu, Select } from 'antd';
import { BrowserRouter as Router, Route, Link, useLocation, useHistory, Redirect, Switch } from "react-router-dom";
import {
    FormOutlined,
    SelectOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    FolderViewOutlined,
    SettingOutlined,
    CarOutlined,
    HistoryOutlined,
    EditOutlined
} from '@ant-design/icons';
import { DataContext } from "../store/store"
import { getSubscriberByempId, updateSubscriber, addSubscriber, getBookingDispatch, getCars, getDrivers, getTrips } from "../util"
import dataProvince from '../../province.json'
import { motion, AnimatePresence } from 'framer-motion'
const { Header, Sider, Content } = Layout;
const testVaraint = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: { duration: 1 }
    }, exit: {
        opacity: 0,
        transition: { ease: "easeInOut" }
    }
}
const { Option } = Select;

const AppLayout = () => {
    const location = useLocation();

    let history = useHistory();
    const [state1, setState1] = useState({
        booking: [],
        cars: [],
        drivers: [],
        trips: [],
        count: 0
    });
    // React.useMemo(() => {

    //   setState({
    //     ...state, province: provinceArray
    //   })
    // }, [])
    React.useMemo(async () => {
        let booking, cars, drivers, trips, countData = 0
        var provinceArray = []

        var i = 0
        for (const data in dataProvince) {
            provinceArray.push(<Option key={i} value={dataProvince[data].name.th}>{dataProvince[data].name.th}</Option>);
            i++
        }
        await getBookingDispatch().then(res => {
            res.map(data => {
                countData += 1
            })
            booking = res
        })
        await getCars().then(res => {
            cars = res
        })
        await getDrivers().then(res => {
            drivers = res
        })
        await getTrips().then(res => {
            trips = res
        })
        var i = 0
        let driverArr = []
        for (const data in drivers) {
            driverArr.push(<Option key={i} value={drivers[data].id}>{drivers[data].name}</Option>);
            i++
        }
        let brandCar = []
        brandCar.push(<Option key={0} value='Toyota'>Toyota</Option>);
        brandCar.push(<Option key={1} value='Honda'>Honda</Option>);
        brandCar.push(<Option key={2} value='Mazda'>Mazda</Option>);
        brandCar.push(<Option key={3} value='Ford'>Ford</Option>);
        brandCar.push(<Option key={4} value='Isuzu'>Isuzu</Option>);
        brandCar.push(<Option key={5} value='Chevrolet'>Chevrolet</Option>);
        brandCar.push(<Option key={6} value='Nissan'>Nissan</Option>);
        brandCar.push(<Option key={7} value='MG'>MG</Option>);
        brandCar.push(<Option key={8} value='Suzuki'>Suzuki</Option>);
        brandCar.push(<Option key={9} value='BMW'>BMW</Option>);
        brandCar.push(<Option key={10} value='Mitsubishi'>Mitsubishi</Option>);
        brandCar.push(<Option key={12} value='Proton'>Proton</Option>);
        brandCar.push(<Option key={12} value='Jeep'>Jeep</Option>);
        brandCar.push(<Option key={13} value='Mercedes-benz'>Mercedes-benz</Option>);
        brandCar.push(<Option key={14} value='Hyundai'>Hyundai</Option>);
        brandCar.push(<Option key={15} value='Lexus'>Lexus</Option>);
        brandCar.push(<Option key={16} value='Mini'>Mini</Option>);
        brandCar.push(<Option key={17} value='Peugeot'>Peugeot</Option>);
        brandCar.push(<Option key={18} value='TATA'>TATA</Option>);
        brandCar.push(<Option key={19} value='Ferrari'>Ferrari</Option>);
        brandCar.push(<Option key={20} value='KIA'>KIA</Option>);
        brandCar.push(<Option key={21} value='Lotus'>Lotus</Option>);
        brandCar.push(<Option key={22} value='McLaren'>McLaren</Option>);
        brandCar.push(<Option key={23} value='Porsche'>Porsche</Option>);
        brandCar.push(<Option key={24} value='Ssangyong'>Ssangyong</Option>);
        brandCar.push(<Option key={25} value='Thairung'>Thairung</Option>);
        brandCar.push(<Option key={26} value='Aston Martin'>Aston Martin</Option>);
        brandCar.push(<Option key={27} value='Aston Martin'>Aston Martin</Option>);
        brandCar.push(<Option key={28} value='Aston Martin'>Aston Martin</Option>);
        brandCar.push(<Option key={29} value='Lambogrini'>Lambogrini</Option>);
        brandCar.push(<Option key={30} value='Maserati'>Maserati</Option>);
        brandCar.push(<Option key={31} value='Mitsuoka'>Mitsuoka</Option>);
        brandCar.push(<Option key={32} value='Audi'>Audi</Option>);
        brandCar.push(<Option key={33} value='Citroen'>Citroen</Option>);
        brandCar.push(<Option key={34} value='Subaru'>Subaru</Option>);
        brandCar.push(<Option key={35} value='Foton'>Foton</Option>);
        brandCar.push(<Option key={36} value='Jaguar'>Jaguar</Option>);
        brandCar.push(<Option key={37} value='Land Rover'>Land Rover</Option>);
        brandCar.push(<Option key={38} value='Rolls-Royce'>Rolls-Royce</Option>);
        brandCar.push(<Option key={39} value='Flokswagen'>Flokswagen</Option>);
        brandCar.push(<Option key={40} value='Bentley'>Bentley</Option>);
        brandCar.push(<Option key={41} value='DFSK'>DFSK</Option>);
        brandCar.push(<Option key={42} value='Skoda'>Skoda</Option>);

        let typeCar = []
        typeCar.push(<Option key={0} value='Car (เก๋ง)'>Car (เก๋ง)</Option>);
        typeCar.push(<Option key={1} value='Pick up (กระบะ)'>Pick up (กระบะ)</Option>);
        typeCar.push(<Option key={2} value='Bus (ตู้)'>Bus (ตู้)</Option>);
        typeCar.push(<Option key={3} value='PPV'>PPV</Option>);
        typeCar.push(<Option key={4} value='SUV'>SUV</Option>);
        setState1({ ...state, province: provinceArray, cars: cars, booking: booking, drivers: driverArr, trips: trips, count: countData, typeCar: typeCar, brandCar: brandCar })
    }, [])

    const [state, setState] = useState({
        collapsed: true,
        path: 1
    })
    const toggle = () => {
        setState({
            ...state, collapsed: !state.collapsed,
        });
    };

    function HeaderView() {

        let path = location.pathname.replace('/', '')
        return path
    }
    const currentPath = HeaderView()

    const onLogout = () => {
        sessionStorage.clear();
        history.push('/login')
    }
    const [loginState, setLogin] = useState()

    React.useEffect(async () => {
        // firebase
        // const messaging = firebase.messaging()
        // const messaging = firebase.messaging();
        // messaging.getToken()
        //     .then(async function (token) {
        //         console.log(token)
        //         if (!window.localStorage.carbookingKey) {
        //             localStorage.setItem('carbookingKey', token);
        //         }
        if (JSON.parse(sessionStorage.getItem('user'))) {
            await getSubscriberByempId(JSON.parse(sessionStorage.getItem('user')).emp_id).then(async res => {

                if (res[0]) {
                    for (const d of res) {
                        // console.log(d);
                        if (d.app_name == 'Carbooking') {
                            // console.log(d.token);
                            if (window.localStorage.carbookingKey !== d.token) {
                                await updateSubscriber(d.id, window.localStorage.carbookingKey)
                            }
                            break;
                        }
                    }
                } else {
                    // console.log(82);
                    await addSubscriber(JSON.parse(sessionStorage.getItem('user')).emp_id, window.localStorage.carbookingKey)
                }

            })
        }


    }, [])
    React.useMemo(() => {
        const loginData = JSON.parse(sessionStorage.getItem('user'));
        setLogin(loginData);
        if (!loginData) {
            sessionStorage.clear();
            history.push('/login')
        }



    }, [])

    return (

        <div >
            <Layout >
                <Sider theme="dark" breakpoint="lg" collapsedWidth="0" style={{ backgroundColor: '#1D366D' }} trigger={null} collapsible collapsed={state.collapsed}>
                    <div style={!state.collapsed ? { color: '#FFF', position: 'absolute', top: '0vh', left: '75%', backgroundColor: '#1D366D', height: '100vh' } : null}> {state.collapsed ? null : React.createElement(MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}</div>
                    {/* <div className="logo" style={{ position: 'relative', fontSize: '1.5em', textAlign: 'center', width: 'auto', color: '#FFF' }}>

                </div> */}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentPath]} style={{ marginTop: '48px', backgroundColor: '#1D366D', color: 'white' }}  >
                        <Menu.Item key="requestform" icon={<FormOutlined />}>
                            Request form<Link to="/user" />
                        </Menu.Item>
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Menu.Item key="dispatch" icon={<SelectOutlined />}>
                            dispatch<Link to="/user/dispatch" />
                        </Menu.Item> : null}
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Menu.Item key="view" icon={<FolderViewOutlined />}>
                            View Job<Link to="/user/view" />
                        </Menu.Item> : null}
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Menu.Item key="editTrip" icon={<EditOutlined />}>
                            Edit trip<Link to="/user/edittrip" />
                        </Menu.Item> : null}
                        {loginState && loginState.role == 'hr' || loginState && loginState.role == 'admin' ? <Menu.Item key="he" icon={<SettingOutlined />}>
                            Hr Approve<Link to="/user/hr" />
                        </Menu.Item> : null}
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Menu.Item key="driver" icon={<SettingOutlined />}>
                            Manage driver<Link to="/user/driver" />
                        </Menu.Item> : null}
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Menu.Item key="car" icon={<CarOutlined
                        />}>
                            Manage car<Link to="/user/car" />
                        </Menu.Item> : null}
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Menu.Item key="history" icon={<HistoryOutlined
                        />}>
                            History<Link to="/user/history" />
                        </Menu.Item> : null}

                        {loginState ? <Menu.Item key="trip" icon={<CarOutlined
                        />}>
                            Trips<Link to="/user/trip" />
                        </Menu.Item> : null}
                        {loginState ? <Menu.Item key="status" icon={<CarOutlined
                        />}>
                            Status<Link to="/user/status" />
                        </Menu.Item> : null}
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ position: 'relative' }}>
                    <img onClick={() => { onLogout() }} style={{ position: 'absolute', top: '18px', right: '2vw', width: '24px', cursor: 'pointer' }} src={logout} />

                    <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#1D366D' }}>
                        {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            height: 'calc(100vh - 64px)',
                        }}
                    >

                        {/* <Route exact path="/" component={Dashboard} /> */}

                        {/* <Route path="/user/view" component={View} /> */}

                        <Switch location={location} key={location.key}>
                            {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/view" component={View} /> : null}
                            {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/edittrip" component={EditTrips} /> : null}
                            {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/dispatch" component={Dispatch} /> : null}
                            {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/driver" component={ManageDriver} /> : null}
                            {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/history" component={History} /> : null}
                            {loginState && loginState.role == 'hr' || loginState && loginState.role == 'admin' ? <Route path="/user/hr" component={Hrapprove} /> : null}
                            {loginState ? <Route path="/user/trip" component={Trip} /> : null}
                            {loginState ? <Route path="/user/status" component={Status} /> : null}
                            {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/car" component={Car} /> : null}
                            <Route exact path="/user" component={Formrequest} />
                            <Route path="*" component={Formrequest} />
                        </Switch>

                        {/* <Formrequest /> */}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}



export default AppLayout;