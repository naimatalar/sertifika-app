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
import { AxiosPost } from '../crud/crud';

const HomeScreen = ({ navigation }) => {
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(new Date())
  const [isDatesPickerVisible, setDatesPickerVisibility] = React.useState(false);
  const [isDateePickerVisible, setDateePickerVisibility] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [listData, setListData] = React.useState([]);
  const [transData, setTransData] = React.useState(false);
  const [totalData, setTotalData] = React.useState(0);
  const [dataLoading, setDataLoading] = React.useState(false);



  const showsDatePicker = () => {
    setDatesPickerVisibility(true);
  };

  const hidesDatePicker = () => {
    setDatesPickerVisibility(false);
  };

  const handlesConfirm = (date) => {
    setStartDate(date)
    hidesDatePicker();
  };
  const showeDatePicker = () => {
    setDateePickerVisibility(true);
  };

  const hideeDatePicker = () => {
    setDateePickerVisibility(false);
  };

  const handleeConfirm = (date) => {
    setEndDate(date)
    hideeDatePicker();
  };
  const getAllData = async (first = true) => {
    if (first === true) {
      setListData([])
    }
    setTransData(true)
    setDataLoading(true)
    setPageNumber(1)
    var d = await AxiosPost("Document/GetAll", {
      "pageNumber": pageNumber,
      "pageSize": 7,
      "startDate": startDate.toISOString(),
      "endDate": endDate.toISOString()
    }).then(x => { return x.data }).catch(x => { return x });

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
        console.log(sas, d.data.totalCount)
        setPageNumber(pageNumber + 1)

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
        <View style={{ flexDirection: 'row' }}>
          <View style={{ paddingLeft: 10, paddingRight: 10, flex: 2 }}>
            <Text style={{ marginBottom: 5 }}>Başlangı</Text>
            <TouchableOpacity onPress={showsDatePicker} style={styles.datetimeP} >
              <MaterialCommunityIcons
                name="calendar"
                size={25}
              />
              <Text >
                {startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear()}
              </Text>
            </TouchableOpacity>

          </View>
          {/* <View style={{ flex: 1, textAlign: "center", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Text>
              <MaterialCommunityIcons
                name="arrow-left-right-bold"
                size={20}
              />

            </Text>
          </View> */}

          <View style={{ flex: 2, paddingLeft: 10, paddingRight: 10 }} >
            <Text style={{ marginBottom: 5 }}>Bitiş</Text>
            <TouchableOpacity style={styles.datetimeP} onPress={showeDatePicker} >
              <MaterialCommunityIcons
                name="calendar"
                size={25}
              />
              <Text >

                {endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear()}
              </Text>
            </TouchableOpacity>

          </View>
          <View style={{ flex: 2, textAlign: "center", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "row" }}>

            <TouchableOpacity
              onPress={() => { setPageNumber(1); getAllData() }}
              style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", borderWidth: 1, flex: 1, height: 45, marginTop: 20, paddingLeft: 4, paddingRight: 4, backgroundColor: "#d8672b", borderRadius: 5, }}>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="magnify-expand"
                  size={20}
                  color="white"
                />
                <Text style={{ fontWeight: "bold", color: "white" }}> Ara</Text>
              </View>

            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatesPickerVisible}
          mode="date"
          onConfirm={handlesConfirm}
          onCancel={hidesDatePicker}
          confirmTextIOS="Seç"
          cancelTextIOS='Vazgeç'
          locale='tr-TR'
        />
        <DateTimePickerModal
          isVisible={isDateePickerVisible}
          mode="date"
          onConfirm={handleeConfirm}
          onCancel={hideeDatePicker}
          confirmTextIOS="Seç"
          cancelTextIOS='Vazgeç'
          locale='tr-TR'
        />

      </View>


      <View style={{ flex: 14, padding: 16, paddingTop: 0 }}>
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
              var dimgN = item.documnetKind;

              return (

                <View
                  key={key}
                  style={styles.button}
                // onPress={() =>navigation.navigate('SettingsStack', { screen: 'Settings' })}
                >

                  <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Image style={{ width: 25, height: 25, marginRight: 5, flex: 1, resizeMode: "contain" }} source={
                      (dimgN == 1 && require("../assets/pimage1.png") || dimgN == 2 && require("../assets/pimage2.png") || dimgN == 3 && require("../assets/pimage3.png"))
                    } />

                    <Text style={{ flex: 4 }}>{fppName}</Text>
                    <Text style={{ flex: 2, fontStyle: "italic", fontSize: 12, textAlign: "right", color: "grey" }}>{item.documentDate}</Text>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 20, paddingLeft: 14 }}>
                    <Text style={{ flex: 1 }}>
                      {item.name}
                    </Text>
                    <TouchableOpacity style={{ fontSize: 18, flex: 1, alignSelf: "flex-end" }} onPress={() => navigation.navigate("Details", { documnetKind: dimgN, objectId: item.id })}>
                      <MaterialCommunityIcons
                        name="magnify"
                        size={20}
                        color="black"
                        style={{ textAlign: 'right' }}
                      />
                    </TouchableOpacity>
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
    borderColor: '#DDDDDD',
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
export default HomeScreen;
