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
  FlatList,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AxiosPost, fileurl } from '../crud/crud';
import { TextInput } from 'react-native-paper';
import LangApp from '../Language';
import PersonFlatList from '../components/PersonFlatList';

const PersonScreens = (props) => {
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

    var d = []
    if (isPageLoadData == false) {
      d = await AxiosPost("Person/search", {
        "pageNumber": first == true ? 1 : pageNumber + 1,
        "pageSize": 10,
        "name": companyName,

      }).then(x => { return x.data }).catch(x => { return x });
    } else {
      d = await AxiosPost("Person/GetAllMobil", {
        "pageNumber": first == true ? 1 : pageNumber + 1,
        "pageSize": 10,

      }).then(x => { return x.data }).catch(x => { return x });
    }
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
    }, 600);



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
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>{LangApp("EnterNameForSearch")}</Text>
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


      <SafeAreaView style={{ flex: 14, padding: 0, paddingTop: 0 }}>

        <View nestedScrollEnabled={true} style={{flexGrow:1}} >


          <View
            style={{
              flex: 1,
       
          alignContent:"center",
          alignItems:"center"
             
            }}>
            {
              listData.length == 0 && dataLoading == false && transData == false && <View style={{ alignItems: "center", flex: 1, marginTop: 50 }}>


                <Image style={{ width: 120, height: 120 }} source={require("../assets/notfound.png")}></Image>
                <Text style={{ fontWeight: "bold", color: "red", fontSize: 20, marginTop: 10 }}>{LangApp("NoResult")}</Text>

              </View>
            }

           

            <FlatList
              data={listData}
              renderItem={({ item }) =><PersonFlatList key={item.id} item={item} prp={props}/>}
              horizontal={false}
              keyExtractor={item => item.id}
              ListEmptyComponent={dataLoading && <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Image style={{ width: 50, height: 50, alignSelf: "center" }} source={require("../assets/loading.gif")} ></Image>
            </View>}
            
              numColumns={2}
              onScroll={({ nativeEvent }) => {
              
                // if (pageNumber != totalData) {
                //   setDataLoading(true)
                // }
                if (scrollBottom(nativeEvent)) {
                  if (transData == false) {
                    if (pageNumber != totalData) {
                      getAllData(false)
                    }
                  }
                }
              }}
            />

          </View>
          {dataLoading && <View style={{ justifyContent: "center", flexDirection: "row",position:"absolute", bottom:10,width:"100%",backgroundColor:"white",paddingBottom:25}}>
             <Image style={{ width: 50, height: 50, alignSelf: "center" }} source={require("../assets/loading.gif")} ></Image>
           </View>}
        </View>
      </SafeAreaView>
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
export default PersonScreens;
