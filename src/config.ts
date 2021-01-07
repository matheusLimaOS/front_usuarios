export const TOKEN_KEY = '@teste-Token';
export const isAuthenticated = () => {
    let token = localStorage.getItem(TOKEN_KEY);
    let time = localStorage.getItem('time') || '0';

    console.log(token);

    if(((Date.now()/1000)/60) > ((parseInt(time)/1000)/60)+1){
        logout();
        return false;
    }

    if(token!==null && token!== undefined){
        return true;

    }
    else{
        logout();
        return false;
    }

}
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('time',Date.now().toString());
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('time');
};

export const timeout = () => {

}
