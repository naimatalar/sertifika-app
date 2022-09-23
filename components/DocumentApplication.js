import React, { useState } from 'react';
import { Modal, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { Portal, Provider, TextInput } from 'react-native-paper';
import LangApp from '../Language';

function DocumentApplication({ visible = false, hideModal }) {
    const containerStyle = { backgroundColor: 'white', padding: 20, flexDirection: "row" };
    const [fullName, setFullName] = useState()
    const [mail, setMail] = useState()
    const [phone, setPhone] = useState()

    return (



        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View style={{ flex: 1 }}>

            </View>
            <View style={{ flex: 2, flexDirection: "column" }}>
                <View style={{width:"100%",marginBottom:20}}>
                    <TextInput onChangeText={(x) => { setFullName(x) }} clearButtonMode={'always'} style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "100%", fontSize: 11,marginBottom:10 }} selectionColor='green' label={LangApp("FullName")}></TextInput>
                    <TextInput onChangeText={(x) => { setMail(x) }} clearButtonMode={'always'} style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "100%", fontSize: 11,marginBottom:10 }} selectionColor='green' label={LangApp("Email")}></TextInput>
                    <TextInput onChangeText={(x) => { setPhone(x) }} clearButtonMode={'always'} style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "100%", fontSize: 11,marginBottom:10 }} selectionColor='green' label={LangApp("Phone")}></TextInput>

                </View>
                <View style={{ flexDirection: "row", height: 35, justifyContent: "center" }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "green", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white" }}>Başvur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>hideModal()} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "red" }}>
                        <Text style={{ color: "white" }}>Vazgeç</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>

            </View>
        </Modal>




    );
}

export default DocumentApplication;