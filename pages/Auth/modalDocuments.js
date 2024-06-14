import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useReports } from "../../hooks/Reports/useReports";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { WebView } from "react-native-webview";

export default function ModalDocuments({
  modalVisible,
  setModalVisible,
  idReporte,
  status,
  tipoContrato,
}) {
  const [pdfUri, setPdfUri] = useState("");

  useEffect(() => {
    const loadPdf = async () => {
      console.log(tipoContrato);
      try {
        var asset = "";
        // Cargar el archivo PDF desde assets
        if (tipoContrato == "terminos") {
          asset = Asset.fromModule(require("../../assets/terminos.jpg"));
        } else if (tipoContrato == "adhesion") {
          asset = Asset.fromModule(require("../../assets/adhesion.jpg"));
        }
        await asset.downloadAsync();
        // Obtener la URI del archivo descargado
        const fileUri = `${FileSystem.documentDirectory}doc.jpg`;

        // Copiar el archivo a un directorio accesible
        await FileSystem.copyAsync({
          from: asset.localUri,
          to: fileUri,
        });
        setPdfUri(fileUri);
      } catch (error) {
        //console.error("Error loading PDF:", error);
      } finally {
      }
    };

    loadPdf();
  }, []);

  // useEffect(() => {
  //   const loadPdf = async () => {
  //     try {
  //       // Cargar el archivo PDF desde assets
  //       const asset = Asset.fromModule(require('../../assets/ccaunidad1.pdf'));
  //       await asset.downloadAsync();

  //       // Leer el archivo PDF
  //       const fileUri = asset.localUri || asset.uri;
  //       const fileData = await FileSystem.readAsStringAsync(fileUri, {
  //         encoding: FileSystem.EncodingType.Base64,
  //         quality: 0.5,
  //       });

  //       console.log(fileData);
  //       setPdfUri(fileData);
  //     } catch (error) {
  //       console.error("Error loading PDF:", error);
  //     }
  //   };

  //   loadPdf();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.background}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.title}>Previsualización</Text>

                  <WebView
                    originWhitelist={["*"]}
                    //source={{ uri: pdfUri }}
                    source={{ uri: pdfUri }}
                    style={{ flex: 1, width: 330 }}
                    onError={(error) =>
                      console.error("Error en WebView:", error)
                    }
                    nestedScrollEnabled={true}
                    useWebKit={true}
                    allowFileAccess={true}
                    allowFileAccessFromFileURLs={true}
                  />

                  {/* <WebView style={{ height: 500, width: 350 }} nestedScrollEnabled={true} source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=http://faa.unse.edu.ar/apuntes/ccaunidad1.pdf' }} /> */}

                  {/* <WebView
                    style={styles.container}
                    originWhitelist={['*']}
                    source={{ uri: `data:application/pdf;base64,${pdfUri}` }}
                  /> */}

                  {/* <WebView
                    style={styles.pdf}
                    useWebKit={true}
                    originWhitelist={["*"]}
                    scrollEnabled={true}
                    mediaPlaybackRequiresUserAction={true}
                    source={{
                      html: `
            <html>
            <object data="${pdfUri}" type="application/pdf">
                <embed 
                    scrollbar="1" 
                    src="${pdfUri}" 
                    type="application/pdf" 
                   
                />
            </object>
            </html>
            `,
                    }}
                  /> */}

                  <View>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.textStyle}>Cerrar</Text>
                    </Pressable>
                  </View>
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
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: 350,
    height: 700,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "grey",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  pdf: {
    flex: 1,
    width: "100%",
  },
});
