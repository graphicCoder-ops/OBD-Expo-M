import { Alert, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router';
import { API } from '@/constants/Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          try {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('username', username.toLowerCase());
          } catch (e) {
            console.error("Couldn't set isLoggedIn to True");
          }
          // react-native way
          // navigation.reset({
          // index: 0,
          // routes: [{ name: 'Dashboard' }],
          // });
        }else{
          const err = await response.text();
          Alert.alert('Login Failed', err, [
            {text: 'OK'},
          ]);
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
        <Text style={styles.heading}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}><Text>Login</Text></TouchableOpacity>
        <Text>OR</Text>
        <TouchableOpacity style={styles.button} onPress={handleRegisterPage}><Text>Register</Text></TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  heading:{
    fontSize:30,
    marginBottom:40
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      color:'white',
      width: '100%',
      margin: 10,
      borderColor:'#4C5462',
      borderBottomWidth:2,
      borderTopWidth:2,
      borderRightWidth:2,
      borderLeftWidth:2,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
    },
    button:{
      margin:10,
      borderRadius:6,
      backgroundColor:'#4B70F5',
      padding:10,
      display:'flex',
      alignItems:'center',
      width:100
    }
  });