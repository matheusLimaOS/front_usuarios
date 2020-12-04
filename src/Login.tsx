import React from 'react';
import { message, Button} from 'antd';
import "./Login.css";
import {Content} from "antd/es/layout/layout";
import Layout from 'antd/lib/layout/layout';

const success = () => {
    message.warn('Login realizado com sucesso, Você será redirecionado em 2 segundos', 2);
};

function TelaLogin() {
    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">Content</div>
            </Content>
        </Layout>
    );
}

export default TelaLogin;
