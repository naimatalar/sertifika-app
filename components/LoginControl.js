import AsyncStorage from "@react-native-async-storage/async-storage"
import React,{ useEffect, useState } from "react"
import { AxiosGet } from "../crud/crud"


function LoginControl() {
    const[login,setLogin]=useState(false)
    useEffect(()=>{start()},[])

    const start=async()=>{
            AsyncStorage.getItem("tkn_sertifika").then((x) => {
        if (x) {
            AxiosGet("auth/tokencheck").then((y) => {
                setLogin(true)
            }).catch((y) => { setLogin(false)})
        } else {
            setLogin(false)
        }
    })
    }

    return login;
}

export default LoginControl;