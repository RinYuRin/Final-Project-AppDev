import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './screens/homepage';
import Signin from './screens/signin';
import Signup from './screens/signup';
import Dashboard from './screens/dashboard';
import AddTask from './screens/addtask';
import aboutus from './screens/aboutus';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTask} options={{ headerShown: false }} />
        <Stack.Screen name="Aboutus" component={aboutus} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}