import { useHistory } from 'react-router'
import {message} from "antd";

const error = (message1:string) => {
    message.error(message1, 4);
};

let usuario:String;

export function setUsuario(email:String){
    usuario=email;
}
export function getUsuario(){
    return usuario;
}
export const TOKEN_KEY = '@teste-Token';
export const isAuthenticated = async () => {
    let token = localStorage.getItem(TOKEN_KEY);
    let time = localStorage.getItem('time') || '0';

    if(((Date.now()/1000)/60) > ((parseInt(time)/1000)/60)+5){
        await logout();
        error("Tempo limite sem movimentação excedido,Por favor fazer o login novamente");
        return false;
    }
    else{
        localStorage.setItem('time',Date.now().toString());
    }

    if(token!==null && token!== undefined){
        return true;

    }
    else{
        await logout();
        return false;
    }

}
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = async (token: string) => {
    await localStorage.setItem(TOKEN_KEY, token);
    await localStorage.setItem('time',Date.now().toString());
};
export const logout = async () => {
    await localStorage.removeItem(TOKEN_KEY);
    await localStorage.removeItem('time');
};
export const Authenticate = async () => {
    const history = useHistory();
    if (!await isAuthenticated()){
        history.push('/');
    }
}
