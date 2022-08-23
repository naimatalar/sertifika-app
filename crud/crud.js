import Axios from "axios"
const baseUrl = 'http://10.0.2.2:45457/api/';

// const baseUrl='http://bukalemun.kale.com.tr';


export const AxiosPost = async (url,data) => {
    
    var headers = {
        'Content-Type': 'application/Json'
    }
    return await Axios.post(baseUrl+url, data, headers)

}
