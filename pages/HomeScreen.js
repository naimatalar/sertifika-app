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
  const getAllData = async () => {

    var d = await AxiosPost("Document/GetAll", {
      "pageNumber": 1,
      "pageSize": 15,
      "startDate": startDate.toISOString(),
      "endDate": endDate.toISOString()
    }).then(x => { return x.data }).catch(x => { return x });

    setListData(d.data.list)
    //  setPageNumber(da.data.pageNumber)

    console.log(d.data.list)
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>


      <View style={{ flex: 3, flexDirection: "column", justifyContent: 'center', borderBottomWidth: 1, paddingBottom: 50, backgroundColor: "#bcbcbc" }}>
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 10 }}><Text style={{ color: "#393185", textAlign: "center", fontWeight: "bold", marginTop: 20 }}>Tarihe Göre Sertifika/Rapor Arama </Text></View>
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
              onPress={() => { getAllData() }}
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
        <ScrollView>


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
              debugger
              return (

                <TouchableOpacity
                  key={key}
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('SettingsStack', { screen: 'Settings' })
                  }>

                  <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Image style={{ width: 20, height: 20, marginRight: 5, flex: 1, resizeMode: "contain" }} source={
                      (dimgN == 1 && require("../assets/pimage1.png") || dimgN == 2 && require("../assets/pimage2.png") || dimgN == 3 && require("../assets/pimage3.png"))
                    } />

                    <Text style={{ flex: 4 }}>{fppName}</Text>
                    <Text style={{ flex: 2 }}>{item.documentDate}</Text>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "Center" }}>
                    <Text style={{fontSize:18}}>
                      {item.name}
                    </Text>
                  </View>

                </TouchableOpacity>
              )
            })}


          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 7,
    width: "100%",
    marginTop: 10,
    flexDirection: "column"
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
