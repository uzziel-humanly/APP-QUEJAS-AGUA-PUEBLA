import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";



export default function ForgetPassword() {

    const navigation = useNavigation();



    const handleGeneratePassword = () => {
        navigation.navigate('New Password')
    }

    return (
        <View style={styles.container}>
            <View  style={styles.header}>
            <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.subtitle}>Escribe el correo que registraste a tu cuenta y presiona el botón de "Generar nueva contraseña"
            para generar una nueva</Text>
            </View>
            <View>
                <Image
                    source={require('../../assets/resource-5.png')}
                    style={styles.headerImg}
                />
            </View>
            <View style={styles.formAction}>
                <TouchableOpacity
                onPress={() => handleGeneratePassword()}
                >
                    <View style={styles.btn}>
                        <Text style={styles.btnTxt}>Generar nueva contraseña</Text>
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
