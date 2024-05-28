import React from "react";
import { Modal, StyleSheet, View, Text, Pressable, TextInput, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { BlurView } from 'expo-blur';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUserProfile } from "../../hooks/useUserProfile";

export default function ModalChangePassword({ modalVisible, setModalVisible }) {

    const{
        handleChangeNewPassword, handleChangeConfirmNewPassword,passwordMatch, messagePassword, messagePassword2, handleUpdatePassword
    } = useUserProfile();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <BlurView intensity={50} style={styles.absolute} />
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Cambio de contraseña</Text>
                    <View style={styles.form}>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Escribe la nueva contraseña</Text>
                                <TextInput
                                    onChangeText={handleChangeNewPassword}
                                    style={styles.inputControl}
                                    secureTextEntry
                                    placeholder="********"
                                    onSubmitEditing={Keyboard.dismiss}
                                    
                                />
                                {
                                    messagePassword !== '' ? 
                                    <Text style={{color:'red'}}>{messagePassword}</Text>
                                    :
                                    ""
                                }
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Repite la contraseña</Text>
                                <TextInput
                                    onChangeText={handleChangeConfirmNewPassword}
                                    style={styles.inputControl}
                                    secureTextEntry
                                    placeholder="********"
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                                {
                                    passwordMatch === 1 ? 
                                    <Text style={{color:'green'}}>{messagePassword2}</Text>
                                    :
                                    passwordMatch === 2 ? 
                                    <Text style={{color:'red'}}>{messagePassword2}</Text>
                                    :
                                    ""
                                }
                            </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.textStyle}>Cancelar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonConfirm]}
                        onPress={handleUpdatePassword}
                    >
                        <Text style={styles.textStyle}>Confirmar</Text>
                    </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
         </ScrollView>
         </KeyboardAvoidingView>
         </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontWeight: '700',
        fontSize: 27,
        textAlign: 'center',
      },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'grey',
        marginRight:5
    },
    buttonConfirm:{
        backgroundColor:'black'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        marginBottom: 16,
        
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#555',
        marginBottom: 8,
    },
    inputControl: {
        backgroundColor: '#fff',
        height: 44, 
        
        paddingHorizontal: 16,
        borderRadius: 12,
        fontWeight: '500',
        color: '#333',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    
    form: {
        width: '100%',
    },
});
