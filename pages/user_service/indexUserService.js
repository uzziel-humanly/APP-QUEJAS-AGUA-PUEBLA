import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from "react-native";
import { useHome } from "../../hooks/useHome";
import { useTheme } from "styled-components";
import { Title1 } from '../../styles/index/stylesHome';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IndexUserService() {
    const { listNis, getUserService } = useHome();
    const theme = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [serviceData, setServiceData] = useState(null);

    const fetchData = async (nis) => {
        const data = await getUserService(nis);
        if (data) {
            const filteredData = filterServiceData(data);
            setServiceData(filteredData);
            setModalVisible(true);
        }
    };

    const filterServiceData = (data) => {
        console.log('Que pasa por aqui???', data);
        let services = [];
        for (let i = 1; i <= 6; i++) {
            if (data[`serv_${i}`] && !data[`serv_${i}`].includes("SIN SERVICIO") && data[`serv_${i}`] !== "N/A") {
                services.push({
                    day: data[`serv_${i}`],
                    startTime: data[`serv_${i}_hri`],
                    endTime: data[`serv_${i}_hrf`]
                });
            }
        }
        return services;
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.item, { backgroundColor: theme.Colors.ui.secondary }]}
            onPress={() => fetchData(item.nis)}
        >
            <Text style={{ color: theme.Colors.ui.white, fontSize: 16, fontWeight: 'bold' }}>{item.nis}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, marginTop: 30, margin: 20 }}>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons name="water-outline" size={100} color={theme.Colors.ui.secondary} style={styles.icon} />
                <Title1 style={{ marginBottom: 10, textAlign: 'center' }}>Información de Servicios</Title1>
                <Text style={{ marginBottom: 20, textAlign: 'center', color: 'gray' }}>
                    Selecciona el NIS del que quieres saber información
                </Text>
            </View>
            <FlatList
                data={listNis}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row} 
            />
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Servicios de Agua</Text>
                    {serviceData && serviceData.length > 0 ? (
                        serviceData.map((service, index) => (
                            <View key={index} style={styles.serviceItem}>
                                <Text style={styles.serviceText}>{service.day}</Text>
                                <Text style={styles.serviceText}>{service.startTime} - {service.endTime}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noServiceText}>No hay servicios disponibles</Text>
                    )}
                    <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginBottom: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    item: {
        flex: 1,
        margin: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    serviceItem: {
        marginBottom: 10,
        alignItems: 'center',
    },
    serviceText: {
        fontSize: 16,
    },
    noServiceText: {
        fontSize: 16,
        color: 'gray',
    }
});
