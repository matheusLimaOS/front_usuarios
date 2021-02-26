import React from 'react';
import "./CSS/Login.css";
import {Button, Card, Form, Input, message} from "antd";
import api from "./Axios";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'

interface value{
    email:string,
    password:string
}

const success = (message1:string) => {
    message.success(message1, 3);
};
const error = (message1:string) => {
    message.error(message1, 3);
};

function TelaCadastro() {
    const history = useHistory();
    const onFinish = (values: value) => {
        api.post("http://localhost:8686/user",values).then(res =>{
            success("Usuário criado com sucesso!");
            history.push('/');
        })
            .catch(err => {
                console.log(err.response);
                error(err.response.data.message);
            })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="telaLogin">
            <Card className="cardolas">
                <div>
                    <h1 className="h11">NargLand</h1>
                </div>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Nome"
                        name="name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Por Favor, insira seu e-mail!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Por Favor, insira sua senha!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item className="buttons">
                        <Link to='/'>
                            <Button className='voltar'>
                                VOLTAR
                            </Button>
                        </Link>
                        <Button className='cadastrar' type="primary" htmlType="submit">
                            CADASTRAR-SE
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default TelaCadastro;
