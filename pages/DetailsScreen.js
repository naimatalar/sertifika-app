// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import { View, Text, SafeAreaView, Image, TextInput, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import Loading from '../components/Loading';
import { AxiosGet, fileurl } from '../crud/crud';
import LangApp from '../Language';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OpenURLButton from '../components/OpenURLButton';
const DetailsScreen = (props) => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {

    start()
  }, [])
  const start = async () => {


    var d = await AxiosGet("Document/GetByObjectIdMobil/" + props.route.params.objectId).then(x => { return x.data }).catch(x => { return x });
    setLoading(false)
    setData(d.data)
    setLoading(false)
  
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>
      <Loading style={{ flex: 1, flexDirection: "column" }} Loading={loading}>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#e8eaf6", borderBottomColor: "#a094b7", borderBottomWidth: 1, borderStyle: "solid", flex: 1 }}>
          <View style={{ flex: 2, padding: 5 }}>

            {data.company?.logoUrl && <Image source={{ uri: fileurl + "upload/" + data.company?.logoUrl }} style={{ flex: 1, width: "100%", height: "100%", resizeMode: "contain" }}></Image>}
            {data.person?.logoUrl && <Image source={{ uri: fileurl + "upload/" + data.person?.logoUrl }} style={{ flex: 1, width: "100%", height: "100%", resizeMode: "contain" }}></Image>}
            {data.product?.logoUrl && <Image source={{ uri: fileurl + "upload/" + data.product?.logoUrl }} style={{ flex: 1, width: "100%", height: "100%", resizeMode: "contain" }}></Image>}
            {!data.company?.logoUrl && !data.person?.logoUrl && !data.product?.logoUrl &&
            <>
             {data.documnetKind==1&&<Image source={require("../assets/person.png")} style={{ flex: 1, width: "100%", height: "100%", resizeMode: "contain" }}></Image>}
             {data.documnetKind==2&&<Image source={require("../assets/company.png")} style={{ flex: 1, width: "100%", height: "100%", resizeMode: "contain" }}></Image>}
             {data.documnetKind==3&&<Image source={require("../assets/product.png")} style={{ flex: 1, width: "100%", height: "100%", resizeMode: "contain" }}></Image>}

            </>
 
            }
          </View>
          <View style={{ flex: 3 }}>
            {data.company?.name && <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>{data.company?.name}</Text>}
            {data.product?.name && <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>{data.product?.name}</Text>}
            {data.person?.firstName && <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>{data.person?.firstName + " " + data.person?.lastName}</Text>}


          </View>
          <View style={{ flex: 1, padding: 5, alignItems: "flex-end" }}>

            <TouchableOpacity onPress={()=>{props.navigation.navigate("DataDetails",{id:data.companyId||data.personId||data.productId,documnetKind:data.documnetKind})}} style={{ backgroundColor: "white", padding: 5, paddingRight: 7, paddingLeft: 7, borderColor: "#bdbdbd", borderWidth: 1, borderRadius: 5 }}>
              <MaterialCommunityIcons
                name="information"
                size={25}
              />
              {/* <Text style={{ color: "#494949", fontSize: 12 ,textAlign:"center"}}>{LangApp("PressForDetail")}</Text> */}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 5, flexDirection: "row", marginTop: 20 }}>
          <ScrollView style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ alignSelf: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 17, color: "#ffa270" }}>{data.name}</Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 5, marginTop: 10 }}>
                <View style={{ flex: 1, paddingRight: 20, paddingLeft: 20 }}>
                  <Text style={{ fontWeight: "bold" }}>{LangApp("DocumentNo") + " : " + data.documentNo}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 15, marginTop: 10 }}>
                <View style={{ flex: 1, paddingRight: 20, paddingLeft: 20 }}>
                  <Text>{data.description}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", backgroundColor: "white", paddingTop: 15, paddingBottom: 15, marginBottom: 20 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <View style={{alignContent:"center"}}>
                    {
                      data.documentType == 1 &&
                      <>
                        <Image style={{ width: "100%", resizeMode: "contain", height: 50 }} source={require("../assets/report.png")}></Image>
                        <Text style={{ textAlign: "center", color: "#ffa270", fontWeight: 'bold' }}>{LangApp("Report")}</Text>
                      </>

                    }
                    {
                      data.documentType == 2 &&
                      <>
                        <Image style={{ width: "100%", resizeMode: "contain", height: 50 }} source={require("../assets/certificate.png")}></Image>
                        <Text style={{ textAlign: "center" }}>{LangApp("Certificate")}</Text>
                      </>
                    } 

                  </View>
                </View>
                <View style={{ flex: 2, flexDirection: "column" }}>
                  <View >
                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, textAlign: "center" }}>{LangApp("ExpireDate")}</Text>
                    <Text style={{ textAlign: "center" }}>{data.expireDate}</Text>
                  </View>
                </View>
                <View style={{ flex: 2 }}>
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, textAlign: "center" }}>{LangApp("DocumentDate")}</Text>
                    <Text style={{ textAlign: "center" }}>{data.documentDate}</Text>
                  </View>

                </View>

              </View>
              <View style={{ flexDirection: "column", paddingRight: 20, paddingLeft: 20, marginTop: 10 }}>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>{LangApp("Attachments")}</Text>

                </View>
                <View style={{ flexDirection: "column", marginTop: 10 }}>
                  {data?.documentFiles?.map((item, key) => {
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

      </Loading>

    </SafeAreaView>
  );
};
export default DetailsScreen;
