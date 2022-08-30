import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Loading from '../components/Loading';
import { AxiosPost, fileurl } from '../crud/crud';
import LangApp from '../Language';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Portal, Provider } from 'react-native-paper';

function DataDetail(props) {
    const [data, setData] = useState()
    const [loading, setLoading] = React.useState(true);
    const [modal, setModal] = React.useState(false);

    useEffect(() => {
        start()
    }, [])
    const start = async () => {

        var d = await AxiosPost("FPP/GetData", {
            "documnetKind": props.route.params.documnetKind,
            "objectId": props.route.params.id,
        }).then(x => { return x.data }).catch(x => { return x });
        setData(d.data)
        setLoading(false)
    }
    const containerStyle = { backgroundColor: 'white', padding: 20,width:"95%",alignSelf:"center",borderRadius:10 };
    return (
        <Provider>
            <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>


                <Loading style={{ flex: 1 }} Loading={loading}>

                    <Portal>
                        <Modal visible={modal}  onDismiss={()=>{setModal(false)}} contentContainerStyle={containerStyle}>
                            <Text>Example Modal.  Click outside this area to dismiss.</Text>
                        </Modal>
                    </Portal>

                    <View style={{ flex: 1, flexDirection: "column" }}>


                        <View style={{ flex: 1, flexDirection: "row", paddingTop: 20, backgroundColor: "#e8eaf6", borderBottomColor: "#a094b7", borderBottomWidth: 1, borderStyle: "solid" }}>


                            <View style={{ alignItems: "center", flexDirection: "column", flex: 1 }}>
                                <View style={{ flex: 1, width: "100%" }}>
                                    <Image source={{ uri: fileurl + "upload/" + data?.logoUrl }} style={{ width: "100%", height: "100%", resizeMode: "contain" }}></Image>

                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, flex: 1, marginTop: 5, textAlign: "center" }}>{data?.name} </Text>

                                </View>



                            </View>


                        </View>
                        <View style={{ flex: 5, flexDirection: "column" }}>
                            <ScrollView style={{ padding: 10 }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("Email") + " : "}</Text>
                                    <Text >{data?.email}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", marginTop: 7 }}>
                                    <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("Phone") + " : "}</Text>
                                    <Text >{data?.phone}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", marginTop: 7, }}>
                                    <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("Address") + " : "}</Text>
                                    <Text >{data?.address}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", marginTop: 15 }}>
                                    <Text >{data?.description}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: "column", marginTop: 20, backgroundColor: "white" }}>
                                    <View><Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>Sertifika Ve Raporlar</Text></View>
                                    <View style={{ flexDirection: "column", marginTop: 10, padding: 5 }}>
                                        {
                                            data?.documents?.map((item, key) => {
                                                var dType = item.documentType == 1 ? LangApp("Certificate") : LangApp("Report")
                                                var icn = item.documentType == 1 ? <Image style={styles.Image} source={require("../assets/report.png")}></Image> : <Image style={styles.Image} source={require("../assets/certificate.png")}></Image>
                                                return (
                                                    <View key={key} style={{ flexDirection: "row", flex: 1, marginBottom: 15, backgroundColor: "#eeeeee" }}>
                                                        <View style={{ flexDirection: "row", alignItems: "center", flex: 1, padding: 5 }}>
                                                            {icn}
                                                        </View>
                                                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 4, padding: 5 }}>
                                                            <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("DocName")}</Text>
                                                            <Text style={{ textAlign: "center" }}>{item.name}</Text>
                                                        </View>

                                                        <View style={{ flexDirection: "column", justifyContent: "center", flex: 4, alignItems: "center", padding: 5 }}>
                                                            <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("DocumentDate")}</Text>
                                                            <Text>{item.documentDate}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() => setModal(!modal)} style={{ flexDirection: "column", justifyContent: "center", flex: 2, alignItems: "center", backgroundColor: "#d8672b" }}>

                                                            <MaterialCommunityIcons
                                                                name="magnify"
                                                                size={20}
                                                                color="black"
                                                                style={{ textAlign: 'right' }}
                                                            />
                                                            <Text>{LangApp("Detail")}</Text>
                                                        </TouchableOpacity>

                                                    </View>

                                                )

                                            })
                                        }
                                    </View>
                                </View>

                            </ScrollView>
                        </View>
                    </View>
                </Loading>
            </SafeAreaView >
        </Provider>
    );
}
const styles = StyleSheet.create({
    Image: {
        flex: 1,

        height: "100%",
        resizeMode: "contain"

    },

});
export default DataDetail;  