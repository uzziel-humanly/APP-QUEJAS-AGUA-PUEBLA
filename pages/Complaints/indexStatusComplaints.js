import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Table, Row } from "react-native-table-component";
import { useComplaints } from "../../hooks/Complaints/useComplaints";
import ModalDetailComplaint from "./modalDetailComplaint";
import {Title1} from "../../styles/index/stylesHome";
import styled, {useTheme} from "styled-components";

const getRowStyle = (status) => {

  const theme = useTheme();
  switch (status) {
    case "ALTA":
      return { backgroundColor: theme.Colors.status.alta }; 
    case "TRAMITE":
      return { backgroundColor: theme.Colors.status.tramite }; 
    case "CONCLUIDO":
      return { backgroundColor: theme.Colors.status.concluido }; 
    case "Desconocido":
    default:
      return { backgroundColor: "#808080" }; 
  }
};

export default function IndexStatusComplaints() {

  const theme = useTheme();
  const { tableHead, tableData, viewDetailComplaint, modalComplaint, setModalComplaint, toggleModalComplaint, selectedComplaint,
    loadingComplaints
   } = useComplaints();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar style="auto" />
        <View style={styles.container}>
          <Title1>Historial de quejas</Title1>
          <View style={styles.line} />

          <Image
            source={require("../../assets/status-complaints.png")}
            style={styles.headerImg}
          />

          <Text style={styles.subtitle}>Listado de quejas</Text>
        </View>

        <View style={styles.container2}>
         {loadingComplaints === true ? 
        <ActivityIndicator size="large" />
        :
        <Table borderStyle={styles.tableBorder}>
        <Row 
            data={tableHead} 
            style={[styles.head, {backgroundColor: theme.Colors.ui.primary}]} 
            textStyle={styles.headerText} 
          />
          {tableData.map((rowData, index) => (
            <TouchableOpacity key={index} onPress={() => viewDetailComplaint(index)}>
              <Row
                data={rowData}
                style={[styles.row, getRowStyle(rowData[1])]}
                textStyle={styles.rowText}
              />
            </TouchableOpacity>
          ))}
        </Table> 
        }
        </View>
        {modalComplaint && (
          <ModalDetailComplaint
            modalVisible={modalComplaint}
            toggleModalComplaint={toggleModalComplaint}
            selectedComplaint={selectedComplaint}
          />
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontWeight: "700",
    fontSize: 27,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  headerImg: {
    width: 250,
    height: 200,
    resizeMode: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  container2: { flex: 1, padding: 16, color: "#ffffff" },
  head: { height: 40, color: "white", marginBottom: 12 },
  headerText: { color: "#fff", fontWeight: "bold" },
  row: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
    borderRadius: 6
    // Add margin between rows
  },
  rowText: {
    color: "#fff", // White text
    fontSize: 13,
  },

});

