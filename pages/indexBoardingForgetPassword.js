import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function NewPassword() {

    const navigation = useNavigation();



    const handleContinueToLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View  style={styles.header}>
            <Text style={styles.title}>Tu solicitud está siendo atendida</Text>
            <Text style={styles.subtitle}>Por favor revisa tu correo e introduce la nueva contraseña</Text>
            </View>
            <View>
                <Image
                    source={require('../assets/resource-6.png')}
                    style={styles.headerImg}
                />
            </View>
            <View style={styles.formAction}>
                <TouchableOpacity
                onPress={() => handleContinueToLogin()}
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
        alignItems: 'center',
        justifyContent: 'space-between',
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
        textAlign: 'center'
    },
    
});
