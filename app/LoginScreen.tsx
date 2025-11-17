import { Button } from '@react-navigation/elements';
import { router } from 'expo-router';
// import { useNavigation } from 'expo-router'
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const LoginScreen = () => {
    // const navigation = useNavigation();
    const onPressLogin = () => {
        // navigation.navigate('pages')
        router.push('/Home');
    }
    return (
        <View className='flex justify-center items-center h-full'>
            <Text>LUPIN CRM1</Text>
            <View>
                <Text>Username</Text>
                <TextInput style={styles.input}></TextInput>
            </View>
            <View>
                <Text>Password</Text>
                <TextInput style={styles.input}></TextInput>
            </View>
            <Button onPress={onPressLogin}>Submit</Button>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        padding: 10,
    },
})