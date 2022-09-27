import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import { AxiosPost } from "../crud/crud";
import * as Updates from 'expo-updates';
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginPages(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = async () => {
        var d = await AxiosPost("auth/login", { userName: email, password: password }).then(x => { return x.data }).catch(x => { return x });
        
        if (d.error) {
            alert("Girş Hatalı")
        }else{
            AsyncStorage.setItem("tkn_sertifika",d.token)
            Updates.reloadAsync();
        }
    }
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/sertifika.png")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity>
                <Text style={styles.forgot_button}>Sertifika Login Form</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
                <Text style={{ color: "white", fontWeight: "bold" }}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
        width: 80,
        height: 120
    },

    inputView: {
        backgroundColor: "#dae8ff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        //   marginLeft: 20,

    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#d8672b",

    },
});

export default LoginPages;