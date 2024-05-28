import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useComplaints } from '../../hooks/Complaints/useComplaints';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React , { useRef, useState } from 'react';
import SignatureScreen from 'react-native-signature-canvas';

export default function FormComplaints({ text, onOK }) {
  const { handleSelectDocument, ref, webStyle, handleEmpty, handleClear, handleData, scrollEnabled, handleEnd, handleBegin } = useComplaints();


    const handleOK = (signature) => {
      console.log('entras');
      if (onOK) {
        onOK(signature);
      }
    };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={scrollEnabled}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Formulario de Quejas</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Nombre</Text>
                <TextInput
                  keyboardType='email-address'
                  style={styles.inputControl}
                  placeholder='usuario@ejemplo.com'
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Domicilio</Text>
                <TextInput
                  style={styles.inputControl}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Confirma tu nombre</Text>
                <TextInput
                  style={styles.inputControl}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>

              <View style={styles.signatureContainer}>
                <Text style={styles.signatureLabel}>Firma</Text>
                <SignatureScreen
                  style={styles.signatureCanvas}
                  webStyle={webStyle}
                  ref={ref}
                  onEnd={handleEnd}
                  onOK={handleOK}
                  onEmpty={handleEmpty}
                  onGetData={handleData}
                  onBegin={handleBegin}
                  autoClear={false}
                  descriptionText={text}
                />
              </View>

              <TouchableOpacity onPress={handleClear}>
                <Text>Repetir firma</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity>
                <View style={styles.btn}>
                  <Text style={styles.btnTxt}>Enviar queja</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  signatureContainer: {
    width: '100%',
    height: 300,
    marginVertical: 16,
  },
  signatureLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  signatureCanvas: {
    flex: 1,
    height: 300,
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
});
