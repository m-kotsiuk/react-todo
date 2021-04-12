import React from 'react';

import { connect } from 'react-redux';

import { listsActions } from '../../store/actions/index';

import { Form, Input, Button, Typography, Row, Col } from 'antd';

const { Title } = Typography;


const CreateForm = props => {

    const { history, userId, accessToken, onCreateList } = props;

    const onFinish = values => {
        const { title } = values; 
        onCreateList(userId, accessToken, title, history);
    };


    return (
        <Row justify="start">
            <Col xs={{span: 24}} md={{span: 12}}>
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


const mapDispatchToProps = dispatch => {
    return {
        onCreateList: (userId, accessToken, listTitle, history) => dispatch(listsActions.createList(userId, accessToken, listTitle, history))
    };
};
  


export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);