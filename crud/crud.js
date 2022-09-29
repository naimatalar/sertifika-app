import React from 'react';

import Axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseUrl = 'http://10.0.2.2:45457/api/';
 const baseUrl = "http://37.148.212.29:8085/";
//   const baseUrl = "http://10.35.35.15:45456/";ss

// const baseUrl='http://192.168.0.14:45455/';
const api="api/"
export const fileurl=baseUrl+"root/" 
export const AxiosPost = async (url,data) => { 
       debugger
    
       var headers = {headers:{ 
        'Content-Type': 'application/Json',
        'Authorization':"Bearer " + await AsyncStorage.getItem("tkn_sertifika")
    }}

    return await Axios.post(baseUrl+api+url, data, headers)

}  
export const AxiosGet = async (url,data) => {
    
    var headers = {headers:{ 
        'Content-Type': 'application/Json',
        'Authorization':"Bearer " + await AsyncStorage.getItem("tkn_sertifika")
    }}
    return await Axios.get(baseUrl+api+url, headers)

}
  