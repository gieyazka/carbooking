import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Formrequest from '../form/formrequest'
import Admin from '../admin/general'
import { Layout, Menu } from 'antd';
import {  Route, Link, useLocation } from "react-router-dom";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {

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

        // if (path == 'requestform') {
        //     setState({ ...state, path: 1 })
        // } else if (path == 'requestform') {
        //     setState({ ...state, path: 2 })
        // }
        return path
    }
    const currentPath = HeaderView()
    // console.log(currentPath);
    // React.useEffect(() => {


    // }, [])

    return (
        // <Router>

        <Layout >
            <Sider theme="dark" breakpoint="sm" collapsedWidth="0" style={{ backgroundColor: '#1D366D' }} trigger={null} collapsible collapsed={state.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentPath]} style={{ backgroundColor: '#1D366D', color: 'white' }}  >
                    <Menu.Item key="requestform" icon={<UserOutlined />}>
                        Request form<Link to="/requestform" />
                    </Menu.Item>
                    <Menu.Item key="admin" icon={<VideoCameraOutlined />}>
                        Admin<Link to="/admin" />
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3<Link to="/" />
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#1D366D' }}>
                    {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >

                    {/* <Route exact path="/" component={Dashboard} /> */}
                    <Route path="/requestform" component={Formrequest} />
                    <Route path="/admin" component={Admin} />
                    {/* <Formrequest /> */}
                </Content>
            </Layout>
        </Layout>
        // </Router>
    );
}


export default AppLayout;