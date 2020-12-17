import React from 'react';
import "./CSS/Login.css";
import {Button, Card, Form, Input, message} from "antd";
import api from "./Axios";
import {login} from "./config";
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
            login(res.data.token);
            success("Login efetuado com sucesso!");
            history.push('/');
        })
            .catch(err => {
                if(err.toString().indexOf("406")>0){
                    error("Email já cadastrado!");
                }
                if(err.toString().indexOf("411")>0){
                    error("Email ou senha não obedece as regras!");
                }
                if(err.toString().indexOf("500")>0){
                    error("Problema interno da aplicação.Por favor contate o desenvolvedor!");
                }
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
                        label="Name"
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
