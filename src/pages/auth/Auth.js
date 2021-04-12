import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import * as actions from '../../store/actions/auth/index';

const { Title, Link, Text } = Typography;


const Auth = props => {

    const [signupMode, setSignupMode] = useState(true);

    const onFinish = values => {
        const { email, password} = values; 
        props.onAuth(email, password, signupMode);
    };


    const getErrorMessage = text => {
        const hasDivder = text.indexOf(':');

        if (hasDivder > -1) {
            return text.slice(hasDivder + 1, text.length).trim();
        }

        return text;

    };


    return (
        <Row>
            <Col xs={{span: 24}} md={{span: 12, offset: 6}}>
                <Title>{ signupMode ? 'Please create an account!' : 'Please login to your account!' }</Title>

                <p>{ signupMode ? 'Already have an account?' : 'Don\'t have an account?' } <Link onClick={() => setSignupMode(!signupMode)}>{ signupMode ? 'Log In' : 'Sing Up' }</Link></p> 
                {props.error && <p><Text type="danger">{ getErrorMessage(props.error.message) }</Text></p>} 
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    noValidate
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { 
                                required: true, 
                                message: 'Please enter your email!' 
                            },
                            {
                                type: 'email',
                                message: 'Please enter valid email address!' 
                            }
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true, 
                                message: 'Please enter your password!' 
                            },
                            {
                                min: 6,
                                message: 'Password is too short!' 
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {
                        
                        signupMode &&  <Form.Item
                            label="Repeat password"
                            name="repeat_password"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true, 
                                    message: 'Please repeat your password!' 
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                      },
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    }
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signupMode) => dispatch(actions.auth(email, password, signupMode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);