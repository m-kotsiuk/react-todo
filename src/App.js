import React, { useEffect } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import getRoutes from './routes';
import { authActions } from './store/actions/index';




const App = props => {

  const { isAuthenticated, onLoginAttempt } = props;

  const routes =  getRoutes(isAuthenticated);

  const { Header, Content, Footer } = Layout;

  useEffect(() => {
    onLoginAttempt();
  }, [onLoginAttempt]);

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
          {
            isAuthenticated ?
              (
                <>
                  <Menu.Item icon={<FormOutlined />}>
                    <NavLink
                      to="/"
                      exact
                    >My lists</NavLink>
                  </Menu.Item>
                  <Menu.Item>
                    <NavLink
                      to="/logout"
                      exact
                    >Logout</NavLink>
                  </Menu.Item>
                </>
              )
              :
              (
                <Menu.Item>
                  <NavLink
                    to="/auth"
                    exact
                  >Login/Register</NavLink>
                </Menu.Item>
              )
          }
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