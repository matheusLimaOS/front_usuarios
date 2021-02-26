import React, {useEffect, useState} from 'react';
import "../CSS/Table.css";
import {message, Table} from "antd";
import api from "../Axios";
import {useHistory} from "react-router";

interface Props{
    size:number,
    columns: Array<object>,
    route:String,
    atu?: boolean
}
const error = (message1:string) => {
    message.error(message1, 3);
};

function Tables(props:Props) {
    const history = useHistory();
    let [Data,setData] = useState([{
        id:0,
        descricao: "",
        quantidade:0,
        tamanho:0,
        valor:0.0
    }]);

    useEffect(() => {
        api.get("http://localhost:8686/"+props.route).then(res =>{
            setData(res.data);
        }).catch(err=>{
            if(err.response.status === 401){
                history.push('/');
                error("Usuário desconectado, por favor fazer novamente o login");
            }
            console.log(err.response.status);
        })
    },[props.route,props.atu,history]);

    return (
        <div className="Table">
            <Table
                size='large'
                dataSource={Data}
                columns={props.columns}
                bordered={true}
                pagination={{
                    pageSize:props.size,
                }}
            />
        </div>
    );
}

export default Tables;
