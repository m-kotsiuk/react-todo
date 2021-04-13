import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse,  Menu, Dropdown, Typography, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';

import { connect } from 'react-redux';
import { listsActions } from '../../store/actions';

const { Panel } = Collapse;

const { Text, Title, Link } = Typography;

const SingleList = props => {

    const { id } = useParams();

    const { lists, userId, accessToken, onDeleteListItem, onDeleteList, history } = props;

    const targetList = lists && lists.find(el => el.id === id);

    let title = '';

    let items = [];

    if (targetList) {
        title = targetList.title;
        items = targetList.items || [];
    }


    const deleteList = () => {
        onDeleteList(userId, accessToken, id, history);
    };

    const options = itemId => {

        const deleteTask = () => {
            onDeleteListItem(userId, accessToken, id, itemId)
        };

        const menu = (
            <Menu>
                <Menu.Item><NavLink to={`/list/${id}/edit/${itemId}`}>Edit task</NavLink></Menu.Item>
                <Menu.Item danger onClick={deleteTask}>Delete Task</Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu}>
                <Link className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Options <DownOutlined />
                </Link>
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

    



    return (
        <Space direction="vertical" size="middle" style={{width: '100%'}}>
            <Title style={{marginBottom: 0}}>{ title }</Title>
            <Button
                type="primary"
            >
                <NavLink
                    to={`/list/${id}/edit`}
                    exact
                >Edit List Title</NavLink>
            </Button>
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
            <p>This list has no items yet...</p>
            }
            

            <Space>
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
            </Space>
        </Space>
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
        onDeleteList: (userId, accessToken, listId, history) => dispatch(listsActions.deleteList(userId, accessToken, listId, history)),
        onDeleteListItem: (userId, accessToken, listId, listItemId) => dispatch(listsActions.deleteListItem(userId, accessToken, listId, listItemId))
    };
};
  

export default connect(mapStateToProps, mapDispatchToProps)(SingleList);