import React, { useEffect } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import getRoutes from './routes';
import { authActions } from './store/actions/index';




const App = props => {

  const { isAuthenticated } = props;

  const routes =  getRoutes(isAuthenticated);

  const { Header, Content, Footer } = Layout;

  useEffect(() => {
    props.onLoginAttempt();
  }, []);

  return (
    <Layout style={{
      minHeight: '100vh',
      background: '#fff'
     }}>
      <Header
        style={{
          background: '#fff'
        }}
       >
        <Menu mode="horizontal">
          <Menu.Item key="lists" icon={<MailOutlined />}>
            <NavLink
              to="/"
              exact
            >My lists</NavLink>
          </Menu.Item>
          {!isAuthenticated && 
          <Menu.Item key="auth">
            <NavLink
              to="/auth"
              exact
            >Login/Register</NavLink>
          </Menu.Item>}
          {isAuthenticated && 
          <Menu.Item>
            <NavLink
              to="/logout"
              exact
            >Logout</NavLink>
          </Menu.Item>}
        </Menu>
      </Header>
      

      <Content style={{ padding: '20px 50px' }}>
        <div className="site-layout-content">
        {routes}
        </div>
      </Content>
      <Footer><strong>Todo lists</strong> &copy;{ new Date().getFullYear() }</Footer>
    </Layout>
  );

};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginAttempt: () => dispatch(authActions.check())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));