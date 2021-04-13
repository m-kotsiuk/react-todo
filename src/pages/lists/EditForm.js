import React from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';

import { listsActions } from '../../store/actions/index';

import { Form, Input, Button, Typography, Row, Col } from 'antd';

const { Title } = Typography;


const EditForm = props => {

    const { id } = useParams();

    const [form] = Form.useForm();

    const { accessToken, userId, onEditList, lists, history } = props;

    console.log(lists.findIndex(el => el.id === id));

    form.setFieldsValue({
        title: lists[lists.findIndex(el => el.id === id)].title
    });

    const onFinish = values => {
        const { title } = values; 

        onEditList(userId, accessToken, id, title, history);
    };

    return (
        <Row>
            <Col xs={{span: 24}} md={{span: 12}}>
                <Title>Edit list title</Title>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={
                        lists[lists.findIndex(el => el.id === id)].title
                    }
                    noValidate
                    form={form}
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
                        Edit List
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
        accessToken: state.auth.token,
        lists: state.lists.lists
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onEditList: (userId, accessToken, id, title, history) => dispatch(listsActions.editList(userId, accessToken, id, title, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);