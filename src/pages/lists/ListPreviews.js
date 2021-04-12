import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {  Card, Row, Col, Button, Space } from 'antd';

import { connect } from 'react-redux';

import { listsActions } from '../../store/actions/index';


const ListPreviews = props => {

    const { userId, accessToken, onFetchLists, lists } = props;

    useEffect(() => {
        lists === null && onFetchLists(userId, accessToken);
    }, [lists, userId, accessToken, onFetchLists]);

    return (
         <Space
            size="middle"
            direction="vertical"
            style={{
                width: '100%'
            }}
        >
            <Row 
                gutter={[16, 16]} 
                justify="start"
            >
            { lists && lists.map(list => (
                <Col 
                    key={list.id}
                    span="24"
                    md={{span: 12}} 
                    lg={{span: 8}}
                >
                    <Card                        
                        title={list.title}
                        extra={<NavLink to={`/list/${list.id}`}>View</NavLink>}
                        style={{
                            height: '100%'
                        }}
                    >
                        {
                            list.items ?
                                Object.keys(list.items).map(key => (
                                    <p key={key}>{ list.items[key].heading }</p>
                                ))
                            :
                            <p>This list has no items yet.</p>
                    }
                    </Card>
                </Col>
            )) }
            
            </Row>
           
            <Button
                type="primary"
            >
                <NavLink
                    to="/list/new"
                    exact
                >Create new List</NavLink>
            </Button>
        </Space>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        accessToken: state.auth.token,
        lists: state.lists.lists
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchLists: (userId, accessToken) => dispatch(listsActions.fetchLists(userId, accessToken))
    };
};
  


export default connect(mapStateToProps, mapDispatchToProps)(ListPreviews);