import Axios from "axios"
// const baseUrl = 'http://10.0.2.2:45457/api/';
//  const baseUrl = "http://10.35.35.15:45456/api/";
const baseUrl='http://192.168.0.14:45455/api/';

export const fileurl=baseUrl+"root/"
export const AxiosPost = async (url,data) => {
    
    var headers = {
        'Content-Type': 'application/Json'
    }
    return await Axios.post(baseUrl+url, data, headers)

}
export const AxiosGet = async (url,data) => {
    
    var headers = {
        'Content-Type': 'application/Json'
    }
    return await Axios.get(baseUrl+url, headers)

}
