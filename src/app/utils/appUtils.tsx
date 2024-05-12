import Cookies from 'js-cookie';

export const getAuthtoken =()=>{
    return Cookies.get('authToken');
}

export const getUserId =():any=>{
    return Cookies.get('userId');
}