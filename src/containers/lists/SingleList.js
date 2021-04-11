import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse,  Menu, Dropdown, Typography, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import { FIREBASE_DB_URL } from '../../config';
import { useParams } from 'react-router';

import { connect } from 'react-redux';

const { Panel } = Collapse;

const { Text, Title } = Typography;

const SingleList = props => {

    const { id } = useParams();

    const [title, setTitle] = useState('');

    const [items, setItems] = useState([]);

    const deleteList = () => {
        axios
                .delete(`${FIREBASE_DB_URL}lists/${props.userId}/${id}.json`)
                .then(() => {
                    props.history.push('/');
                })
                .catch(err => {
                    console.log(err);
                });
    };

    const options = itemId => {

        const deleteTask = () => {
            axios
                .delete(`${FIREBASE_DB_URL}lists/${props.userId}/${id}/items/${itemId}.json`)
                .then(() => {
                    setItems(items.filter(el => el.id !== itemId));
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const menu = (
            <Menu>
                <Menu.Item><NavLink to={`/list/${id}/edit/${itemId}`}>Edit task</NavLink></Menu.Item>
                <Menu.Item danger onClick={deleteTask}>Delete Task</Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Options <DownOutlined />
                </a>
            </Dropdown>
        );
    };

    const heading = (status, heading) => {
        let type, text = '';

        switch (status) {
            case 'done':
                text = 'Done';
                type = 'success'; 
                break;
            case 'in_progress':
                text = 'In Progress';
                type = 'warning'; 
                break;
            default: 
                text = 'To Do';
                type = 'secondary'; 
        }


        return (
            <span><Text type={type}>{text}</Text> {heading}</span> 
        );
    }

    useEffect(() => {
        axios
            .get(`${FIREBASE_DB_URL}lists/${id}.json?auth=${props.accessToken}`)
            .then(resp => {
                setTitle(resp.data.title);
                const arr = [];

                Object.keys(resp.data.items).forEach(key => {
                    const obj = resp.data.items[key];
                    obj.id = key;
                    arr.push(obj);
                });

                setItems(arr);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Title>{ title }</Title>

            <div>
                <Button
                    type="primary"
                >
                    <NavLink
                        to={`/list/${id}/edit`}
                        exact
                    >Edit List Title</NavLink>
                </Button>
            </div>
            {items.length ? 
            <Collapse defaultActiveKey={[0]}>
                { items.map((item, index) => (
                    <Panel 
                        header={heading(item.status, item.heading)} 
                        key={index}
                        extra={options(item.id)}
                    >
                        <p>{item.description}</p>
                    </Panel>
                )) }
            </Collapse>
            :
            <div>This list has no items yet...</div>
            }
            

            <div>
                <Button
                    type="primary"
                >
                    <NavLink
                        to={`/list/${id}/create-item`}
                        exact
                    >Add New Item</NavLink>
                </Button>

                <Button
                    type="danger"
                    onClick={deleteList}
                >Delete list</Button>
            </div>
        </>
    );
}


const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        accessToken: state.auth.token
    }
};


export default connect(mapStateToProps)(SingleList);