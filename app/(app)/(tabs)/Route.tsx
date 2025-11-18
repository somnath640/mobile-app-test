import LoginScreen from '@/app/screens/authentication/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from './../Home';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
    return (
        
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}