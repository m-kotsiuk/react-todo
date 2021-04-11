import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {  Card, Row, Col, Button } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { FIREBASE_DB_URL } from '../../config';


const ListPreviews = props => {
    
    const [lists, setLists] = useState([]);

    useEffect(() => {
        console.log(props.userId);

        axios
            .get(`${FIREBASE_DB_URL}/lists/${props.userId}.json?auth=${props.accessToken}`)
            .then(resp => {
                const lists = [];

                Object.keys(resp.data).forEach(key => {
                    const obj = resp.data[key];
                    obj.id = key;
                    lists.push(obj);
                });

                console.log(lists);

                setLists(lists);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Row gutter={[16, 16]} justify="center">
            { lists.map(list => (
                <Col 
                    key={list.id}
                    md={{span: 12}} 
                    lg={{span: 8}}
                >
                    <Card
                        
                        title={list.title}
                        extra={<NavLink to={`/list/${props.userId}/${list.id}`}>View details</NavLink>} 
                        style={{ width: 300 }}
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
            <div>
                <Button
                    type="primary"
                >
                    <NavLink
                        to="/list/new"
                        exact
                    >Create new List</NavLink>
                </Button>
            </div>
                
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        accessToken: state.auth.token
    }
};


export default connect(mapStateToProps)(ListPreviews);