import React, { useEffect, useState } from 'react';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Loading from '../components/Loading';
import { AxiosPost, fileurl } from '../crud/crud';
import LangApp from '../Language';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Portal, Provider } from 'react-native-paper';
import OpenURLButton from '../components/OpenURLButton';

function DataDetail(props) {
    const [data, setData] = useState()
    const [loading, setLoading] = React.useState(true);
    const [modal, setModal] = React.useState(false);
    const [docData, setDocData] = React.useState({});

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
        console.log(d.data)
    }
    const containerStyle = { backgroundColor: 'white', padding: 20, width: "85%", alignSelf: "center", borderRadius: 10, maxHeight: "80%" };
    return (
        <Provider>
            <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>


                <Loading style={{ flex: 1 }} Loading={loading}>

                    <Portal>
                        <Modal visible={modal} onDismiss={() => { setModal(false) }} contentContainerStyle={containerStyle}>
                            <TouchableOpacity onPress={() => { setModal(false) }} style={{ position: "absolute", top: -45, right: -20, backgroundColor: "black", borderRadius: 50 }}>
                                <MaterialCommunityIcons
                                    name="close-circle-outline"
                                    size={40}
                                    color="white"
                                    style={{ textAlign: 'right' }}
                                />

                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <ScrollView>


                                    <View style={{ flex: 5, flexDirection: "row", marginTop: 20 }}>
                                        <ScrollView style={{ flex: 1, flexDirection: "column" }}>
                                            <View style={{ flexDirection: "column" }}>
                                                <View style={{ alignSelf: "center" }}>
                                                    <Text style={{ fontWeight: "bold", fontSize: 17, color: "#ffa270" }}>{docData.name}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5, marginTop: 10 }}>
                                                    <View style={{ flex: 1, paddingRight: 20, paddingLeft: 20 }}>
                                                        <Text style={{ fontWeight: "bold" }}>{LangApp("DocumentNo") + " : " + docData.documentNo}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 15, marginTop: 10 }}>
                                                    <View style={{ flex: 1, paddingRight: 20, paddingLeft: 20 }}>
                                                        <Text>{docData.description}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row", backgroundColor: "white", paddingTop: 15, paddingBottom: 15, marginBottom: 20 }}>
                                                    <View style={{ flex: 1, flexDirection: "column" }}>
                                                        <View style={{ alignContent: "center" }}>
                                                            {
                                                                docData.documentType == 1 &&
                                                                <>
                                                                    <Image style={{ width: "100%", resizeMode: "contain", height: 50 }} source={require("../assets/report.png")}></Image>
                                                                    <Text style={{ textAlign: "center", color: "#ffa270", fontWeight: 'bold' }}>Rapor</Text>
                                                                </>

                                                            }
                                                            {
                                                                docData.documentType == 2 &&
                                                                <>
                                                                    <Image style={{ width: "100%", resizeMode: "contain", height: 50 }} source={require("../assets/certificate.png")}></Image>
                                                                    <Text style={{ textAlign: "center" }}>Sertifika</Text>
                                                                </>
                                                            }

                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 2, flexDirection: "column" }}>
                                                        <View >
                                                            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, textAlign: "center" }}>{LangApp("ExpireDate")}</Text>
                                                            <Text style={{ textAlign: "center" }}>{docData.expireDate}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 2 }}>
                                                        <View>
                                                            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, textAlign: "center" }}>{LangApp("DocumentDate")}</Text>
                                                            <Text style={{ textAlign: "center" }}>{docData.documentDate}</Text>
                                                        </View>

                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: "column", paddingRight: 20, paddingLeft: 20, marginTop: 10 }}>
                                                    <View>
                                                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{LangApp("Attachments")}</Text>

                                                    </View>
                                                    <View style={{ flexDirection: "column", marginTop: 10 }}>
                                                        {docData?.documentFiles?.map((item, key) => {
                                                            return (
                                                                <View key={key} style={{
                                                                    flexDirection: "row",
                                                                    justifyContent: "space-between",
                                                                    alignItems: "center",
                                                                    backgroundColor: "white",
                                                                    marginBottom: 10,
                                                                    padding: 10
                                                                }}>
                                                                    <View>
                                                                        <MaterialCommunityIcons
                                                                            name="file-outline"
                                                                            size={35}
                                                                        />
                                                                        <Text style={{ textAlign: "center" }}>{item.extension.replace(".", "").toLocaleLowerCase()}</Text>
                                                                    </View>
                                                                    <View>

                                                                        <Text>{(item.size > 1024 ? (item.size / 1024) + " kb" : item.size + " mb")}</Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: "column" }}>


                                                                        <OpenURLButton url={fileurl + "upload/" + item.url}>

                                                                            <MaterialCommunityIcons
                                                                                name="folder-download"
                                                                                size={35}
                                                                            />
                                                                        </OpenURLButton>


                                                                    </View>
                                                                </View>
                                                            )

                                                        })}
                                                    </View>
                                                </View>
                                            </View>

                                        </ScrollView>

                                    </View>
                                </ScrollView>

                            </View>
                        </Modal>
                    </Portal>

                    <View style={{ flex: 1, flexDirection: "column" }}>


                        <View style={{ flex: 1, flexDirection: "row", paddingTop: 20,paddingBottom:10, backgroundColor: "#e8eaf6", borderBottomColor: "#a094b7", borderBottomWidth: 1, borderStyle: "solid" }}>


                            <View style={{ alignItems: "center", flexDirection: "column", flex: 1 }}>
                                <View style={{ flex: 1, width: "100%" }}>
                                    <Image source={{ uri: fileurl + "upload/" + data?.logoUrl }} style={{ width: "100%", height: "100%", resizeMode: "contain" }}></Image>

                                </View>

                                {/* <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, flex: 1, marginTop: 5, textAlign: "center" }}>{data?.name} </Text>

                                </View> */}



                            </View>


                        </View>
                        <View style={{ flex: 5, flexDirection: "column" }}>
                            <ScrollView style={{ padding: 10 }}>
                                {
                                   props.route.params.documnetKind == 1 && <>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("Name") + " : "}</Text>
                                            <Text >{data?.firstName+ " "+data?.lastName}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: "row", marginTop: 7 }}>
                                            <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("Job") + " : "}</Text>
                                            <Text >{data?.title}</Text>
                                        </View>
                                        {/* <View style={{ flex: 1, flexDirection: "row", marginTop: 7, }}>
                                            <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("Address") + " : "}</Text>
                                            <Text >{data?.address}</Text>
                                        </View> */}


                                    </>
                                }
                                {
                                    props.route.params.documnetKind == 2 && <>
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
                                    </>}
                                    {
                                    props.route.params.documnetKind == 3 && <>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("Name") + " : "}</Text>
                                            <Text >{data?.name}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: "row", marginTop: 7 }}>
                                            <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("ProductCompany") + " : "}</Text>
                                            <Text >{data?.companyName}</Text>
                                        </View>
                                        
                                    </>}


                                <View style={{ flex: 1, flexDirection: "row", marginTop: 15 }}>
                                    <Text >{data?.description}</Text>
                                </View>


                                <View style={{ flex: 1, flexDirection: "column", marginTop: 20, backgroundColor: "white" }}>
                                    <View><Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{LangApp("CertificateAndReport")}</Text></View>
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
                                                        <TouchableOpacity onPress={() => { setDocData(item); setModal(!modal) }} style={{ flexDirection: "column", justifyContent: "center", flex: 2, alignItems: "center", backgroundColor: "#d8672b" }}>

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