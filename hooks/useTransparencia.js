import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useTransparencia() {
  const [modalVisible, setModalVisible] = useState(false);
  const [idObra, setIdObra] = useState('');
  const [loading, setLoading] = useState(true);

  const handleModalObras = (id) => {
    setIdObra(id);
    setModalVisible(!modalVisible);
  };

  return {
    modalVisible,
    setModalVisible,
    handleModalObras,
    idObra,setIdObra,loading,setLoading
  };
}
