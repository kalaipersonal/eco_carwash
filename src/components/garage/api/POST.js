import axios from "axios";

export function createGarage(data){
	return new Promise((resolve, reject) => {
		axios.post("/admin/manage_garage/", data)
		.then(res => {
			resolve(res.data);
		})
		.catch(err => {
			reject(err);
		})
	})
}