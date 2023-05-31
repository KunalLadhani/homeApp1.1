import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Loginpage from './src/loginPage';
import Dashboard from './src/Dashboard';

export default function App() {
  return (
    <View style={styles.container}>
      
      
      {/* <Loginpage/> */}
      <ScrollView style = {styles.container}>
        <View style = {styles.cards,styles.cardelevated}>
          <Text  fontSize="xs">Text</Text>
          
        </View>
        <Dashboard/>
       
      </ScrollView>
      
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:8,
    flex: 1,
    backgroundColor: '#fff',

   
    
  },
});
