import React from 'react';
import { useParams } from 'react-router';

import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

import { FIREBASE_DB_URL } from '../../config';


const { Option } = Select;

const EditListItemForm = props => {

    const { id } = useParams();

    const onFinish = values => {

        axios
            .post(`${FIREBASE_DB_URL}lists/${props.userId}/${id}/items.json?auth=${props.accessToken}`, {
                ...values
            })
            .then(resp => {
                props.history.push('/list/' + id);
            })
            .catch(err => {
                console.log(err);
            });
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

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        accessToken: state.auth.token
    }
};


export default connect(mapStateToProps)(EditListItemForm);