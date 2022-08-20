// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(new Date())


  return (
    <SafeAreaView style={{ flex: 1 }}>  

      <View style={{ flexDirection: "col", flex: 1, marginTop: 5 }}>
    
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
          <View style={{ flex: 5, flexDirection: "column" }} >

            <DateTimePicker style={{ flex: 2, ali: "center" }} value={startDate} onChange={(e, d) => { setStartDate(d); }}></DateTimePicker>
          </View>
          <View style={{ flexDirection: "row",flex:1 ,alignItems:"center"}}>
            <Text style={{flex:1,textAlign:"center"}}>
            <MaterialCommunityIcons
              name="arrow-left-right-bold"
              size={20}
            />

            </Text>

          </View>
          <View style={{ flex: 5, flexDirection: "column" }} >

            <DateTimePicker style={{ flex: 2, alignContent: "center", flexDirection: "row" }} value={startDate} onChange={(e, d) => { setStartDate(d); }}></DateTimePicker>
          </View>

          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 1, flex: 3,   marginLeft: 10,marginRight:2 }}>
            <MaterialCommunityIcons
              name="magnify-expand"
              size={20}
            />
            <Text> Ara</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 11, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            You are on Home Screen
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('SettingsStack', { screen: 'Settings' })
            }>
            <Text>Go to settng Tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Details')}>
            <Text>Open Details Screen</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          React Native Bottom Navigation
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default HomeScreen;
