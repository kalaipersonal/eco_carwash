import axios from "axios";

export function getCarTypeList(){
	return axios.get(`/admin/manage_cartype`)
}

export function getCarTypeSelection(store_id,car_type,service_type,service_nature){
	return axios.get(`/admin/manage_service_mapping/?store=${store_id}&service_type=${service_type}&service_nature=${service_nature}&car_type=${car_type}`)
}

export function getReceivedtype(store_id,car_type,service_type,service_nature){
	return axios.get(`/admin/manage_service_mapping/?store=${store_id}&service_type=${service_type}&service_nature=${service_nature}&car_type=${car_type}`)
}
