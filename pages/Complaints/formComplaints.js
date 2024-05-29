import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useComplaints } from '../../hooks/Complaints/useComplaints';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignatureScreen from 'react-native-signature-canvas';
import MultiSelect from 'react-native-multiple-select';
import { MaterialIcons } from '@expo/vector-icons';

export default function FormComplaints({ text, onOK }) {
  const {  ref, webStyle, handleEmpty, handleClear, handleData, scrollEnabled, handleEnd, handleBegin,
    niss, handleSelectNiss, nisSelected, requests, inputValue, handleAddRequest, handleRemoveRequest, setInputValue,
    handleFileSelect, handleFileRemove, selectedFiles
  } = useComplaints();
  
  

  

  const handleOK = (signature) => {
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
                <Text style={styles.inputLabel}>NIS asociados a la queja</Text>
                <MultiSelect
                  items={niss}
                  uniqueKey="id"
                  ref={(component) => { this.multiSelect = component }}
                  onSelectedItemsChange={handleSelectNiss}
                  selectedItems={nisSelected}
                  selectText="Selecciona los NIS asociados a la queja"
                  searchInputPlaceholderText="Buscar NIS..."
                  onChangeInput={(text) => console.log('pruebas ', text)}
                  altFontFamily="ProximaNova-Light"
                  tagRemoveIconColor="#fff"
                  tagBorderColor="#000"
                  tagContainerStyle={{backgroundColor:'#000'}}
                  tagTextColor="#fff"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="#000"
                  submitButtonText="Seleccionar NIS"
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Nombre</Text>
                <TextInput
                  style={styles.inputControl}
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
                <Text style={styles.inputLabel}>Descripción de la queja</Text>
                <TextInput
                  style={styles.inputControlMulti}
                  onSubmitEditing={Keyboard.dismiss}
                  multiline={true}
                  rows={10}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Solicitudes expresas</Text>
                <View style={styles.requestsContainer}>
                  {requests.map((request, index) => (
                    <View key={index} style={styles.requestBadge}>
                      <Text style={styles.requestText}>{request}</Text>
                      <TouchableOpacity onPress={() => handleRemoveRequest(index)}>
                        <MaterialIcons name="close" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <TextInput
                  style={styles.inputControl}
                  value={inputValue}
                  onChangeText={setInputValue}
                  onSubmitEditing={handleAddRequest}
                  returnKeyType="done"
                />
                <Button title="Agregar solicitud" onPress={handleAddRequest} color={'#000'} />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Archivos (Opcional)</Text>
                <Button title="Seleccionar archivos" onPress={handleFileSelect} color={'#000'} />
                <View style={styles.filesContainer}>
                  {selectedFiles.map((file, index) => (
                    <View key={index} style={styles.fileBadge}>
                      <Text style={styles.fileText}>{file.name}</Text>
                      <TouchableOpacity onPress={() => handleFileRemove(index)}>
                        <MaterialIcons name="close" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
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
    marginBottom: 26,
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
  inputControlMulti: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontWeight: '500',
    color: '#222',
    height: 150
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
  requestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  requestBadge: {
    backgroundColor: '#000',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  requestText: {
    color: '#fff',
    marginRight: 4,
  },
  filesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  fileBadge: {
    backgroundColor: '#000',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  fileText: {
    color: '#fff',
    marginRight: 4,
  },
});
