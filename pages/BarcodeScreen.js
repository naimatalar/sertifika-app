import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


const BarcodeScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const color = "#00ff282e"
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
          };
      
          getBarCodeScannerPermissions();
        
    }, []);
    const scannetCahange = (d) => {
        // setScanned(d);


    }
    const handleBarCodeScanned = ({ type, data }) => {

        props.navigation.navigate("product", { barcode: data, schange: scannetCahange })
        prp.navigation.navigate("PersonDetail", { id: item.id, documnetKind: 1 }) 
        setScanned(true);

    };

    if (hasPermission === null) {
        return <Text>Barkod okutmak için uygulama kamerayı kullanmak istiyor.</Text>;
    }
    if (hasPermission === false) {
        return <Text>Kameraya erişim izni yok.</Text>;
    }

    return (
        <View
            style={{

                flexDirection: 'column',

                height: "100%",
                backgroundColor: "rgb(54 114 167 / 28%)"
            }}>
            <View style={{ height: "100%", width: "100%", position: "absolute", zIndex: 9999, flexDirection: "column", flex: 1 }}>
                <View style={{ backgroundColor: color, flex: 4 }}>

                </View>
                <View style={{ flex: 3, flexDirection: "row" }}>
                    <View style={{ backgroundColor: color, flex: 1 }}>

                    </View>
                    <View style={{ flex: 5, borderWidth: 1, borderColor: "red", borderStyle: "dashed", flexDirection: "row" }}>
                        <View style={{ flex: 1, borderWidth: 1, borderColor: "red", borderStyle: "dotted", height: 0, alignSelf: "center" }}>

                        </View>
                    </View>
                    <View style={{ backgroundColor: color, flex: 1 }}>

                    </View>
                </View>
                <View style={{ backgroundColor: color, flex: 4 }}>
                    {scanned &&
                        <TouchableOpacity style={{ backgroundColor: "white",padding:12,alignItems:"center" }}
                            onPress={() => setScanned(false)} >
                            <Text style={{color:"red",fontWeight:"bold"}}>TEKRAR OKUTMAK İÇİ DOKUNUN</Text>
                        </TouchableOpacity>
                    }
                </View>

            </View>

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}

            />




        </View>
    );
}

export default BarcodeScreen