
// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AxiosPost, fileurl } from '../crud/crud';
import { TextInput } from 'react-native-paper';
import LangApp from '../Language';

const DocumentApplicationScreen = (props) => {
  const [companyName, setCompanyName] = React.useState("")
  const [isDatesPickerVisible, setDatesPickerVisibility] = React.useState(false);
  const [isDateePickerVisible, setDateePickerVisibility] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [listData, setListData] = React.useState([]);
  const [transData, setTransData] = React.useState(false);
  const [totalData, setTotalData] = React.useState(0);
  const [dataLoading, setDataLoading] = React.useState(false);
  const [isPageLoadData, setIsPagaLoadData] = React.useState(true);




  React.useEffect(() => { getAllData() }, [])

  const getAllData = async (first = true) => {
    if (first === true) {
      //  setPageNumber(1)
      setListData([])
    }
    setTransData(true)
    setDataLoading(true)

    var d = {}
    if (isPageLoadData == false) {
      d = await AxiosPost("DocumentApplication/GetAllMobil", {
        "pageNumber": first == true ? 1 : pageNumber + 1,
        "pageSize": 10,
        "name": companyName,

      }).then(x => { return x.data }).catch(x => { return x });
    } else {
      d = await AxiosPost("DocumentApplication/GetAllMobil", {
        "pageNumber": first == true ? 1 : pageNumber + 1,
        "pageSize": 10,

      }).then(x => { return x.data }).catch(x => { return x });
    }
    console.log(d)
    var ll = listData;
    setTotalData(d.data.totalCount)


    d.data.list.forEach(element => {
      ll.push(element)
    });
    setTimeout(() => {
      if (first === true) {
        setListData(d.data.list)

      } else {

        setListData(ll)
        var sas = pageNumber + 1
        setPageNumber(sas)

      }
      setTransData(false)
      setDataLoading(false)
    }, 100);



  };


  const scrollBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>


      <View style={{ flex: 2, flexDirection: "column", justifyContent: 'center', paddingBottom: 30, paddingTop: 20, backgroundColor: "#e8eaf6", borderBottomColor: "#a094b7", borderBottomWidth: 1, borderStyle: "solid" }}>
        {/* <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 10 }}><Text style={{ color: "#393185", textAlign: "center", fontWeight: "bold", marginTop: 20 }}>Tarihe Göre Sertifika/Rapor Arama </Text></View> */}
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>Başuvuruyu Yapan Kişinin Adı ile Arama</Text>
        <View style={{ flexDirection: 'row' }}>


          <View style={{ paddingLeft: 10, paddingRight: 10, flex: 3 }}>

            <TextInput clearButtonMode='always' onChangeText={(x) => { setCompanyName(x) }} placeholder={LangApp("TouchForSearch")} style={{ height: 45, marginTop: 20 }}></TextInput>

          </View>
          {/* <View style={{ flex: 1, textAlign: "center", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Text>
              <MaterialCommunityIcons
                name="arrow-left-right-bold"
                size={20}
              />

            </Text>
          </View> */}


          <View style={{ flex: 1, textAlign: "center", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => { setIsPagaLoadData(false); setPageNumber(1); getAllData() }}
              style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", borderWidth: 1, flex: 1, height: 45, marginTop: 20, paddingLeft: 4, paddingRight: 4, backgroundColor: "#d8672b", borderRadius: 5, }}>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="magnify-expand"
                  size={20}
                  color="white"
                />
                <Text style={{ fontWeight: "bold", color: "white" }}> {LangApp("Find")}</Text>
              </View>

            </TouchableOpacity>

          </View>
        </View>


      </View>


      <View style={{ flex: 14, padding: 0, paddingTop: 0 }}>

        <ScrollView onScroll={({ nativeEvent }) => {
          if (pageNumber != totalData) {
            setDataLoading(true)
          }
          if (scrollBottom(nativeEvent)) {
            if (transData == false) {
              if (pageNumber != totalData) {
                getAllData(false)
              }
            }
          }
        }}>


          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {
              listData.length == 0 && dataLoading == false && transData == false && <View style={{ alignItems: "center", flex: 1, marginTop: 50 }}>


                <Image style={{ width: 120, height: 120 }} source={require("../assets/notfound.png")}></Image>
                <Text style={{ fontWeight: "bold", color: "red", fontSize: 20, marginTop: 10 }}>{LangApp("NoResult")}</Text>

              </View>
            }

            {listData.map((item, key) => {

              var fppName = "";
              if (item.companyName != null) {
                fppName = item.companyName
              }
              if (item.personName != " ") {
                fppName = item.personName
              }
              if (item.productName != null) {
                fppName = item.productName
              }
              //   var dimgN = item.documnetKind;
              //  console.log(dimgN)
              return (

                <View key={key} style={{ minHeight: 65, flexDirection: "row", flex: 1, marginBottom: 10, backgroundColor: "white", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#d8672b", borderWidth: 1 }}>
                  <View style={{ flexDirection: "column", alignItems: "center", justifyContent:"center", flex: 4, padding: 5 }}>
                    <Text style={{ textAlign: "center",fontWeight:"bold" }}>{item.fullName}</Text>
                    <Text style={{ textAlign: "center",fontSize:9 }}>{item.mail}</Text>

                  </View>
                  <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 4, padding: 5 }}>
                    <Text style={{ textAlign: "center", fontWeight:"bold"}}>{item.phone}</Text>
                    <Text style={{ textAlign: "center",fontStyle:"italic" }}>{new Date(item.createDate).getDate()+"/"+new Date(item.createDate).getMonth()+"/"+new Date(item.createDate).getFullYear()}</Text>

                  </View>


                  <View style={{ flexDirection: "column", justifyContent: "center", flex: 3, alignItems: "center", backgroundColor: (item.status==1&& "#e4a300" || item.status==2&& "green"||item.status==3&&"red" ) }}>

                    {/* <MaterialCommunityIcons
                      name="magnify"
                      size={20}
                      color="white"
                      style={{ textAlign: 'right' }}
                    /> */}
                    <Text style={{ color: "white", fontWeight: "bold" }}>{(item.status==1&& "Bekleniyor" || item.status==2&& "Onaylandı"||item.status==3&&"Onaylanmadı" )}</Text>
                  </View>

                </View>
              )
            })}


          </View>
          {dataLoading && <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <Image style={{ width: 50, height: 50, alignSelf: "center" }} source={require("../assets/loading.gif")} ></Image>
          </View>
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: "white",
    padding: 7,
    width: "100%",
    marginTop: 10,
    flexDirection: "column",
    borderRadius: 10,
    borderColor: '#d8672b',
    borderStyle: "solid",
    borderWidth: 1
  },
  datetimeP: {
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: "#26418f",
    backgroundColor: "white",
    padding: 8,
    justifyContent: "space-around",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center"


  }
});
export default DocumentApplicationScreen;
