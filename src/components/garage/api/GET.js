import axios from "axios";

export function getGarageList(){
	return axios.get(`/admin/manage_garage/`);
}

export function getGarageData(id){
	return axios.get(`/admin/manage_garage/${id}/`);
}

export function getGarageAppointmentList(user_id){
	return axios.get(`/admin/manage_garage_appointments/?user_id=${user_id}`);
}

export function getGarageAppointmentData(appointment){
	return axios.get(`/admin/manage_garage_appointments/${appointment}/`);
}

export function getGarageAppointmentServicesList(appointment){
	return axios.get(`/admin/manage_garage_appointment_services/?appointment=${appointment}`);
}

export function getAppointmentServiceData(id,number,time){
	return axios.get(`/admin/manage_garage_appointment_services/${id}/?start_time=${time}&car_number=${number}`);
}

export function getGarageServices(garage){
	return axios.get(`/admin/manage_garage_services/?garage=${garage}`);
}

export function getCompletedGarageAppointmentList(user_id){
	return axios.get(`/admin/manage_garage_appointments/?user_id=${user_id}&status=completed`);
}

export function getAllServices(car_type){
	return axios.get(`/admin/manage_services?car_type=${car_type}`);
}