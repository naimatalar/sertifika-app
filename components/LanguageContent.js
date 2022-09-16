import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import {DevSettings} from 'react-native';
import * as Updates from 'expo-updates';
function LanguageContent() {
    const [flg, setFlg] = useState()
    const [showFlg, setShowGFlg] = useState(false)

    useEffect(() => { start() }, [])
    const start = async () => {

        let lnconf = await AsyncStorage.getItem("language")
console.log(lnconf)
        setFlg(require("../assets/trk.png"))

        if (lnconf.includes("tr")) {


            setFlg(require("../assets/trk.png"))
        } else {

            setFlg(require("../assets/ing.png"))

        }

    }


    return (<View style={{ flex: 1, flexDirection: "row" }}>
        {flg && <TouchableOpacity onPress={()=>{setShowGFlg(!showFlg)}}>
            <Avatar.Image size={40} style={{ borderWidth: 5, borderColor: "white", borderStyle: "solid", marginRight: 10 }} source={flg}></Avatar.Image>
        </TouchableOpacity>}

      { showFlg&& <View style={{ position: "absolute", top: "100%", backgroundColor: "white", padding: 15, right: 1, borderWidth: 5, borderColor: "#393185", borderStyle: "solid" }}>
            <TouchableOpacity  onPress={()=>{AsyncStorage.setItem("language","tr-US");Updates.reloadAsync()}}>
                <Image style={{ resizeMode: "contain", width: 50, height: 50 }} source={require("../assets/trk.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{AsyncStorage.setItem("language","en-US");;Updates.reloadAsync()}}>
                <Image style={{ resizeMode: "contain", width: 50, height: 50 }} source={require("../assets/ing.png")}></Image>
            </TouchableOpacity>
        </View>}
    </View>);
}

export default LanguageContent;