import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Modal } from "react-native-paper";
import { DevSettings } from 'react-native';
import * as Updates from 'expo-updates';
import { AxiosGet } from "../crud/crud";
function PageRightContent(props) {
    const [flg, setFlg] = useState()
    const [showFlg, setShowGFlg] = useState(false)
    const [isLogin, setIsLogin] = useState(null)



    useEffect(() => { start() }, [])
    const start = async () => {

        let lnconf = await AsyncStorage.getItem("language")
       
        setFlg(require("../assets/trk.png"))

        if (lnconf.includes("tr")) {


            setFlg(require("../assets/trk.png"))
        } else {

            setFlg(require("../assets/ing.png"))

        }

        AsyncStorage.getItem("tkn_sertifika").then((x)=>{
            if (x) {
              AxiosGet("auth/tokencheck").then((y)=>{
               console.log(y)
              })
            }else{
                setIsLogin(null)
            }
        })

    }


    return (<View style={{ flex: 1, flexDirection: "row" ,justifyContent:"center" ,alignItems:"center" }}>
        <TouchableOpacity onPress={()=>{props.props?.navigate("Login")}} style={{marginRight:17,backgroundColor:"white",padding:2,borderRadius:5}}>
            <Image source={require("../assets/auth.png")} style={{ width: 25, height: 25 }}></Image>
        </TouchableOpacity>
        {flg &&
            <TouchableOpacity onPress={() => { setShowGFlg(!showFlg) }}>
                <Avatar.Image size={30} style={{ borderWidth: 5, borderColor: "white", borderStyle: "solid", marginRight: 10 }} source={flg}></Avatar.Image>
            </TouchableOpacity>
        }
        {/* <Modal visible={()=>{setLoginModal(!lo)}}>

        </Modal> */}

        {showFlg && <View style={{ position: "absolute", top: "100%", backgroundColor: "white", padding: 15, right: 1, borderWidth: 5, borderColor: "#393185", borderStyle: "solid" }}>
            <TouchableOpacity onPress={() => { AsyncStorage.setItem("language", "tr-US"); Updates.reloadAsync() }}>
                <Image style={{ resizeMode: "contain", width: 50, height: 50 }} source={require("../assets/trk.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { AsyncStorage.setItem("language", "en-US");; Updates.reloadAsync() }}>
                <Image style={{ resizeMode: "contain", width: 50, height: 50 }} source={require("../assets/ing.png")}></Image>
            </TouchableOpacity>
        </View>}
    </View>);
}

export default PageRightContent;