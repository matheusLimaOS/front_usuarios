import NavBar from "./Components/NavBar";
import {Button, Card, message, PageHeader, Space} from "antd";
import Table from "./Components/Table";
import React from "react";
import {useHistory} from "react-router";
import "./CSS/Carrinho.css";

export default function HistoricoVendas (){

    const history = useHistory();
    const columns = [{
        title: 'ID Venda',
        dataIndex: 'id_venda',
        key: 'id_venda',
    },{
        title: 'Quantidade Vendida',
        dataIndex: 'quantidade_vendida',
        key: 'quantidade_vendida',
    },{
        title: 'Valor Vendido',
        dataIndex: 'valor_vendido',
        key: 'valor_vendido',
    },{
        title: 'Usuario Venda',
        dataIndex: 'usuario',
        key: 'usuario',
    },{
        title: 'Hora da Venda',
        key: "hora_venda",
        render: (text: any, record: any) => (
            <Space>
                {formatardata(record.hora_venda)}
            </Space>
        )
    },{
        title: 'Ação',
        key: "action",
        render: (text: any, record: any) => (
            <Space>
                <Button
                    color="dark"
                    onClick={() => {history.push("/HistVendas/venda/"+record.id_venda,record.id_venda)}}
                >DETALHES</Button>
            </Space>
        )
    }
    ]

    function formatardata(hora: any){
        if(hora!==undefined){
            let data = hora.split('T');

            let data1 = data[0].split("-");
            let hora1 = data[1].split(".");

            return data1[2] + "/" + data1[1] + "/" + data1[0] + " " + hora1[0];
        }
        else{
            return hora;
        }
    }

    return (
        <div className="telaHome">
            <NavBar/>
            <div className="card">
                <Card className="cardolas1">
                    <PageHeader
                        ghost={false}
                        onBack={() => history.push("/Home")}
                        title="Histórico de Vendas"
                        subTitle="Vendas Realizadas"
                    />
                    <Table route={"sells"} size={5} columns={columns}/>
                </Card>
            </div>
        </div>
    )
}
