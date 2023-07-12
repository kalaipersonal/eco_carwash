import axios from "axios"

export class API{   
    getIndustryList(){
        return new Promise((success,reject)=>{
            axios.get('admin/manage_industry/get_industry/')
            .then(
                res =>    {
                    // console.log(res);                
                    success(res)
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
        })
    } 
    getWebinarsandAppiontments(){
        return new Promise((success,reject)=>{
            axios.get('admin/admin_dashboard/analysis/',{ params: { type:"webinars_appiontments"} })
            .then(
                res =>    {
                    // console.log(res);                
                    success(res)
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
        })
    } 
    getCourse_Status(){
        return new Promise((success,reject)=>{
            axios.get('admin/admin_dashboard/analysis/',{ params: { type:"course_status"} })
            .then(
                res =>    {
                    // console.log(res);                
                    success(res)
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
        })
    }
    getUsers_Count(){
        return new Promise((success,reject)=>{
            axios.get('admin/admin_dashboard/analysis/',{ params: { type:"users"} })
            .then(
                res =>    {
                    // console.log(res);                
                    success(res)
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
        })
    }
    getStage_Analytics(){
        return new Promise((success,reject)=>{
            axios.get('admin/admin_dashboard/analysis/',{ params: { type:"stage_analytics"} })
            .then(
                res =>    {
                    // console.log(res);                
                    success(res)
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
        })
    }
    getStar_Count(){
        return new Promise((success,reject)=>{
            axios.get('admin/admin_dashboard/analysis/',{ params: { type:"star_count"} })
            .then(
                res =>    {
                    // console.log(res);                
                    success(res)
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
        })
    }
    getFeedback(industry_id){
        return new Promise((success,reject)=>{
            axios.get('admin/admin_dashboard/get_user_feedback/'
            // ,{ params: { industry_id:industry_id} }
            )
            .then(
                res =>    {
                    console.log(res);                
                    success(res)
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
        })
    }
}