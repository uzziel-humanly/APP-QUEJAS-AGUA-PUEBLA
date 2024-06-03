import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUserProfile } from "../../hooks/useUserProfile";


export default function IndexTemporalPassword()
{

    const{
        handleChangeNewPassword, handleChangeConfirmNewPassword, passwordMatch, messagePassword, messagePassword2, handleChangeEmail2, 
        handleUpdatePassword
    } = useUserProfile();

    return (
      <GestureHandlerRootView>
      <KeyboardAvoidingView
           style={{ flex: 1 }}
           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
           keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
       >
       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

       <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.title}>Tu contraseña está a punto de vencer</Text>
            <Text style={styles.subtitle}>Por favor, restablece la contraseña introduciendo una nueva y confirmándola</Text>
            </View>

            <View style={styles.form}>


            <View style={styles.input}>
                    <Text style={styles.inputLabel}>Correo</Text>
                    <TextInput
                    placeholder="usuario@ejemplo.com"
                    onChangeText={handleChangeEmail2}
                    style={styles.inputControl}
                    />
                </View>
                
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Introduce la nueva contraseña</Text>
                    <TextInput
                    secureTextEntry
                    placeholder="*****"
                    onChangeText={handleChangeNewPassword}
                    style={styles.inputControl}
                    />
                    {messagePassword !== '' && <Text style={{ color: 'red' }}>{messagePassword}</Text>}
                </View>

                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Confirma la contraseña</Text>
                    <TextInput
                    secureTextEntry
                    placeholder="*****"
                    onChangeText={handleChangeConfirmNewPassword}
                    style={styles.inputControl}
                    />
                    {passwordMatch === 1 && <Text style={{ color: 'green' }}>{messagePassword2}</Text>}
                    {passwordMatch === 2 && <Text style={{ color: 'red' }}>{messagePassword2}</Text>}
                </View>
            </View>


            <TouchableOpacity
            style={styles.btn}
            onPress={() => handleUpdatePassword(2)}
            >
                <Text style={styles.btnTxt}>Cambiar contraseña</Text>
            </TouchableOpacity>

            <View>

            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundSize: "cover", 
    },
    header: {
      marginVertical: 36,
      alignItems: 'center', 
    },
    headerImg: {
      width: 350,
      height: 100, 
      marginBottom: 36,
      resizeMode:'contain'
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
    form: {
      width: '100%', 
    },
    formAction: {
      marginVertical: 24,
      alignItems: 'center', 
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
    signupText: {
      color: '#0000FF',
      textDecorationLine: 'underline',
    },
  });