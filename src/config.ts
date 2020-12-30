export const TOKEN_KEY = '@teste-Token';
export const isAuthenticated = () => {
    let token = localStorage.getItem(TOKEN_KEY);

    if(localStorage.getItem(TOKEN_KEY)!==null && token!== undefined){
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
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

