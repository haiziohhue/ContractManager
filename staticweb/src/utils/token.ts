export const getToken = ()=>{
    return window.localStorage.getItem('token')
}
export const setToken = (token:string)=>{
    return window.localStorage.setItem('token',token)
}