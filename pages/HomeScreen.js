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
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AxiosPost, fileurl } from '../crud/crud';
import LangApp from '../Language';
import { Checkbox, Switch, TextInput } from 'react-native-paper';
import LoginControl from '../components/LoginControl';


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
  const [isPageLoadData, setIsPagaLoadData] = React.useState(true);
  const [filterDetail, setFilterDetail] = React.useState(false);
  const [filterList, setFilterList] = React.useState([]);
  const [documentType, setDocumentType] = React.useState([]);
  const [refresh, setRefresh] = React.useState(new Date());
  const [filterWho, setFilterWho] = React.useState([]);
  const [fDocumentName, setFDocumentName] = React.useState(null);
  const [fDocumentBelongName, setFDocumentBelongName] = React.useState(null);
  const [fDocumentNo, setFDocumentNo] = React.useState(null);
  const [firstScreen, setFirstScreen] = React.useState(true);

  const isLogin = LoginControl();

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
  const toggleFilterList = (value) => {
    var flr = filterList
    if (flr.filter(x => { return x == value }).length > 0) {
      flr = flr.filter(x => { return x != value })
      setFilterList(flr)
    } else {
      flr.push(value);
      setFilterList(flr)
    }

    setRefresh(new Date())

  };
  const toggleDocumentTypeList = (value) => {
    var flr = documentType
    if (flr.filter(x => { return x == value }).length > 0) {
      flr = flr.filter(x => { return x != value })
      setDocumentType(flr)
    } else {
      flr.push(value);
      setDocumentType(flr)
    }

    setRefresh(new Date())

  };
  const toggleFilterWho = (value) => {
    var flr = filterWho
    if (flr.filter(x => { return x == value }).length > 0) {
      flr = flr.filter(x => { return x != value })
      setFilterWho(flr)
    } else {
      flr.push(value);
      setFilterWho(flr)
    }

    setRefresh(new Date())

  };


  const handleeConfirm = (date) => {
    setEndDate(date)
    hideeDatePicker();
  };
  React.useEffect(() => {
  
      //  getAllData();
      //  setRefresh(new Date())
  
  }, [])


  const getAllData = async (first = true) => {
    if (first === true) {
      //  setPageNumber(1)
      setListData([])
    }
    setTransData(true)
    setDataLoading(true)

    var d = {}
    if (filterDetail == true) {
      let filter = {
        pageNumber: first == true ? 1 : pageNumber + 1,
        pageSize: 10,
        startDate: null,
        endDate: null,
        documentNo: fDocumentNo,
        isCertificate: documentType.filter(x => { return x == "Certificate" }).length > 0 ? true : false,
        isReport: documentType.filter(x => { return x == "Report" }).length > 0 ? true : false,
        name: fDocumentName,
        documentKind: filterWho,
        documentBelongName: fDocumentBelongName
      }
   

      if (!filter.documentBelongName && !filter.documentNo && !filter.name&&!isLogin) {
        alert("Belge Ad??, Belge Sahibi Ad?? yada Onay Numaras?? Giriniz.")
        setTransData(false)
        setDataLoading(false)
        return false
      }

      d = await AxiosPost("Document/GetAll", filter).then(x => { return x.data }).catch(x => { return x });
    } else {
      if (isPageLoadData == false) {
        d = await AxiosPost("Document/GetAll", {
          "pageNumber": first == true ? 1 : pageNumber + 1,
          "pageSize": 10,
          "startDate": startDate.toISOString(),
          "endDate": endDate.toISOString()
        }).then(x => { return x.data }).catch(x => { return x });

      } else {
        d = await AxiosPost("Document/GetAllFull", {
          "pageNumber": first == true ? 1 : pageNumber + 1,
          "pageSize": 10,

        }).then(x => { return x.data }).catch(x => { return x });
        debugger
      }
    }
    var ll = listData;

    setTotalData(d.data?.totalCount)


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
setFirstScreen(false)


  };

  const getSingleData = async () => {
    setListData([])
    setTransData(true)
    setDataLoading(true)

    let filter = {
      pageNumber: 1,
      pageSize: 10,
      startDate: null,
      endDate: null,
      documentNo: fDocumentNo,
      isCertificate: true,
      isReport: true,
      name: null,
      documentKind: ["Person", "Product", "Conpany"],
      documentBelongName: null
    }
  
    if (!filter.documentNo) {
      alert("D??k??man numaras?? giriniz")
      setTransData(false)
      setDataLoading(false)
      return false
    }

    var d = await AxiosPost("Document/GetAll", filter).then(x => { return x.data }).catch(x => { return x });
    setTotalData(d.data?.totalCount)

    setTimeout(() => {

      setListData(d.data.list)
      var sas = pageNumber + 1
      setPageNumber(sas)
    setTransData(false)
      setDataLoading(false)
    }, 100);

    setFirstScreen(false)

  };


  const scrollBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  // Tg71!nG*
  return (
    <SafeAreaView style={{ flex: 1 }}>


      {filterDetail == false && <View style={{ flex: 2, flexDirection: "column", justifyContent: 'center', paddingBottom: 30, paddingTop: 20, backgroundColor: "#e8eaf6", borderBottomColor: "#a094b7", borderBottomWidth: 1, borderStyle: "solid" }}>
        {/* <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 10 }}><Text style={{ color: "#393185", textAlign: "center", fontWeight: "bold", marginTop: 20 }}>Tarihe G??re Sertifika/Rapor Arama </Text></View> */}
        <View style={{ flexDirection: 'row' }}>
          {isLogin && <View style={{ flexDirection: "row" }}>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Text style={{ marginBottom: 5 }}>{LangApp("StartDate")}</Text>
              <TouchableOpacity onPress={showsDatePicker} style={styles.datetimeP} >
                <MaterialCommunityIcons
                  name="calendar"
                  size={25}
                />
                <Text >
                  {startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear()}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setFilterDetail(true)} style={{ marginTop: 10, flexDirection: "row" }} >
                <MaterialCommunityIcons
                  name="filter-menu"
                  size={15}
                  color="blue"
                />
                <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 5 }}>
                  {LangApp("FilterDetail")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 10 }} >
              <Text style={{ marginBottom: 5 }}>{LangApp("EndDate")}</Text>
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
            <View style={{ textAlign: "center", justifyContent: "flex-start", alignContent: "flex-start", alignItems: "flex-start", flexDirection: "row", flex: 1 }}>

              <TouchableOpacity
                onPress={() => { setIsPagaLoadData(false); setPageNumber(1); getAllData() }}
                style={{
                  width: "100%",
                  flexDirection: "column", justifyContent: "center", alignItems: "center", borderWidth: 1, height: 43, marginTop: 22, paddingLeft: 4, paddingRight: 4, backgroundColor: "#d8672b", borderRadius: 5,
                  width: 90,

                }}>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="magnify-expand"
                    size={20}
                    color="white"
                  />
                  <Text style={{ fontWeight: "bold", color: "white" }}> {LangApp("Find")}</Text>
                </View>

              </TouchableOpacity>
              <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 5 }}>

              </Text>
            </View>
          </View>}

          {!isLogin &&
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingLeft: 10, paddingRight: 10, width: "77%" }}>
                <Text style={{ marginBottom: 5, marginTop: 2 }}>{ }</Text>
                <TextInput value={fDocumentNo} onChangeText={(x) => { setFDocumentNo(x) }} label={LangApp("DocumentNo")} style={styles.textInput} >

                </TextInput>

                <TouchableOpacity onPress={() => setFilterDetail(true)} style={{ marginTop: 10, flexDirection: "row" }} >
                  <MaterialCommunityIcons
                    name="filter-menu"
                    size={15}
                    color="blue"
                  />
                  <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 5 }}>
                    {LangApp("FilterDetail")}
                  </Text>
                </TouchableOpacity>
              </View>


              <View style={{ textAlign: "center", justifyContent: "flex-start", alignContent: "flex-start", alignItems: "flex-start", flexDirection: "row", width: "20%" }}>
                <TouchableOpacity
                  onPress={() => { setIsPagaLoadData(false); getSingleData() }}
                  style={{
                    width: "100%",
                    flexDirection: "column", justifyContent: "center", alignItems: "center", borderWidth: 1, height: 43, marginTop: 22, paddingLeft: 4, paddingRight: 4, backgroundColor: "#d8672b", borderRadius: 5,
                    width: 90,

                  }}>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="magnify-expand"
                      size={20}
                      color="white"
                    />
                    <Text style={{ fontWeight: "bold", color: "white" }}> {LangApp("Find")}</Text>
                  </View>

                </TouchableOpacity>
                <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 5 }}>

                </Text>
              </View>
            </View>}

        </View>


      </View>

      }
      {filterDetail == true && refresh &&
        <View style={{ flexDirection: "column", paddingBottom: 30, paddingTop: 20, backgroundColor: "#e8eaf6", borderBottomColor: "#a094b7", borderBottomWidth: 1, borderStyle: "solid",height:280 }}>
          <View style={{ width: "100%" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Switch onValueChange={() => { toggleFilterList("DocumentName") }} value={filterList.filter(x => { return x == "DocumentName" }).length > 0} ios_backgroundColor="red" trackColor="green"></Switch> */}
              <TextInput onChangeText={(x) => { setFDocumentName(x) }} clearButtonMode={'always'} style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "46%", fontSize: 11 }} selectionColor='green' label={LangApp("DocName")}></TextInput>
              <TextInput onChangeText={(x) => { setFDocumentBelongName(x) }} clearButtonMode={'always'} style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "46%", fontSize: 11 }} selectionColor='green' label={LangApp("DocumentHolderName")}></TextInput>

            </View>
          </View>
          <View style={{ width: "100%", marginTop: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Switch onValueChange={() => { toggleFilterList("DocumentHolderName") }} value={filterList.filter(x => { return x == "DocumentHolderName" }).length > 0} ios_backgroundColor="red" trackColor="green"></Switch> */}
              <TextInput value={fDocumentNo} onChangeText={(x) => { setFDocumentNo(x) }} clearButtonMode={'always'} style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "46%", fontSize: 11 }} selectionColor='green' label={LangApp("DocumentNo")}></TextInput>
              <View style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "46%", fontSize: 11, flexDirection: "row" }} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <Checkbox.Android onPress={() => { toggleDocumentTypeList("Certificate") }} color={`green`} status={documentType.filter(x => { return x == "Certificate" }).length > 0 ? 'checked' : "unchecked"} uncheckedColor={`grey`} ></Checkbox.Android>
                  <Text style={{ fontSize: 11 }}>{LangApp("Certificate")}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <Checkbox.Android onPress={() => { toggleDocumentTypeList("Report") }} color={`green`} status={documentType.filter(x => { return x == "Report" }).length > 0 ? 'checked' : "unchecked"} uncheckedColor={`grey`} ></Checkbox.Android>
                  <Text style={{ fontSize: 11 }}>{LangApp("Report")}</Text>
                </View>
                {/* {Platform.OS === "ios"&&
               <Checkbox.IOS  color={`#FA4616`} uncheckedColor={`#FA4616`} ></Checkbox.IOS>
              }  */}


              </View>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ backgroundColor: "white", marginLeft: 10, height: 50, width: "95%", fontSize: 11, flexDirection: "row", justifyContent: "space-around" }} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <Checkbox.Android onPress={() => { toggleFilterWho("Person") }} color={`green`} status={filterWho.filter(x => { return x == "Person" }).length > 0 ? 'checked' : "unchecked"} uncheckedColor={`grey`} ></Checkbox.Android>
                  <Text>{LangApp("Person")}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <Checkbox.Android onPress={() => { toggleFilterWho("Product") }} color={`green`} status={filterWho.filter(x => { return x == "Product" }).length > 0 ? 'checked' : "unchecked"} uncheckedColor={`grey`} ></Checkbox.Android>
                  <Text>{LangApp("Products")}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <Checkbox.Android onPress={() => { toggleFilterWho("Company") }} color={`green`} status={filterWho.filter(x => { return x == "Company" }).length > 0 ? 'checked' : "unchecked"} uncheckedColor={`grey`} ></Checkbox.Android>
                  <Text>{LangApp("Companies")}</Text>
                </View>


              </View>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 5, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => { setIsPagaLoadData(false); setPageNumber(1); getAllData() }}
              style={{
                flexDirection: "column", justifyContent: "center", alignItems: "center", borderWidth: 1, flex: 1, height: 35, marginTop: 10, paddingLeft: 4, paddingRight: 4, backgroundColor: "#d8672b",
                width: 90,

              }}>
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

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => setFilterDetail(false)} style={{ marginTop: 17, flexDirection: "row" }} >
              <MaterialCommunityIcons
                name="filter-menu"
                size={15}
                color="blue"
              />
              <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 5 }}>
                {LangApp("HideFilterDetail")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
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
            {
              listData.length == 0 && dataLoading == false && transData == false && !firstScreen&&<View style={{ alignItems: "center", flex: 1, marginTop: 50 }}>


                <Image style={{ width: 120, height: 120 }} source={require("../assets/notfound.png")}></Image>
                <Text style={{ fontWeight: "bold", color: "red", fontSize: 20, marginTop: 10 }}>Kay??t bulunamad??</Text>

              </View>
            }
            {
              firstScreen&&<Image style={{ width: 120, height: 170,marginTop:30 }} source={require("../assets/sertifika.png")}></Image>
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
              var dimgN = item.documnetKind;

              return (

                <View
                  key={key}
                  style={styles.button}
                // onPress={() =>navigation.navigate('SettingsStack', { screen: 'Settings' })}
                >

                  <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Image style={{ width: 25, height: 25, marginRight: 5, flex: 1, resizeMode: "contain" }} source={{ uri: fileurl + "upload/" + (item?.clogoUrl || item?.perlogoUrl || item?.prlogoUrl) }} />

                    <Text style={{ flex: 4, textAlign: "center", fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ flex: 2, fontStyle: "italic", fontSize: 12, textAlign: "right", color: "grey" }}>{item.documentDate}</Text>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "space-around", paddingRight: 20, paddingLeft: 14 }}>
                    <Text style={{ flex: 1, marginTop: 5, color: "#d8672b" }}>
                      {fppName}
                    </Text>
                    <TouchableOpacity style={{ fontSize: 18, alignSelf: "flex-end", backgroundColor: "#d8672b", alignSelf: "flex-end", padding: 5 }} onPress={() => navigation.navigate("Details", { documnetKind: dimgN, objectId: item.id })}>
                      <MaterialCommunityIcons
                        name="magnify"
                        size={20}
                        color="white"
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


  },
  textInput: {
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: "#26418f",
    backgroundColor: "white",

    justifyContent: "space-around",
    borderRadius: 5,

    height: 45


  }


});
export default HomeScreen;
