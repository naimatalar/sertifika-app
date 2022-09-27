import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Modal } from "react-native-paper";
import { DevSettings } from 'react-native';
import * as Updates from 'expo-updates';
import { AxiosGet } from "../crud/crud";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function PageRightContent(props) {
    const [flg, setFlg] = useState()
    const [showFlg, setShowGFlg] = useState(false)
    const [isLogin, setIsLogin] = useState()
    const [showUsr, setShowUsr] = useState(false)



    useEffect(() => { start() }, [])
    const start = async () => {

        let lnconf = await AsyncStorage.getItem("language")

        setFlg(require("../assets/trk.png"))

        if (lnconf.includes("tr")) {


            setFlg(require("../assets/trk.png"))
        } else {

            setFlg(require("../assets/ing.png"))

        }

        AsyncStorage.getItem("tkn_sertifika").then((x) => {
            if (x) {
                AxiosGet("auth/tokencheck").then((y) => {
                    setIsLogin(y.data[0])
                }).catch((y) => {     setIsLogin(undefined)})
            } else {
                setIsLogin(undefined)
            }
        })

    }


    return (<View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }} >

        {!isLogin && <TouchableOpacity onPress={() => { props.props?.navigate("Login") }} style={{ marginRight: 17, backgroundColor: "white", padding: 2, borderRadius: 5 }}>
            <Image source={require("../assets/auth.png")} style={{ width: 25, height: 25 }}></Image>
        </TouchableOpacity>}
        {isLogin && <TouchableOpacity onPress={() => { setShowUsr(!showUsr) }} style={{ marginRight: 10, padding: 3, borderRadius: 5 }}>
            <Text>    <MaterialCommunityIcons
                name="account"
                size={30}
                color="black"
                style={{ textAlign: 'right', margin: 0, width: 10, backgroundColor: "white", borderRadius: 5 }}
            /> </Text>
        </TouchableOpacity>}

        {flg &&
            <TouchableOpacity onPress={() => { setShowGFlg(!showFlg) }}>
                <Avatar.Image size={30} style={{ borderWidth: 5, borderColor: "white", borderStyle: "solid", marginRight: 10 }} source={flg}></Avatar.Image>
            </TouchableOpacity>
        }
        {/* <Modal visible={()=>{setLoginModal(!lo)}}>

        </Modal> */}

        {showFlg && <View style={{ position: "absolute", top: "100%", backgroundColor: "white", padding: 15, right: 1, borderWidth: 5, borderColor: "#393185", borderStyle: "solid" }}>
        <TouchableOpacity onPress={()=>{setShowGFlg(false);setShowUsr(false)}} style={{position:"absolute",
            backgroundColor:"white",
            padding:5,
            borderColor:"red",
            borderWidth:2,
            borderStyle:"solid",
            borderRadius:50,
            top:-19,
            left:-10,
            width:35,
            height:35,
            justifyContent:"center"
        
            }}>
                <Text style={{textAlign:"center",fontWeight:"bold",fontSize:15}}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { AsyncStorage.setItem("language", "tr-US"); Updates.reloadAsync() }}>
                <Image style={{ resizeMode: "contain", width: 50, height: 50 }} source={require("../assets/trk.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { AsyncStorage.setItem("language", "en-US");; Updates.reloadAsync() }}>
                <Image style={{ resizeMode: "contain", width: 50, height: 50 }} source={require("../assets/ing.png")}></Image>
            </TouchableOpacity>
        </View>}
        {showUsr && <View style={{ position: "absolute", top: "100%", backgroundColor: "white", padding: 15, right: 1, borderWidth: 5, borderColor: "#393185", borderStyle: "solid" }}>
            <TouchableOpacity onPress={()=>{setShowGFlg(false);setShowUsr(false)}} style={{position:"absolute",
            backgroundColor:"white",
            padding:5,
            borderColor:"red",
            borderWidth:2,
            borderStyle:"solid",
            borderRadius:50,
            top:-19,
            left:-10,
            width:35,
            height:35,
            justifyContent:"center"
        
            }}>
                <Text style={{textAlign:"center",fontWeight:"bold",fontSize:15}}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text  style={{textAlign:"center",fontWeight:"bold"}}>{isLogin.firstName+" "+isLogin.lastname}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={{textAlign:"center",fontWeight:"bold",marginTop:6,marginBottom:6}}>{isLogin.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.props.push("DocumentApplication")} style={{backgroundColor:"green",marginTop:10}}>
            <Text style={{textAlign:"center",fontWeight:"bold",marginTop:6,marginBottom:6,color:"white"}}>Başvurular</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{AsyncStorage.removeItem("tkn_sertifika").then(()=>{ Updates.reloadAsync() })}} style={{backgroundColor:"grey",marginTop:15,width:70,alignSelf:"center",borderRadius:8}}>
            <Text style={{textAlign:"center",fontWeight:"bold",marginTop:6,marginBottom:6,color:"white"}}>Log out</Text>
            </TouchableOpacity>

        </View>}

    </View>);
}

export default PageRightContent;