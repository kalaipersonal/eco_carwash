import axios from "axios"

export function createCouponData(data){
  return new Promise((resolve, reject) => {
    axios.post(`/admin/manage_coupons/`, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  })
}