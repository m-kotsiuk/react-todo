import React from 'react';
import { Collapse,  Menu, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const { Text } = Typography;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Show = () => {

    const options = () => {

        const menu = (
        <Menu>
            <Menu.Item>Edit task</Menu.Item>
            <Menu.Item danger>Delete Task</Menu.Item>
        </Menu>
        );

        return (
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Hover me <DownOutlined />
                </a>
            </Dropdown>
        );
    };

    const heading = () => {
        return (
            <span> <Text type="success">Ant Design (success)</Text>
            <Text type="warning">Ant Design (warning)</Text>
            <Text type="secondary">Ant Design (secondary)</Text> Some title</span> 
        );
    }

    return (
        <Collapse defaultActiveKey={['1']}>
            <Panel 
                header={heading()} 
                key="1"
                extra={options()}
            >
            <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
            </Panel>
        </Collapse>
    );
}

export default Show;