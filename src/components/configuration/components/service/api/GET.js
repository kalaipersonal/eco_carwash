import axios from "axios";

export function getCarTypeList(){
	// return axios.get(`/admin/manage_cartype/`);
	return axios.get("https://jsonplaceholder.typicode.com/users");
}

export function getServices(carType, serviceType, serviceNature){
	return axios.get("https://jsonplaceholder.typicode.com/users");
	// return axios.get(`/admin/manage_services/?car_type=${carType}&service_nature=${serviceNature}&service_type=${serviceType}`);
}

export function getService(id){
	return axios.get(`/admin/manage_services/${id}/`)
}