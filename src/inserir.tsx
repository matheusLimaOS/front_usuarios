import React from 'react';
import "./CSS/Home.css";
import {Button, Card, Form, Input, InputNumber, message, PageHeader} from "antd";
import NavBar from "./Components/NavBar";
import { useHistory } from 'react-router'
import {Link} from "react-router-dom";
import api from "./Axios";
import {login} from "./config";

interface value{
    descricao:string,
    tamanho:number,
    quantidade:number,
    valor:number
}

const success = (message1:string) => {
    message.success(message1, 4);
};
const error = (message1:string) => {
    message.error(message1, 4);
};

function Inserir() {
    const history = useHistory();

    const onFinish = (values: value) => {
        api.post("http://localhost:8686/product/",values).then(res =>{
            login(res.data.token);
            success("Produto inserido com sucesso!");
            history.push('/Home');
        })
            .catch(err => {
            })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="telaHome">
            <NavBar/>
            <div className="card">
                <Card className="cardolas1">
                    <PageHeader
                        ghost={false}
                        onBack={() => history.push("/Home")}
                        title="Inserir"
                        subTitle="Insira o produto desejado!"
                    />
                    <hr/>
                    <div>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Descrição"
                                name="descricao"
                                rules={[{ required: true,whitespace: true, message: 'Por Favor, insira a descriçao!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Tamanho/Peso"
                                name="tamanho"
                                rules={[{ required: true,whitespace: true, message: 'Por Favor, insira o tamanho/peso!'}]}

                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Quantidade"
                                name="quantidade"
                                rules={[{ required: true,whitespace: true, message: 'Por Favor, insira a Quantidade!'}]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Valor"
                                name="valor"
                                rules={[{ required: true, message: 'Por Favor, insira o valor!',type: "number"}]}
                            >
                                <InputNumber className="input" />
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
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Inserir;
