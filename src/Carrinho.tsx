import NavBar from "./Components/NavBar";
import {Button, Card,PageHeader, Space} from "antd";
import Table from "./Components/Table";
import React from "react";
import {useHistory} from "react-router";
import NumberFormat from "react-number-format";
import "./CSS/Carrinho.css";


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
        key: 'quantprod',
    },{
        title: 'Valor Final',
        key: "valorsomado",
        render: (text: any, record: any) => (
            <Space>
                {console.log(record)}
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
    }
    ]

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
                    <div className="buttons" hidden={true}>
                        <Button className="btn-cart finishsell">FINALIZAR VENDA</Button>
                        <Button className="btn-cart continuesell">CONTINUAR VENDENDO</Button>
                        <Button className="btn-cart cleancart">LIMPAR CARRINHO</Button>
                    </div>
                    <hr/>
                    <Table route={"cart/matholaslima4472@gmail.com"} size={10} columns={columns}/>
                </Card>
            </div>
        </div>
    )
}
