import React from "react";
import { Modal, Button, StyleSheet, View, Text } from "react-native";
import { useTheme } from "styled-components";

export default function ModalDetailComplaint({ modalVisible, toggleModalComplaint, selectedComplaint }) {


  const theme = useTheme();

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleModalComplaint}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalCard}>
          <Text style={styles.cardTitle}>Detalles de la Queja</Text>
          {selectedComplaint ? (
            <>
              <Text><Text style={styles.cardLabel}>Folio:</Text> {selectedComplaint.folio}</Text>
              <Text><Text style={styles.cardLabel}>Estatus:</Text>{selectedComplaint.estatus}</Text>
              <Text><Text style={styles.cardLabel}>Estado:</Text> {selectedComplaint.estado}</Text>
              <Text><Text style={styles.cardLabel}>Fecha:</Text> {selectedComplaint.fecha}</Text>
              <Text><Text style={styles.cardLabel}>Descripción:</Text> {selectedComplaint.descripcion}</Text>
              <Text><Text style={styles.cardLabel}>Domicilio:</Text> {selectedComplaint.domicilio}</Text>
              <Text><Text style={styles.cardLabel}>Teléfono:</Text> {selectedComplaint.telefono}</Text>
              <Text><Text style={styles.cardLabel}>Sexo:</Text> {selectedComplaint.sexo}</Text>
            </>
          ) : (
            <Text>No hay detalles disponibles</Text>
          )}
          <Button color={theme.Colors.ui.primary} title="Cerrar" onPress={toggleModalComplaint} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardLabel: {
    fontWeight: "bold",
  },
});
