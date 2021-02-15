import React, {useState} from 'react';
import NumberFormat from 'react-number-format';
import "./CSS/Venda.css";
import {Button, Card, Form, Input, message, PageHeader, Popconfirm, Space} from "antd";
import NavBar from "./Components/NavBar";
import { useHistory } from 'react-router'
import api from "./Axios";
import Table from "./Components/Table";
import {Authenticate} from "./config";

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

function Venda() {
    const [Trava,setTrava] = useState(false);
    const [Trava1,setTrava1] = useState(false);
    const [Venda,setVenda] = useState(false);
    const [Desc,setDesc] = useState("");
    const [Tamanho,setTamanho] = useState(0);
    const [Quantidade,setQuantidade] = useState(0);
    const [Atu,setAtu] = useState(true);
    const [Size,setSize] = useState(15);
    const history = useHistory();
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },{
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
    },{
        title: 'Tamanho',
        dataIndex: 'tamanho',
        key: 'tamanho',
    },{
        title: 'Quantidade',
        dataIndex: 'quantidade',
        key: 'quantidade'
    },{
        title: 'Valor',
        dataIndex: 'valor',
        key: 'valor'
    },{
        title: 'Ação',
        key: "action",
        render: (text: any, record: any) => (
            <Space>
                <Button onClick={() => edit(record)} color="dark" >VENDER</Button>
                <Button onClick={() => remove(record)} color="dark" >REMOVER</Button>
            </Space>
        )
    }
    ]

    const onFinish = (values: value) => {
        values.descricao = Desc;
        values.tamanho = Tamanho;
        values.quantidade = Quantidade;

        if(Venda){
            api.post("http://localhost:8686/cart/addcart",values).then(() =>{
                success("Produto colocado no carrinho!");
                setAtu(!Atu);
            }).catch(err => {
                error(err.response.data.message);
            })
        }
        else{
            api.post("http://localhost:8686/product/remove/",values).then(() =>{
                success("Produto removido com sucesso!");
                setAtu(!Atu);
            }).catch(err => {
                error(err.response.data.message);
            })
        }


    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    function edit (record:any) {
        setTrava(true);
        setTrava1(false);
        setDesc(record.descricao);
        setSize(5);
        setTamanho(record.tamanho);
        setVenda(true);
    }
    function remove (record:any) {
        setTrava(true);
        setTrava1(true);
        setDesc(record.descricao);
        setSize(5);
        setTamanho(record.tamanho);
        setVenda(false);
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
                        title="Venda"
                        subTitle="Venda o produto desejado!"
                    />
                    <hr/>
                    <div>
                        <Form
                            id='Form'
                            hidden={!Trava}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Descrição"
                                name="descricao"
                            >
                                <p hidden={true}>{Desc}</p>
                                <Input
                                    type="text"
                                    maxLength={25}
                                    value={Desc}
                                    readOnly={Trava}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Tamanho/Peso"
                                name="tamanho"
                            >
                                <p hidden={true}>{Tamanho}</p>
                                <Input
                                    maxLength={7}
                                    className="input"
                                    value={Tamanho}
                                    readOnly={Trava}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Quantidade"
                                name="quantidade"
                                rules={[{
                                    required:true,
                                    message:"Campo quantidade é obrigátório!"
                                }]}
                            >
                                <NumberFormat
                                    onChange={(e) => setQuantidade(parseInt(e.target.value))}
                                    hidden={!Trava}
                                    maxLength={7}
                                    allowLeadingZeros={false}
                                    decimalScale={0}
                                    value={Quantidade}
                                    decimalSeparator={","}
                                    thousandSeparator={"."}
                                    allowNegative={false}
                                    displayType="input"
                                    className="input2"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Valor"
                                name="valor"
                                hidden={Trava1}
                                rules={[{
                                    required:!Trava1,
                                    message:"Valor obrigatório!"
                                }]}
                            >
                                <NumberFormat
                                    maxLength={12}
                                    allowNegative={false}
                                    decimalSeparator={","}
                                    decimalScale={2}
                                    prefix={'R$: '}
                                    displayType="input"
                                    className="input2"
                                />
                            </Form.Item>

                            <Form.Item className="buttons">
                                <Popconfirm
                                    title={`Realmente deseja remover ${Quantidade} unidade(s) do produto: ${Desc}`}
                                    disabled={!Trava1}
                                    okText="SIM"
                                    cancelText="NÃO"
                                    onConfirm={() => onFinish({descricao:Desc,tamanho:Tamanho,quantidade:Quantidade,valor:0.0})}
                                >
                                    <Button className="inserir" htmlType="submit" hidden={!Trava1}>
                                        REMOVER
                                    </Button>
                                </Popconfirm>
                                <Button className="inserir" htmlType="submit" hidden={Trava1}>
                                    VENDER
                                </Button>
                                <Button
                                    hidden={!Trava}
                                    className='cancelar'
                                    onClick={()=>{
                                        setTrava1(false)
                                        setTrava(false)
                                        setSize(15);
                                        setQuantidade(0);
                                    }}
                                    type='ghost'
                                >
                                    CANCELAR
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Table route="product/" atu={Atu} size={Size} columns={columns}/>
                </Card>
            </div>
        </div>
    );
}

export default Venda;
