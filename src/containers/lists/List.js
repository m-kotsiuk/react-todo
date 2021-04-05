import React from 'react';
import { NavLink } from 'react-router-dom';
import {  Card, Row, Col, Button } from 'antd';






const List = props => {
    

    return (
        <div>
            <Row gutter={[16, 16]} justify="center">
                <Col md={{span: 12}} lg={{span: 8}}>
                    <Card 
                        title="Default size card" 
                        extra={<a href="#">View List</a>} 
                        style={{ width: 300 }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
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

export default List;