import React, {useState} from 'react';
import NumberFormat from 'react-number-format';
import "./CSS/Inserir.css";
import {Button, Card, Form, Input, message, PageHeader, Space} from "antd";
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

function Inserir() {
    const [Trava,setTrava] = useState(false);
    const [Desc,setDesc] = useState("");
    const [Tamanho,setTamanho] = useState(0);
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
                <Button onClick={() => edit(record)} color="dark" >ADICIONAR</Button>
            </Space>
        )
    }
    ]
    const onFinish = (values: value) => {
        values.descricao=Desc;
        values.tamanho=Tamanho;

        console.log(values);

        if(!Trava){
            api.post("http://localhost:8686/product/new",values).then(res =>{
                success("Produto inserido com sucesso!");
                history.push("/Home");
            }).catch(err => {
                error(err.response.data.message);
            })
        }
        else{
            api.post("http://localhost:8686/product/edit",values).then(res =>{
                success("Produto editado com sucesso!");
                history.push('/Home');
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
        setDesc(record.descricao);
        setTamanho(record.tamanho);
    }

    Authenticate();

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
                                    disabled={Trava}
                                    onChange={(e) => {
                                        setDesc(e.target.value)
                                    }}
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
                                    disabled={Trava}
                                    readOnly={Trava}
                                    onChange={(e)=>{
                                        isNaN(parseInt(e.target.value)) ?
                                            setTamanho(0):
                                            setTamanho(parseInt(e.target.value))
                                    }}
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
                                    maxLength={7}
                                    allowLeadingZeros={false}
                                    decimalScale={0}
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
                                rules={[{
                                    required:true,
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
                                <Button className="inserir" htmlType="submit">
                                    {!Trava ? 'CADASTRAR' : 'ADICIONAR'}
                                </Button>
                                <Button
                                    hidden={!Trava}
                                    className='cancelar'
                                    onClick={()=>{
                                        setTrava(false)
                                        setTamanho(0);
                                        setDesc("");
                                    }}
                                    type='ghost'
                                >
                                    CANCELAR
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Table size={5} atu={false} route="product/" columns={columns}/>
                </Card>
            </div>
        </div>
    );
}

export default Inserir;
