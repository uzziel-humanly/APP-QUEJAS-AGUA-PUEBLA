import "react-native-gesture-handler";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useHome } from "../hooks/useHome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import {
  ButtonPrimary,
  ButtonSecondary,
  Title,
  TextNeutral,
  Header,
  NeutralButton,
} from "../styles/index/stylesHome";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  const {
    username,
    welcomeMessage,
    viewProfile,
    getTransparencia,
    handleUserService,
    rol
  } = useHome();


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Header>
              <Text style={styles.welcomeMessage}>{welcomeMessage}</Text>
              <TouchableOpacity onPress={viewProfile}>
                <MaterialCommunityIcons
                  name="account-circle"
                  color={"white"}
                  size={26}
                />
              </TouchableOpacity>
            </Header>
            <View style={{ marginBottom: 40 }}>
              {
                rol == 1 ? 
                <View style={{ marginBottom: 40 }}>
                <Title>Horarios de servicio</Title>
                <NeutralButton onPress={handleUserService}>
                  <TextNeutral>Ver mis horarios de servicio</TextNeutral>
                </NeutralButton>
              </View>
              :
              ""
              }

              <Title>Transparencia</Title>
              <View style={styles.groupButtons}>
                <ButtonPrimary
                  style={{ marginRight: 5 }}
                  onPress={() => {
                    Linking.openURL(
                      "https://consultapublicamx.plataformadetransparencia.org.mx/vut-web/faces/view/consultaPublica.xhtml?idEntidad=MjE=&idSujetoObligado=NDIzNg==#inicio"
                    );
                  }}
                >
                  <TextNeutral>Transparencia SOAPAP</TextNeutral>
                </ButtonPrimary>
                <ButtonPrimary onPress={getTransparencia}>
                  <TextNeutral>Obras del año</TextNeutral>
                </ButtonPrimary>
              </View>
            </View>

            {
              rol == 1 ? 
              <View>
              <Title>Módulo comercial</Title>
              <NeutralButton
                onPress={() => {
                  Linking.openURL("https://www.aguapuebla.mx/");
                }}
              >
                <TextNeutral>Módulo</TextNeutral>
              </NeutralButton>
            </View>
            :
            ""
            }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EDF0",
  },
  welcomeMessage: {
    color: "#fff",
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  groupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
});
