import React from 'react';
import { useParams } from 'react-router';

import { Form, Input, Select, Button } from 'antd';
import { connect } from 'react-redux';

import { listsActions } from '../../store/actions';


const { Option } = Select;

const EditListItemForm = props => {

    const { id, itemId } = useParams();

    const [form] = Form.useForm();

    const { accessToken, userId, onEditListItem, history, lists } = props;

    const targetList = lists[lists.findIndex(el => el.id === id)];

    const targetItem = targetList.items[ targetList.items.findIndex(el => el.id === itemId)];

    const { heading, description, status } = targetItem;

    form.setFieldsValue({
        heading, 
        description, 
        status
    });

    const onFinish = values => {
        onEditListItem(userId, accessToken, id, itemId, values, history);
    };


    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            noValidate
            form={form}
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        accessToken: state.auth.token,
        lists: state.lists.lists
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onEditListItem: (userId, accessToken, listId, itemId, params, history) => dispatch(listsActions.editListItem(userId, accessToken, listId, itemId, params, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditListItemForm)