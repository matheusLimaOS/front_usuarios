import React from 'react';
import "./Home.css";
import {Card} from "antd";
import NavBar from "./NavBar";

function Home() {
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <Card className="cardolas1">
                <div>
                    <h1>Seja bem vindo!</h1>
                </div>
            </Card>
        </div>
);
}

export default Home;
