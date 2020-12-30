import React from 'react';
import "../CSS/NavBar.css";
import { Link } from "react-router-dom"
import { ShoppingCartOutlined,ShopOutlined,ShoppingOutlined,LogoutOutlined } from "@ant-design/icons";
import {logout} from "../config";

function NavBar() {
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
           <Link className="ins" to="/">
               <ShoppingCartOutlined/>
               Carrinho
           </Link>
           <div className="log">
               <Link className="logout" to='/' onClick={logout}>
                   <LogoutOutlined />
                   Logout
               </Link>
           </div>

       </div>
    );
}

export default NavBar;
