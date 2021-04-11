import React from 'react';

import { connect } from 'react-redux';

import { createList } from '../../store/actions/activeList/index';


import { Form, Input, Button, Typography, Row, Col } from 'antd';

import axios from 'axios';

import { FIREBASE_DB_URL } from '../../config';

const { Title } = Typography;


const CreateForm = props => {

    const onFinish = values => {
        const { title } = values; 

        axios
        .post(`${FIREBASE_DB_URL}lists/${props.userId}.json?auth=${props.accessToken}`, {
            title,
            userId: props.userId
        })
        .then(() => {
           props.history.push('/');
        })
        .catch(err => {
            console.log(err);
        });
        
    };


    return (
        <Row>
            <Col xs={{span: 24}} md={{span: 12, offset: 6}}>
                <Title>Create a new list</Title>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    noValidate
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            { 
                                required: true, 
                                message: 'Please enter list title!' 
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Create New List
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        accessToken: state.auth.token
    }
};


export default connect(mapStateToProps)(CreateForm);