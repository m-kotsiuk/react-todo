import React from 'react';

import { Form, Input, Button, Typography, Row, Col } from 'antd';

const { Title } = Typography;


const Create = () => {
    const onFinish = values => {
        console.log('Success:', values);
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

export default Create;