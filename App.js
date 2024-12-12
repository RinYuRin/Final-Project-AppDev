import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import Homepage from './screens/homepage';
import Signin from './screens/signin';
import Signup from './screens/signup';
import Dashboard from './screens/dashboard';
import Task from './screens/addtask';
import aboutus from './screens/aboutus';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Toast /> {}
            <Stack.Navigator>
             
                <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
                <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
                <Stack.Screen name="Task" component={Task} options={{ headerShown: false }} />
                <Stack.Screen name="Aboutus" component={aboutus} options={{ headerShown: false }} />
            </Stack.Navigator>
           
        </NavigationContainer>
    );
}
