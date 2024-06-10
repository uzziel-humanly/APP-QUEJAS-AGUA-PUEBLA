import React, { useState, forwardRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Keyboard, Image, ActivityIndicator } from 'react-native';
import { useComplaints } from '../../hooks/Complaints/useComplaints';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignatureScreen from 'react-native-signature-canvas';
import MultiSelect from 'react-native-multiple-select';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { RadioGroup } from 'react-native-radio-buttons-group';
import SelectDropdown from 'react-native-select-dropdown';
import {ButtonP, Title1} from '../../styles/index/stylesHome';
import styled, {useTheme} from 'styled-components';

export default function FormComplaints({ text, onOK }) {
  const {
    ref, webStyle, handleEmpty, handleClear, handleData, scrollEnabled, handleEnd, handleBegin,
    niss, handleSelectNiss, nisSelected, requests, inputValue, handleAddRequest, handleRemoveRequest, setInputValue,
    handleFileSelect, handleFileRemove, selectedFiles, handleNewComplaint, isFormVisible, handleSubmit, control, setValue, errors, onSubmit,
    gender, handleSelectgender, idGender, nisComplaint, niss2,colony,getNisAccount, telefonoError, modules, processComplaint
  } = useComplaints();

  const theme = useTheme();

  const [filteredColonies, setFilteredColonies] = useState(colony);

  const handleSearch = (text) => {
    const filteredData = colony.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredColonies(filteredData);
  };

  const handleOK = (signature) => {
    if (onOK) {
      onOK(signature);
    }
    setValue("signature", signature);  
  };

  const [selectedNIS, setSelectedNIS] = useState(null);

  const filteredNiss = niss.filter(item => item.id !== (selectedNIS ? selectedNIS.title : null));


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={scrollEnabled}>
        <StatusBar style="auto" />
          {!isFormVisible ? (
            <View style={styles.container}>
              <View style={styles.header}>
                <Title1>QUEJAS</Title1>
                <Text style={styles.subtitle}>Si deseas registrar una nueva queja, selecciona la opción de "Registrar una nueva queja" y contesta el formulario</Text>
                <Image
                  source={require('../../assets/newComplaint.png')}
                  style={styles.headerImg}
                />
              </View>
              <View style={styles.formAction}>
                <ButtonP
                  onPress={handleNewComplaint}
                >
                  <Text style={styles.btnTxt}>Registrar nueva queja</Text>
                </ButtonP>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.header}>
                <Title1>Formulario de quejas</Title1>
              </View>


              <View style={styles.form}>
              


              <View style={styles.input}>
        <Text style={styles.inputLabel}>NIS de la queja</Text>
        <Controller
          control={control}
          name="nis"
          rules={{ required: 'Selecciona un NIS.' }}
          render={({ field: { onChange, value } }) => (
            <SelectDropdown
  data={niss2}
  onSelect={(selectedItem, index) => {
    onChange(selectedItem);
    setSelectedNIS(selectedItem);
  }}
  renderButton={(selectedItem, isOpened) => (
    <View style={styles.dropdownButtonStyle}>
      <Text style={styles.dropdownButtonTxtStyle}>
        {(selectedItem && selectedItem.title) || 'Selecciona un NIS'}
      </Text>
    </View>
  )}
  renderItem={(item, index, isSelected) => (
    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
      <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
    </View>
  )}
  showsVerticalScrollIndicator={false}
  dropdownStyle={styles.dropdownMenuStyle}
  buttonStyle={styles.dropdownButton}
  rowStyle={styles.dropdownRow}
/>

          )}
        />
        {errors.nis && <Text style={styles.errorText}>{errors.nis.message}</Text>}
      </View>

      <View style={styles.input}>
        <Text style={styles.inputLabel}>NIS asociados a la queja</Text>
        <Controller
          control={control}
          name="nis_extra"
          // rules={{ required: 'Selecciona al menos un NIS.' }}
          render={({ field: { onChange, value } }) => (
            <MultiSelect
              items={filteredNiss}
              uniqueKey="id"
              ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={onChange}
              selectedItems={value}
              selectText="Selecciona los NIS asociados a la queja"
              searchInputPlaceholderText="Buscar NIS..."
              onChangeInput={(text) => console.log('pruebas ', text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#fff"
              tagBorderColor={theme.Colors.ui.primary}
              tagContainerStyle={{backgroundColor:theme.Colors.ui.primary}}
              tagTextColor="#fff"
              selectedItemTextColor={theme.Colors.ui.primary}
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor={theme.Colors.ui.primary}
              submitButtonText="Seleccionar NIS"
            />
          )}
        />
        {/* {errors.nis_extra && <Text style={styles.errorText}>{errors.nis_extra.message}</Text>} */}
      </View>
              

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Sexo</Text>
                  <Controller
                  control={control}
                  name='sexo'
                  rules={{required: 'Selecciona tu sexo'}}
                  render={({field: {onChange, onBlur, value} }) => (
                    <RadioGroup
                    radioButtons={gender}
                    onPress={onChange}
                    selectedId={value}
                    containerStyle={{flexDirection:'row'}}
                    />
                  )}
                  />
                  {errors.sexo && <Text style={styles.errorText}>{errors.sexo.message}</Text>}
                </View>


                <View style={styles.input}>
  <Text style={styles.inputLabel}>Teléfono</Text>
  <Controller
    control={control}
    name="telefono"

    rules={{
      required: 'Introduce tu número de teléfono, no puede estar vacío.',
      pattern: {
        value: /^\d{10}$/,
        message: '',
      },
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        style={styles.inputControl}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        onSubmitEditing={Keyboard.dismiss}
        keyboardType='numeric'
        maxLength={10}
      />
    )}
  />
  {errors.telefono && <Text style={styles.errorText}>{errors.telefono.message}</Text>}
  {telefonoError && <Text style={styles.errorText}>{telefonoError}</Text>}
</View>



                <View style={styles.form}>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Colonia</Text>
        <Controller
          control={control}
          name="colonia"
          rules={{ required: 'Selecciona la colonia.' }}
          render={({ field: { onChange, value } }) => (
            <MultiSelect
              items={filteredColonies}
              uniqueKey="id"
              ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={(selectedItems) => {
                if (selectedItems.length > 1) {
                  selectedItems = [selectedItems[selectedItems.length - 1]];
                }
                onChange(selectedItems);
              }}
              selectedItems={value}
              single
              selectText="Selecciona tu colonia"
              searchInputPlaceholderText="Busca tu colonia..."
              onChangeInput={handleSearch}
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
              submitButtonText="Seleccionar colonia"
            />
          )}
        />
        {errors.colonia && <Text style={styles.errorText}>{errors.colonia.message}</Text>}
      </View>
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
                  <Text style={styles.inputLabel}>Solicitudes expresas (Máximo 6)</Text>
                  <Controller
                    control={control}
                    name="expresa"
                    rules={{ required: 'Debe de escribir al menos una solicitud.' }}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <View style={styles.requestsContainer}>
                          {requests.map((request, index) => (
                            <View key={index} style={[styles.requestBadge, {backgroundColor: theme.Colors.ui.primary}]}>
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
                        }} color={theme.Colors.ui.secondary} />
                      </>
                    )}
                  />
                  {errors.expresa && <Text style={styles.errorText}>{errors.expresa.message}</Text>}
                </View>

                <View style={styles.input}>
                <Text style={styles.inputLabel}>Archivos (Opcional)</Text>
                <Button title="Seleccionar archivos" onPress={handleFileSelect} color={theme.Colors.ui.secondary} />
                <View style={styles.filesContainer}>
                  {selectedFiles.map((file, index) => (
                    <View key={index} style={[styles.fileBadge, {backgroundColor:theme.Colors.ui.primary}]}>
                      <Text style={styles.fileText}>{file.name}</Text>
                      <TouchableOpacity onPress={() => handleFileRemove(index)}>
                        <MaterialIcons name="close" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.input}>
        <Text style={styles.inputLabel}>Módulo de atención</Text>
        <Controller
          control={control}
          name="modulo"
          // rules={{ required: 'Selecciona un módulo.' }}
          render={({ field: { onChange, value } }) => (
            <SelectDropdown
  data={modules}
  onSelect={(selectedItem, index) => {
    onChange(selectedItem);
    setSelectedNIS(selectedItem);
  }}
  renderButton={(selectedItem, isOpened) => (
    <View style={styles.dropdownButtonStyle}>
      <Text style={styles.dropdownButtonTxtStyle}>
        {(selectedItem && selectedItem.title) || 'Selecciona un Módulo'}
      </Text>
    </View>
  )}
  renderItem={(item, index, isSelected) => (
    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
      <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
    </View>
  )}
  showsVerticalScrollIndicator={false}
  dropdownStyle={styles.dropdownMenuStyle}
  buttonStyle={styles.dropdownButton}
  rowStyle={styles.dropdownRow}
/>

          )}
        />
        {/* {errors.modulo && <Text style={styles.errorText}>{errors.modulo.message}</Text>} */}
      </View>

              <View style={styles.input}>
                  <Text style={styles.inputLabel}>Nombre de la persona que atendió</Text>
                  <Controller
                    control={control}
                    name="atendio"
                    // rules={{ required: 'Debes escribir el nombre de la persona que atendió.' }}
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
                  {/* {errors.atendio && <Text style={styles.errorText}>{errors.atendio.message}</Text>} */}
                </View>

                

<View style={styles.signatureContainer}>
                  <Text style={styles.signatureLabel}>Firma</Text>
                  <Controller
                    control={control}
                    name="firma"
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
                  {errors.firma && <Text style={styles.errorText}>{errors.firma.message}</Text>}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                    <TouchableOpacity onPress={handleClear}>
                      <Text>Repetir firma</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.formAction}>
                  {
                    processComplaint ? 
                    <ActivityIndicator size="large" />
                    :
                    <ButtonP
                   onPress={handleSubmit(onSubmit)}>
                      <Text style={styles.btnTxt}>Enviar queja</Text>
                  </ButtonP>
                  }
                </View>
              </View>
            </View>
          )}
        </ScrollView>
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
  dropdownButtonStyle: {
    width: '90%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    width: '90%'
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  errorText: {
    color: 'red', 
    fontSize: 14,
    marginTop: 4,
  },
  
});