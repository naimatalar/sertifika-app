// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { AxiosPost } from '../crud/crud';

const DetailsScreen = (props) => {
  React.useEffect(() => {

    start()
  }, [])
  const start = async () => {


    var d = await AxiosPost("Document/GetByObjectIdMobil", {
      "documentKind": props.route.params.documentKind,
      "objectId": props.route.params.objectId,
    }).then(x => { return x.data }).catch(x => { return x });
    debugger
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
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
            You are on Details Screen
          </Text>
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
export default DetailsScreen;
