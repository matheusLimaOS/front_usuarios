import { useHistory } from 'react-router'
import {message} from "antd";

const error = (message1:string) => {
    message.error(message1, 4);
};

export interface user{
    id:number,
    name:string,
    email:string,
    role:number
}

export async function setUsuario(values:user){
    await localStorage.removeItem('user');
    await localStorage.setItem('user',values.id+"/"+ values.name + "/" + values.email + "/" + values.role)
}

export function getUsuario(){
    let user = localStorage.getItem('user') || '0/matheus/matholaslima/1';
    let user2 = user.split('/');

    return {id:user2[0], name:user2[1], email:user2[2], role:user2[3]}
}


export const TOKEN_KEY = '@teste-Token';
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = async (token: string,user:user) => {
    await localStorage.setItem('user',user.id+'/'+user.name+'/'+user.email+'/'+user.role);
    await localStorage.setItem(TOKEN_KEY, token);
    await localStorage.setItem('time',Date.now().toString());
};
export const logout = async () => {
    await localStorage.removeItem('user');
    await localStorage.removeItem(TOKEN_KEY);
    await localStorage.removeItem('time');
};
export function AuthenticateRole(){
    const history = useHistory();

    if(parseInt(getUsuario().role) !== 1){
        error("O usuário não tem permissão!");
        history.push('/Home');
    }
}
