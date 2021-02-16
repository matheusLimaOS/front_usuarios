import NavBar from "./Components/NavBar";
import {Card, PageHeader} from "antd";
import Table from "./Components/Table";
import React, { useMemo } from "react";
import {useHistory} from "react-router";
import "./CSS/Carrinho.css";
import { useLocation } from "react-router-dom";
import {Authenticate} from "./config";

export default function DetalheVenda (){
    const history = useHistory();
    const columns = [{
        title: 'ID Venda Item',
        dataIndex: 'id_venda_item',
        key: 'id_venda_item',
    },{
        title: 'ID Venda',
        dataIndex: 'id_venda',
        key: 'id_venda',
    },{
        title: 'ID_produto',
        dataIndex: 'id_produto',
        key: 'id_produto',
    },{
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
    },{
        title: 'Quantidade Vendida',
        dataIndex: 'quantidade_vendida',
        key: 'quantidade_vendida',
    },{
        title: 'Valor Vendido (Por Produto)',
        dataIndex: 'valor_vendido',
        key: 'valor_vendido',
    }
    ]
    const location = useLocation();
    const stateFromProps = useMemo(() => location.state, [location]);

    Authenticate().then(r => {});

    return (
        <div className="telaHome">
            <NavBar/>
            <div className="card">
                <Card className="cardolas1">
                    <PageHeader
                        ghost={false}
                        onBack={() => history.push("/HistVendas")}
                        title={"Venda de id: "+ stateFromProps}
                        subTitle={"Itens vendidos na venda de id: " + stateFromProps}
                    />
                    <Table route={"sells/"+stateFromProps} size={5} columns={columns}/>
                </Card>
            </div>
        </div>
    )
}
