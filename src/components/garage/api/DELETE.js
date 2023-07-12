import axios from "axios";

export function deleteService(service_id,appointment_id,start_time){
	return axios.delete(`/admin/manage_garage_appointment_services/${appointment_id}/?service=${service_id}&start_time=${start_time}`)
}