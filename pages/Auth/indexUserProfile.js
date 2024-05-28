import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUserProfile } from '../../hooks/useUserProfile';
import UserAvatar from 'react-native-user-avatar';
import ModalChangePassword from "./modalChangePassword";// Asegúrate de importar el componente con el nombre correcto

export default function IndexUserProfile() {
    const { name, email, handleChangePassword, modalVisible, setModalVisible } = useUserProfile();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <UserAvatar size={100} name={name} />
                            <Text style={styles.title}>Mi perfil</Text>
                        </View>

                        <View style={styles.form}>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Nombre</Text>
                                <TextInput
                                    style={styles.inputControl}
                                    value={name}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Correo</Text>
                                <TextInput
                                    style={styles.inputControl}
                                    value={email}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity style={styles.btn} onPress={handleChangePassword}>
                                <Text style={styles.btnTxt}>Cambiar contraseña</Text>
                            </TouchableOpacity>

                            {modalVisible && (
                                <ModalChangePassword
                                    modalVisible={modalVisible}
                                    setModalVisible={setModalVisible}
                                />
                            )}
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
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        marginBottom: 36,
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontWeight: '700',
        fontSize: 27,
        textAlign: 'center',
        color: '#333',
        marginTop: 10,
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
    formAction: {
        marginTop: 24,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#000',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    btnTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
