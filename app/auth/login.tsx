import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router';
import { API } from '@/constants/Utility';

export default function login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
      const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        };
      try {
        console.log(API);
          const response = await fetch(API + '/auth/login',requestOptions);
        
        if(response.ok){
          
          router.push("(tabs)");
          // react-native way
          // navigation.reset({
          // index: 0,
          // routes: [{ name: 'Dashboard' }],
          // });
        }else{
            console.log("Login Failed with status: " + await response.status);
        }
      } catch (error) {
          console.log(error);
      }
    };
    const handleRegisterPage = () =>{
      router.push("auth/register");
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} />
        <Text>OR</Text>
        <Button title="Register" onPress={handleRegisterPage} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      width: '100%',
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
    },
  });