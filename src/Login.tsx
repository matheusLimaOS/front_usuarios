import React from 'react';
import "./CSS/Login.css";
import {Button, Card, Form, Input, message,} from "antd";
import api from "./Axios";
import {getUsuario, login, setUsuario} from "./config";
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom'

interface value{
    email:string,
    password:string
}

const success = (message1:string) => {
    message.success(message1, 4);
};
const error = (message1:string) => {
    message.error(message1, 4);
};

function TelaLogin() {
    const history = useHistory();

    const onFinish = (values: value) => {
        api.post("http://localhost:8686/user/login/",values).then(async res =>{
            setUsuario(res.data.id_user);
            await login(res.data.token);
            success("Login efetuado com sucesso!");
            history.push("/Home");
        })
            .catch(err => {
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
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item className="buttons">
                        <Button type="primary" htmlType="submit">
                            ENTRAR
                        </Button>
                        <Link to='/cadastrar'>
                            <Button className='cadastrar'>
                                CADASTRAR-SE
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default TelaLogin;
