import axios from "axios";

export function updateService(id,data){
	return new Promise((resolve, reject) => {
		axios.patch(`/admin/manage_garage_appointment_services/${id}/`, data)
		.then(res => {
			resolve(res.data);
		})
		.catch(err => {
			reject(err);
		})
	})
}