import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Keyboard, Image } from 'react-native';
import { useComplaints } from '../../hooks/Complaints/useComplaints';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignatureScreen from 'react-native-signature-canvas';
import MultiSelect from 'react-native-multiple-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';

export default function FormComplaints({ text, onOK }) {
  const {
    ref, webStyle, handleEmpty, handleClear, handleData, scrollEnabled, handleEnd, handleBegin,
    niss, handleSelectNiss, nisSelected, requests, inputValue, handleAddRequest, handleRemoveRequest, setInputValue,
    handleFileSelect, handleFileRemove, selectedFiles, handleNewComplaint, isFormVisible, handleSubmit, control, setValue, errors, onSubmit
  } = useComplaints();

  

  const handleOK = (signature) => {
    if (onOK) {
      onOK(signature);
    }
    setValue("signature", signature);  
  };

  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={scrollEnabled}>
          {!isFormVisible ? (
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>QUEJAS</Text>
                <Text style={styles.subtitle}>Si deseas registrar una nueva queja, selecciona la opción de "Registrar una nueva queja" y contesta el formulario</Text>
                <Image
                  source={require('../../assets/newComplaint.png')}
                  style={styles.headerImg}
                />
              </View>
              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={handleNewComplaint}
                  style={styles.btn}
                >
                  <Text style={styles.btnTxt}>Registrar nueva queja</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Formulario de Quejas</Text>
              </View>
              <View style={styles.form}>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>NIS asociados a la queja</Text>
                  <Controller
                    control={control}
                    name="nisSelected"
                    rules={{ required: 'Selecciona al menos un NIS.' }}
                    render={({ field: { onChange, value } }) => (
                      <MultiSelect
                        items={niss}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={onChange}
                        selectedItems={value}
                        selectText="Selecciona los NIS asociados a la queja"
                        searchInputPlaceholderText="Buscar NIS..."
                        onChangeInput={(text) => console.log('pruebas ', text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#fff"
                        tagBorderColor="#000"
                        tagContainerStyle={{ backgroundColor: '#000' }}
                        tagTextColor="#fff"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#000"
                        submitButtonText="Seleccionar NIS"
                      />
                    )}
                  />
                  {errors.nisSelected && <Text style={styles.errorText}>{errors.nisSelected.message}</Text>}
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Nombre</Text>
                  <Controller
                    control={control}
                    name="nombre"
                    rules={{ required: 'El nombre no puede estar vacío.' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.inputControl}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    )}
                  />
                  {errors.nombre && <Text style={styles.errorText}>{errors.nombre.message}</Text>}
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Domicilio</Text>
                  <Controller
                    control={control}
                    name="domicilio"
                    rules={{ required: 'El domicilio no puede estar vacío.' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.inputControl}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    )}
                  />
                  {errors.domicilio && <Text style={styles.errorText}>{errors.domicilio.message}</Text>}
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Descripción de la queja</Text>
                  <Controller
                    control={control}
                    name="descripcion"
                    rules={{ required: 'La descripción no puede estar vacía.' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.inputControlMulti}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onSubmitEditing={Keyboard.dismiss}
                        multiline={true}
                        rows={10}
                      />
                    )}
                  />
                  {errors.descripcion && <Text style={styles.errorText}>{errors.descripcion.message}</Text>}
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Solicitudes expresas</Text>
                  <Controller
                    control={control}
                    name="requests"
                    render={({ field: { onChange, value } }) => (
                      <>
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
                          onSubmitEditing={() => {
                            handleAddRequest();
                            onChange([...requests, inputValue]);
                          }}
                          returnKeyType="done"
                        />
                        <Button title="Agregar solicitud" onPress={() => {
                          handleAddRequest();
                          onChange([...requests, inputValue]);
                        }} color={'#000'} />
                      </>
                    )}
                  />
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
                  <Controller
                    control={control}
                    name="confirmNombre"
                    rules={{ required: 'Confirma tu nombre.' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.inputControl}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    )}
                  />
                  {errors.confirmNombre && <Text style={styles.errorText}>{errors.confirmNombre.message}</Text>}
                </View>

                <View style={styles.signatureContainer}>
                  <Text style={styles.signatureLabel}>Firma</Text>
                  <Controller
                    control={control}
                    name="signature"
                    rules={{ required: 'La firma es obligatoria.' }}
                    render={({ field: { onChange } }) => (
                      <SignatureScreen
                        ref={ref}
                        onOK={(signature) => {
                          handleOK(signature);
                          onChange(signature);
                        }}
                        onEmpty={handleEmpty}
                        descriptionText=""
                        clearText="Limpiar"
                        confirmText="Guardar"
                        webStyle={webStyle}
                        onBegin={handleBegin}
                        onEnd={handleEnd}
                        autoClear={false}
                      />
                    )}
                  />
                  {errors.signature && <Text style={styles.errorText}>{errors.signature.message}</Text>}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                    <TouchableOpacity onPress={handleClear}>
                      <Text>Repetir firma</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                    <View style={styles.btn}>
                      <Text style={styles.btnTxt}>Enviar queja</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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
  headerImg: {
    width: 350,
    height: 250,
    marginBottom: 36,
    resizeMode: 'contain'
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
    height: 150,
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
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});
