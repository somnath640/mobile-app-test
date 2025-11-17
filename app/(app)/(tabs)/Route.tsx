import LoginScreen from '@/app/screens/authentication/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

export type RootStackParamList = {
    Login: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
    return (
        
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}