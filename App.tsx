import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Loginpage from './src/loginPage';
import Dashboard from './src/Dashboard';
import { NativeBaseProvider } from 'native-base';
import SignUp from './src/signupPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './config';
import { onAuthStateChanged, User } from 'firebase/auth';

const Stack = createStackNavigator();


function App() {
  const [user,setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  if (!user){
    return (
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false }}>
        <Stack.Screen name="Login" component={Loginpage} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} /> 
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <App/>
    </NavigationContainer>
    </NativeBaseProvider>
  )
}