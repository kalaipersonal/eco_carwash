import axios from "axios";

export function patchCleanerData(id,data){
	return new Promise((resolve, reject) => {
		axios.patch(`admin/manage_staff/${id}/`, data).then(
			res => {
				resolve(res.data)
			}
		).catch(err => reject(err))
	})
}