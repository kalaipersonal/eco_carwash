import axios from "axios";

export function getStoreLeaves(data="") {
	return axios.get(`/admin/manage_user_leave/${data}`)
}