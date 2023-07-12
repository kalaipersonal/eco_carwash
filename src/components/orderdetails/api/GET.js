import axios from "axios";

export function getOrderDetails(data=""){
    return axios.get(`/admin/manage_appointments${data}`)
}

export function getOrderData(id){
    return axios.get(`/admin/manage_appointments/${id}`)
}