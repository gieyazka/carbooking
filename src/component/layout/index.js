import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Formrequest from '../form/formrequest'
import Dispatch from '../dispatch/general'
import View from '../dispatch/view'
import Hrapprove from '../hr/hrapprove'
import ManageDriver from '../driver/managedriver'
import Car from '../car/car'
import logout from '../asset/logout.png'
import Login from '../login'
import { Layout, Menu, Select } from 'antd';
import { Route, Link, useLocation, useHistory, Redirect } from "react-router-dom";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { DataContext } from "../store/store"

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

    return (


        <Layout >
            <Sider theme="dark" breakpoint="sm" collapsedWidth="0" style={{ backgroundColor: '#1D366D' }} trigger={null} collapsible collapsed={state.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentPath]} style={{ backgroundColor: '#1D366D', color: 'white' }}  >
                    <Menu.Item key="requestform" icon={<UserOutlined />}>
                        Request form<Link to="/user" />
                    </Menu.Item>
                    <Menu.Item key="dispatch" icon={<VideoCameraOutlined />}>
                        dispatch<Link to="/user/dispatch" />
                    </Menu.Item>
                    <Menu.Item key="view" icon={<VideoCameraOutlined />}>
                        View Job<Link to="/user/view" />
                    </Menu.Item>
                    <Menu.Item key="he" icon={<UploadOutlined />}>
                        Hr Approve<Link to="/user/hr" />
                    </Menu.Item>
                    <Menu.Item key="driver" icon={<UploadOutlined />}>
                        Manage driver<Link to="/user/driver" />
                    </Menu.Item>
                    <Menu.Item key="car" icon={<UploadOutlined />}>
                        Manage car<Link to="/user/car" />
                    </Menu.Item>
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
                    <Route path="/user/view" component={View} />
                    <Route path="/user/dispatch" component={Dispatch} />
                    <Route path="/user/hr" component={Hrapprove} />
                    <Route path="/user/driver" component={ManageDriver} />
                    <Route path="/user/car" component={Car} />
                    <Route exact path="/user" component={Formrequest} />

                    {/* <Formrequest /> */}
                </Content>
            </Layout>
        </Layout>

    );
}



export default AppLayout;