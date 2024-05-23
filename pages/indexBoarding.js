import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";



export default function IndexBoarding() {

    const navigation = useNavigation();

const handleSkip = () => {
   navigation.navigate('Boarding3')
}

const handleContinue = () => {
    navigation.navigate('Boarding2');
}

    return (
        <View style={styles.container}>
           
           <View style={styles.header}>
           <Text style={styles.title}>Bienvenido a MI SOAPAP</Text>
            <Text style={styles.subtitle}>Con MI SOAPAP podrás crear reportes y quejas sobre el servicio de agua en la ciudad de Puebla</Text>
           </View>
            
            <View>
                <Image
                    source={require('../assets/resource-3.png')}
                    style={styles.headerImg}
                />
            </View>
            <View style={styles.formAction}>
                <TouchableOpacity
                onPress={() => handleSkip()}
                >
                    <View style={styles.btn2}>
                        <Text style={styles.btnTxt2}>Saltar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={() => handleContinue()}
                >
                    <View style={styles.btn}>
                        <Text style={styles.btnTxt}>Continuar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    header: {
        marginVertical: 36,
        alignItems: 'center', 
      },
    title: {
        fontWeight: '700',
    fontSize: 27,
    textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center',
    },
    headerImg: {
        width: 300,
        height: 250,
        alignSelf: 'center',
    },
    formAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 24,
    },
    btn: {
        backgroundColor: '#000',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    btnTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    btn2: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 16,
        borderColor: '#000',
        borderWidth: 1,
    },
    btnTxt2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});
