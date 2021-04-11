import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';

import { Form, Input, Button, Typography, Row, Col } from 'antd';
import { FIREBASE_DB_URL } from '../../config';

const { Title } = Typography;


const EditForm = props => {

    const { id } = useParams();

    const [title, setTitle] = useState('');

    const [form] = Form.useForm();

    useEffect(() => {
        axios
            .get(`${FIREBASE_DB_URL}lists/${props.userId}/${id}.json?auth=${props.accessToken}`)
            .then(resp => {
                setTitle(resp.data.title);
                form.setFieldsValue({
                    title: resp.data.title
                });

                
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    

    const onFinish = values => {
        const { title } = values; 

        axios
            .patch(`${FIREBASE_DB_URL}lists/${props.userId}/${id}.json?auth=${props.accessToken}`, {
                title
            })
            .then(resp => {
                console.log('history', props.history.push('/list/' + id));
            })
            .catch(err => {

        });
    };

    return (
        <Row>
            <Col xs={{span: 24}} md={{span: 12, offset: 6}}>
                <Title>Edit list title</Title>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        title
                    }}
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
        accessToken: state.auth.token
    }
};

export default connect(mapStateToProps)(EditForm);