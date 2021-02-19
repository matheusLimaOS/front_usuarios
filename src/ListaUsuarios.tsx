import React, {useState} from 'react';
import "./CSS/Carrinho.css";
import {Button, Card, message, PageHeader, Popconfirm, Space} from "antd";
import api from "./Axios";
import { useHistory } from 'react-router'
import NavBar from "./Components/NavBar";
import Table from "./Components/Table";
import {Authenticate, AuthenticateRole, user} from "./config"

const success = (message1:string) => {
    message.success(message1, 3);
};
const error = (message1:string) => {
    message.error(message1, 3);
};

function ListaUsuarios() {
    const history = useHistory();
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },{
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
    },{
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },{
        title: 'Permissão',
        key: 'role',
        render: (text: any, record: any) => (
            <Space>
                <p>{record.role === 0 ? "USUÁRIO" : "ADMINISTRADOR"}</p>
            </Space>
        )
    },{
        title: 'Ações',
        key: 'role',
        render: (text: any, record: user) => (
            <Space>
                <Popconfirm
                    title={`Realmente deseja remover este usuário?`}
                    okText="SIM"
                    cancelText="NÃO"
                    disabled={record.role === 1}
                    onConfirm={() => {
                        removeUser(record)
                    }}
                >
                    <Button color="dark" disabled={record.role===1} >
                        REMOVER
                    </Button>
                </Popconfirm>
                <Popconfirm
                    title={`Realmente deseja tornar este usuário em administrador?`}
                    okText="SIM"
                    cancelText="NÃO"
                    disabled={record.role === 1}
                    onConfirm={() => {
                        SwitchRoleUser(record)
                    }}
                >
                    <Button color="dark" hidden={record.role===1} >
                        ADMINISTRADOR
                    </Button>
                </Popconfirm>
            </Space>
        )
    }
    ]
    const [Atu,setAtu] = useState(false);

    Authenticate().then(r => {});
    AuthenticateRole();

    function removeUser(User:user){
        api.delete(`http://localhost:8686/user/`+User.id).then(res=> {
            console.log(res);
            success(res.data.message);
            setAtu(!Atu);
        }).catch(err => {
            error(err.response.data.message);
        })
    }
    function SwitchRoleUser(User:user){
        User.role=1;
        api.put(`http://localhost:8686/user/`+User.id,User).then(res=> {
            console.log(res);
            success(res.data.message);
            setAtu(!Atu);
        }).catch(err => {
            error(err.response.data.message);
        })
    }
    return (
        <div className="telaHome">
            <NavBar/>
            <div className="card">
                <Card className="cardolas1">
                    <PageHeader
                        ghost={false}
                        onBack={() => history.push("/Home")}
                        title="Usuários"
                        subTitle="Lista de Usuários do sistema!"
                    />
                    <hr/>
                    <Table size={10} atu={Atu} columns={columns} route={"user"}/>
                </Card>
            </div>
        </div>
    );
}

export default  ListaUsuarios;
