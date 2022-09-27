import React, { useState } from 'react';
import { Text, Touchable, TouchableOpacity, View, Image } from 'react-native';
import { Portal, Provider, TextInput, Modal } from 'react-native-paper';
import { AxiosPost } from '../crud/crud';
import LangApp from '../Language';

function DocumentApplication({ visible = false, hideModal,documentId}) {
    const containerStyle = { padding: 20, flexDirection: "row", width: "100%", justifyContent: "center" };
    const [fullName, setFullName] = useState()
    const [mail, setMail] = useState()
    const [phone, setPhone] = useState()
    const appliCationSend = async () => {
        var apdata = {
            "documentId": documentId,
            "fullName": fullName,
            "mail": mail,
            "posta": "",
            "phone": phone
        }


            if (!fullName || !mail || !phone) {
                alert("Lütfen alanları doldurunuz")
                return false
            }
           
            await AxiosPost("DocumentApplication/create", apdata).then(x => {
                alert("Başvuru Alındı. En kısa sürede işlemler başlartlıp tarafınıza bilgi verilecektir.")
               hideModal();
            })
    
    }
    return (



        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

            <View style={{ flex: 2, flexDirection: "column", alignSelf: "center", backgroundColor: 'white', padding: 20 }}>

                <View style={{ width: "90%", marginBottom: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", left: 1, marginBottom: 15 }}>
                        <Image source={require("../assets/sertifika.png")} style={{ width: 35, height: 50 }}></Image>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#26418f" }}>{LangApp("OnlineApplicationForm")}</Text>
                    </View>

                    <TextInput onChangeText={(x) => { setFullName(x) }} clearButtonMode={'always'} style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "100%", fontSize: 11, marginBottom: 10 }} selectionColor='green' label={LangApp("FullName")}></TextInput>
                    <TextInput onChangeText={(x) => { setMail(x) }} clearButtonMode={'always'} style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "100%", fontSize: 11, marginBottom: 10 }} selectionColor='green' label={LangApp("Email")}></TextInput>
                    <TextInput onChangeText={(x) => { setPhone(x) }} clearButtonMode={'always'} style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "100%", fontSize: 11, marginBottom: 10 }} selectionColor='green' label={LangApp("Phone")}></TextInput>

                </View>
                <View style={{ flexDirection: "row", height: 35, justifyContent: "center", marginTop: 20 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "green", justifyContent: "center", alignItems: "center" }} onPress={()=>appliCationSend()}>
                        <Text style={{ color: "white" }}>Başvur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => hideModal()} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "red" }}>
                        <Text style={{ color: "white" }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>




    );
}

export default DocumentApplication;