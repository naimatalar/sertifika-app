import Axios from "axios"
// const baseUrl = 'http://10.0.2.2:45457/api/';
//  const baseUrl = "http://10.35.35.15:45456/api/";
const baseUrl='http://192.168.1.37:45455/';
const api="api/"
export const fileurl=baseUrl+"root/"
export const AxiosPost = async (url,data) => {
    
    var headers = {
        'Content-Type': 'application/Json'
    }
    return await Axios.post(baseUrl+api+url, data, headers)

}
export const AxiosGet = async (url,data) => {
    
    var headers = {
        'Content-Type': 'application/Json'
    }
    return await Axios.get(baseUrl+api+url, headers)

}
