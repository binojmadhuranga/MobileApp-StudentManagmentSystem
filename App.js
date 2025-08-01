/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home/Home';
import AuthLoading from './src/screens/AuthLoading/AuthLoading';
import Menu from './src/screens/Menu/Menu';
import SaveStudent from './src/screens/SaveStudent/SaveStudent';
import UpdateStudent from './src/screens/UpdateStudent/UpdateStudent';
import DeleteStudent from './src/screens/DeleteStudent/DeleteStudent';
import GetAllStudents from './src/screens/GetAllStudents/GetAllStudents';


function App() {


  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthLoading" component={AuthLoading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="SaveStudent" component={SaveStudent} />
        <Stack.Screen name="UpdateStudent" component={UpdateStudent} />
        <Stack.Screen name="DeleteStudent" component={DeleteStudent} />
        <Stack.Screen name="GetAllStudents" component={GetAllStudents} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
