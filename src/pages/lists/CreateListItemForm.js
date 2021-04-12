import React from 'react';
import { useParams } from 'react-router';

import { Form, Input, Select, Button } from 'antd';
import { connect } from 'react-redux';

import { listsActions } from '../../store/actions/index';


const { Option } = Select;

const EditListItemForm = props => {

    const { id } = useParams();

    const { accessToken, userId, history, onCreateListItem } = props;

    const onFinish = values => {
        onCreateListItem(userId, accessToken, id, values, history);
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


const mapDispatchToProps = dispatch => {
    return {
        onCreateListItem: (userId, accessToken, id, params, history) => dispatch(listsActions.createListItem(userId, accessToken, id, params, history))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditListItemForm);