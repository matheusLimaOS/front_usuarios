import React, {useEffect, useState} from 'react';
import "../CSS/NavBar.css";
import {Table} from "antd";
import api from "../Axios";

interface Props{
    size:number,
    columns: Array<object>,
    route:String,
    atu: boolean
}

function Tables(props:Props) {
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
        })
    },[props.route,props.atu]);

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
