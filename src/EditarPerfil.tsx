import React, {useState} from "react";
import {Button, Card, Form, Input, message, PageHeader} from "antd";
import NavBar from "./Components/NavBar";
import api from "./Axios";
import {Authenticate, getUsuario, setUsuario, user} from "./config";
import {useHistory} from "react-router";
import "./CSS/EditarPerfil.css"

const success = (message1:string) => {
    message.success(message1, 3);
};
const error = (message1:string) => {
    message.error(message1, 3);
};

function EditarPerfil(){
    let User = getUsuario();
    const [Name,setName] = useState(User.name);
    const [Email,setEmail] = useState(User.email);
    const history = useHistory();
    const onFinish = (values: user) => {
        values.name = Name;
        values.email = Email;
        values.role = parseInt(User.role);
        values.id = parseInt(User.id);

        api.put("http://localhost:8686/user/"+values.id,values).then(res =>{
            success("Usuário editado com sucesso!");
            setUsuario(values).then(r => {});
        }).catch(err => {
            error(err.response.data.message);
        })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    Authenticate().then(r => {});

    return(
        <div className="telaHome">
            <NavBar/>
            <div className="card">
                <Card className='cardolas1 cardolas2'>
                    <PageHeader
                        ghost={false}
                        onBack={() => history.push("/Home")}
                        title="Editar"
                        subTitle="Editar perfil do usuário!"
                    />
                    <hr/>
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
                            <p hidden={true}>{Name}</p>
                            <Input
                                type="text"
                                value={Name}
                                onChange={(e)=> {
                                setName(e.target.value);
                            }}/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Por Favor, insira seu e-mail!' }]}
                        >
                            <p hidden={true}>{Email}</p>
                            <Input
                                type="text"
                                value={Email}
                                onChange={(e)=> {
                                setEmail(e.target.value);
                            }}/>
                        </Form.Item>

                        <Form.Item>
                            <Button className="inserir" htmlType="submit">
                                EDITAR
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
            </div>
        </div>
    )
}

export default EditarPerfil;
