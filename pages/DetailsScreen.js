// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { AxiosGet } from '../crud/crud';

const DetailsScreen = (props) => {
  const [data,setData]=React.useState({});
  React.useEffect(() => {

    start()
  }, [])
  const start = async () => {


    var d = await AxiosGet("Document/GetByObjectIdMobil/"+props.route.params.objectId).then(x => { return x.data }).catch(x => { return x });
   
  setData(d.data)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
            <Text>fds</Text>
      </View>
    </SafeAreaView>
  );
};
export default DetailsScreen;
