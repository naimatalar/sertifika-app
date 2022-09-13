import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fileurl } from "../crud/crud";
import LangApp from "../Language";

function PersonFlatList({ item, prp }) {
    
    if(!item){return<></>}
    var fppName = "";
    if (item?.companyName != null) {
        fppName = item?.companyName
    }
    if (item?.personName != " ") {
        fppName = item?.personName
    }
    if (item?.productName != null) {
        fppName = item?.productName
    }
    //   var dimgN = item.documnetKind;
    //  console.log(dimgN)
    return (

        <View key={item.id} style={{ minHeight: 65, width: 140, margin:15,
            height: 180, marginBottom: 10, backgroundColor: "white", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#d8672b", borderWidth: 1, }}>
            <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"center", flex: 6, padding: 5 }}>
                <Image source={{ uri: fileurl + "upload/" + item?.logoUrl }} style={{ width: 100, height: 100, minHeight: 40, resizeMode: "contain" }}></Image>
            </View>
            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 3, padding: 1 }}>
                <Text style={{ textAlign: "center" }}>{item.name}</Text>
                <Text style={{ textAlign: "center",fontWeight:"bold" ,fontSize:11,marginTop:2}}>({item.title||item.companyName})</Text>

            </View>


            <TouchableOpacity onPress={() => { prp.navigation.navigate("PersonDetail", { id: item.id, documnetKind: 1 }) }} style={{ flexDirection: "row", justifyContent: "center", flex: 2, alignItems: "center", backgroundColor: "#d8672b" }}>

                <MaterialCommunityIcons
                    name="magnify"
                    size={20}
                    color="white"
                    style={{ textAlign: 'right' }}
                />
                <Text style={{ color: "white", fontWeight: "bold" }}>{LangApp("Detail")}</Text>
            </TouchableOpacity>

        </View>)
}
 
export default PersonFlatList;