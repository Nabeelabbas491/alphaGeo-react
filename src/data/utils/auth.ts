import { useNavigate } from "react-router";
import { User } from "../interfaces/app";


export const saveUserInLocalStorage = (user: User) => {
    if (!user) return;
    if (Object.keys(user).length) localStorage.setItem('admin', JSON.stringify(user));
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem('admin') as string)
}

export const getJwtToken = () => {
    const user = getUser()
    return user.token
}