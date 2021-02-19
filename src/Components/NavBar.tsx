import React from 'react';
import "../CSS/NavBar.css";
import { Link } from "react-router-dom"
import { ShoppingCartOutlined,ShopOutlined,ShoppingOutlined,LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space} from 'antd'
import {getUsuario, logout} from "../config";
import { UserOutlined , DownOutlined, UserAddOutlined} from '@ant-design/icons';

function NavBar() {
    let user = getUsuario();
    const menu = (
        <Menu>
            <Menu.Item key='0'>
                {user.email} ({parseInt(user.role) === 0 ? "Usuário" : "Administrador"})
            </Menu.Item>

            <Menu.Divider/>
            <Menu.Item key='1'>
                <Link to="/EditarPerfil">
                    <UserOutlined />
                    EDITAR PERFIL
                </Link>
            </Menu.Item>
            {parseInt(user.role) === 1 ?
                <Menu.Item key='2'>
                    <Link to="/lista">
                        <UserAddOutlined />
                        LISTA DE USUARIOS
                    </Link>
                </Menu.Item> :
                null
            }

            <Menu.Divider/>

            <Menu.Item key='5'>
                <Link to="/" onClick={logout}>
                    <LogoutOutlined/>
                    LOGOUT
                </Link>
            </Menu.Item>
        </Menu>
    )

    return (
       <div className="NavBar">
           <Link className="narg" to="/Home">
               NargLand
           </Link>
           <Link className="ins" to="/inserir">
               <ShopOutlined />
               Inserir
           </Link>
           <Link className="ins" to="/Venda">
               <ShoppingOutlined />
               Venda
           </Link>
           <Link className="ins" to="/carrinho">
               <ShoppingCartOutlined/>
               Carrinho
           </Link>
           <Space direction="vertical" className="log">
               <Dropdown overlay={menu}>
                   <Link className="logout" to='' onClick={e => e.preventDefault()}>
                       <UserOutlined className="user"/>

                       {user.name || user.email}

                       <DownOutlined className="down-icon"/>
                   </Link>
               </Dropdown>
           </Space>

       </div>
    );
}

export default NavBar;
