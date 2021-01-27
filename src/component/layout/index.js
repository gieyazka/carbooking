import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Formrequest from '../form/formrequest'
import Dispatch from '../dispatch/general'
import View from '../dispatch/view'
import History from '../dispatch/history'
import Hrapprove from '../hr/hrapprove'
import firebase from '../firebase'
import ManageDriver from '../driver/managedriver'
import Trip from '../driver/driverTrip'
import Car from '../car/car'
import logout from '../asset/logout.png'
import Login from '../login'
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
    HistoryOutlined
} from '@ant-design/icons';
import { DataContext } from "../store/store"
import { getSubscriberByempId, updateSubscriber, addSubscriber } from "../util"
import dataProvince from '../../province.json'

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    let history = useHistory();

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
        const location = useLocation();
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
        console.log(window.localStorage.carbookingKey);
        if (JSON.parse(sessionStorage.getItem('user'))) {
            await getSubscriberByempId(JSON.parse(sessionStorage.getItem('user')).emp_id).then(async res => {
                console.log(res);

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

        // console.log(token)
        // })
        // .catch(function (err) {

        //     console.log("Unable to get permission to notify.", err);
        // });

    }, [])
    React.useMemo(() => {
        const loginData = JSON.parse(sessionStorage.getItem('user'));
        setLogin(loginData);
        if (!loginData) {
            sessionStorage.clear();
            history.push('/login')
        }



    }, [])
    // console.log(loginState);
    // console.log(loginData.role);

    // console.log(JSON.parse(sessionStorage.getItem('user')))

    return (


        <Layout >
            <Sider theme="dark" breakpoint="lg" collapsedWidth="0" style={{ backgroundColor: '#1D366D' }} trigger={null} collapsible collapsed={state.collapsed}>
                <div style={!state.collapsed ? { color: '#FFF', position: 'absolute', paddingTop: '3vh', top: '0vh', left: '100%', backgroundColor: '#1D366D', height: '100vh' } : null}> {state.collapsed ? null : React.createElement(MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                })}</div>
                <div className="logo" style={{ position: 'relative', fontSize: '1.5em', textAlign: 'center', width: 'auto', color: '#FFF' }}>

                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentPath]} style={{ backgroundColor: '#1D366D', color: 'white' }}  >
                    <Menu.Item key="requestform" icon={<FormOutlined />}>
                        Request form<Link to="/user" />
                    </Menu.Item>
                    {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Menu.Item key="dispatch" icon={<SelectOutlined />}>
                        dispatch<Link to="/user/dispatch" />
                    </Menu.Item> : null}
                    {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Menu.Item key="view" icon={<FolderViewOutlined />}>
                        View Job<Link to="/user/view" />
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
                    {loginState ? <Menu.Item key="trip" icon={<CarOutlined
                    />}>
                        Trips<Link to="/user/trip" />
                    </Menu.Item> : null}
                    {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Menu.Item key="history" icon={<HistoryOutlined
                    />}>
                        History<Link to="/user/history" />
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
                    <Switch>
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/view" component={View} /> : null}
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/dispatch" component={Dispatch} /> : null}
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/driver" component={ManageDriver} /> : null}
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/history" component={History} /> : null}
                        {loginState && loginState.role == 'hr' || loginState && loginState.role == 'admin' ? <Route path="/user/hr" component={Hrapprove} /> : null}
                        {loginState ? <Route path="/user/trip" component={Trip} /> : null}
                        {loginState && loginState.role == 'dispatcher' || loginState && loginState.role == 'admin' ? <Route path="/user/car" component={Car} /> : null}
                        <Route exact path="/user" component={Formrequest} />
                        <Route path="*" component={Formrequest} />
                    </Switch>
                    {/* <Formrequest /> */}
                </Content>
            </Layout>
        </Layout>

    );
}



export default AppLayout;