import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useComplaints } from '../../hooks/Complaints/useComplaints';

const {
  handleSelectDocument,
} = useComplaints();

export default function FormComplaints() {
    return (
      <View style={styles.container}>
       <Text>Pruebas</Text>
       <Button 
       title="Selecciona el documento"
       onPress={handleSelectDocument} />
        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });
  