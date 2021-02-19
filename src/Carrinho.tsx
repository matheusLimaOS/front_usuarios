import NavBar from "./Components/NavBar";
import {Button, Card, message, PageHeader, Popconfirm, Space} from "antd";
import Table from "./Components/Table";
import React, {useState} from "react";
import {useHistory} from "react-router";
import NumberFormat from "react-number-format";
import "./CSS/Carrinho.css";
import api from "./Axios";
import { Link } from "react-router-dom"
import {Authenticate, getUsuario} from "./config";

const success = (message1:string) => {
    message.success(message1, 4);
};
const error = (message1:string) => {
    message.error(message1, 4);
};

export default function Carrinho (){
    const history = useHistory();
    const columns = [{
        title: 'ID Carrinho',
        dataIndex: 'ID_carrinho',
        key: 'ID_carinho',
    },{
        title: 'ID Produto',
        dataIndex: 'ID_produto',
        key: 'ID_produto',
    },{
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
    },{
        title: 'Valor do produto',
        dataIndex: 'valorprod',
        key: 'valorprod'
    },{
        title: 'Quantidade',
        dataIndex: 'quantprod',
        key: 'quantprod'
    },{
        title: 'Valor Final',
        key: "valorsomado",
        render: (text: any, record: any) => (
            <Space>
                <NumberFormat
                    disabled={true}
                    maxLength={12}
                    allowNegative={false}
                    decimalSeparator={","}
                    decimalScale={2}
                    value={record.quantprod*record.valorprod}
                    prefix={'R$: '}
                    displayType="text"

                />
            </Space>
        )
    },{
        title: 'Usuario',
        dataIndex: 'usuario',
        key: 'usuario'
    },{
        title: 'Ação',
        key: 'action',
        render: (text: any, record: any) => (
            <Space>
                <Popconfirm
                    title={`Realmente deseja remover este produto do carrinho?`}
                    okText="SIM"
                    cancelText="NÃO"
                    onConfirm={() => {
                        removeCart(record.ID_carrinho)
                    }}
                >
                    <Button>
                        REMOVER
                    </Button>
                </Popconfirm>

            </Space>
        )
    }
    ]

    let [Atu,setAtu] = useState(true);

    function removeCart(id:number) {
        api.delete("http://localhost:8686/cart/remove/"+id).then(res=>{
            success(res.data.message);
            setAtu(!Atu);
        }).catch(err =>{
            error(err.response.data.message);
        })
    }
    function clearCart() {
        api.delete(`http://localhost:8686/cart/clearCart/`+ getUsuario().id).then(res =>{
            setAtu(!Atu);
            success(res.data.message);
        }).catch(err => {
            error(err.response.data.message);
        })
    }
    function finishCart() {
        api.post(`http://localhost:8686/cart/finishCart/` + getUsuario().id).then(res =>{
            setAtu(!Atu);
            success(res.data);
        }).catch(err => {
            error(err.response.data.message);
        })
    }

    Authenticate().then(r => {});

    return (
        <div className="telaHome">
            <NavBar/>
            <div className="card">
                <Card className="cardolas1">
                    <PageHeader
                        ghost={false}
                        onBack={() => history.push("/Home")}
                        title="Carrinho"
                        subTitle="Produtos colocados no carrinho!"
                    />
                    <hr/>
                    <div className="buttons">
                        <Popconfirm
                            title={`Realmente deseja finalizar a venda?`}
                            okText="SIM"
                            cancelText="NÃO"
                            onConfirm={() => {
                                finishCart()
                            }}
                        >
                            <Button className="btn-cart">
                                FINALIZAR VENDA
                            </Button>
                        </Popconfirm>
                        <Link to={"/Venda"}>
                            <Button className="btn-cart">
                                CONTINUAR VENDENDO
                            </Button>
                        </Link>
                        <Popconfirm
                            title={`Realmente deseja limpar o carrinho?`}
                            okText="SIM"
                            cancelText="NÃO"
                            onConfirm={() => {
                                clearCart()
                            }}
                        >
                            <Button className="btn-cart">
                                LIMPAR CARRINHO
                            </Button>
                        </Popconfirm>
                    </div>
                    <hr/>
                    <Table route={"cart/"+getUsuario().id} atu={Atu} size={10} columns={columns}/>
                </Card>
            </div>
        </div>
    )
}
