import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";



export default function ForgetPassword() {

    const [email, setEmail] = useState('');

    const navigation = useNavigation();


    const handleChangeEmail = (Text) => {
        setEmail(Text);
        console.log('email ', email);
    }


    const handleGeneratePassword = () => {
           if(email.trim() === '')
            {
                alert('Por favor, introduce tu correo');
            }
            else
            {
                navigation.navigate('New Password');
            }
    }

    return (
       <GestureHandlerRootView>
         <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
         >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <View style={styles.form}>
                <TextInput
                style={styles.inputControl}
                placeholder="ejemplo@correo.com"
                onChangeText={handleChangeEmail}
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
        </ScrollView>
        </KeyboardAvoidingView>
       </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundSize: "cover",
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
    form: {
        width: '100%'
    },
    input: {
        width: '100%',
        marginBottom: 16,
      },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
      },
      inputControl: {
        backgroundColor: '#fff',
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontWeight: '500',
        color: '#222',
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
