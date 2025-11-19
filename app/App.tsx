import Routings from '@/app/(app)/(tabs)/Route';
import { NavigationIndependentTree } from '@react-navigation/native';
import React, { JSX } from 'react';

// export type RootStackParamList = {
//     Login: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
    return (
        <NavigationIndependentTree>
            <Routings />
        </NavigationIndependentTree>
    );
}