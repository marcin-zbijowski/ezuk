/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { Containers } from './pages/Containers';

const App = () => {
    const { Header, Content, Footer } = Layout;

    return (
        <Router>
            <Layout>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']}>
                        <Menu.Item key="/">
                            <NavLink to="/">Start</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/containers">
                            <NavLink to="/containers">Pojemniki</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/clients">
                            <NavLink to="/clients">Klienci</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/invoices">
                            <NavLink to="/invoices">Faktury</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        {/* <Sider className="site-layout-background" width={200}></Sider> */}
                        <Content
                            css={css`
                                min-height: 280px;
                            `}
                        >
                            <Switch>
                                <Route path="/containers">
                                    <Containers />
                                </Route>
                                <Route path="/clients">Klienci</Route>
                                <Route path="/invoices">Faktury</Route>
                                <Route path="/">eZUK start</Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2020 ZUK Brzesko</Footer>
            </Layout>
        </Router>
    );
};

export default App;
