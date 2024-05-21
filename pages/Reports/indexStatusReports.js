import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useReports } from '../../hooks/Reports/useReports';


const{
  handlePruebas
} = useReports();

export default function IndexStatusReports() {
    return (
      <View style={styles.container}>
       <Text>lista de reportes</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });
  