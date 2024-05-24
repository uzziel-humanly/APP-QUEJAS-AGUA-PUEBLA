import React from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useLogin } from '../../hooks/useLogin';
import { ScrollView, Keyboard, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';

export default function Login() {
    const {
        //Log in
        handleChangeUsername, handleChangePassword, validateSession, username, password, messageEror, failedLogin, handleForgetPassword,


        //Sign Up
        handleCreateAccount
    } = useLogin();


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
                <Image
                source={require('../../assets/logo.png')}
                style={styles.headerImg}
              />
              <Text style={styles.title}>Inicio de sesión</Text>
              <Text style={styles.subtitle}>Introduzca su usuario y contraseña</Text>
             </View>
    
             <View style={styles.form}>
             
               <View style={styles.input}>
                 <Text style={styles.inputLabel}>Usuario</Text>
                 <TextInput 
                 keyboardType='email-address'
                 style={styles.inputControl}
                 value={username}
                 placeholder='usuario@ejemplo.com'
                 onSubmitEditing={Keyboard.dismiss}
                 onChangeText={handleChangeUsername} />
               </View>
               <View style={styles.input}>
                 <Text style={styles.inputLabel}>Contraseña</Text>
                 <TextInput 
                 secureTextEntry
                 style={styles.inputControl}
                 value={password}
                 placeholder='*********'
                 onSubmitEditing={Keyboard.dismiss}
                 onChangeText={handleChangePassword} />
               </View>
             
             </View>

             {
              failedLogin === 1 ? 
              <Text style={{color:'red'}}>{messageEror}</Text>
              : 
              ""
             }
    
             <View style={styles.formAction}>
              <TouchableOpacity
              onPress={() => validateSession()}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnTxt}>Iniciar sesión</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => handleForgetPassword()}
              >
                <Text>Olvidé mi contraseña</Text>
              </TouchableOpacity>
           
              <TouchableOpacity
              onPress={() => handleCreateAccount()}
              >
                <Text style={{paddingTop:10}}>¿No tienes una cuenta? crea una</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundSize: "cover", 
  },
  header: {
    marginVertical: 36,
    alignItems: 'center', 
  },
  headerImg:{
    width: 350,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  
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