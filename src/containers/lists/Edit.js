import React from 'react';

import { Form, Input, Select, Button } from 'antd';


const { Option } = Select;

const Edit = () => {

    const onFinish = values => {
        console.log('Success:', values);
    };


    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            noValidate
        >
            <Form.Item
                label="Heading"
                name="heading"
                rules={[
                    { 
                        required: true, 
                        message: 'Please enter task heading!' 
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true, 
                        message: 'Please enter task description!' 
                    },
                    {
                        min: 6,
                        message: 'Description is too short' 
                    }
                ]}
            >
                <Input.TextArea  />
            </Form.Item>
            <Form.Item
                label="Status"
                name="status"
                rules={[
                    {
                        required: true, 
                        message: 'Select task status' 
                    }
                ]}
            >
                    <Select>
                    <Option value="todo">To Do</Option>
                    <Option value="in_progress">In Progress</Option>
                    <Option value="done">Done</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add New Item
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Edit;