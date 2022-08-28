import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';

function Loading(props) {
    return (

        <SafeAreaView {...props}>
            {props.Loading &&
            <View style={{flexDirection:"row",justifyContent:"center",flex:1,alignItems:"center"}}>
                <Image style={{width:100,height:100}} source={require("../assets/loading.gif")}></Image>
            </View>
                
            }
            {props.Loading == false &&
                props.children
            }
        </SafeAreaView>

    );
}

export default Loading;