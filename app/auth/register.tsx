import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { API } from '@/constants/Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();



  const handleRegisterPage = async () =>{
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }),
    };
    try {
      console.log(API);
        const response = await fetch(API + '/auth/register',requestOptions);
        

      if(response.ok){
        router.push("(tabs)");
        try {
          await AsyncStorage.setItem('isLoggedIn', 'true');
        } catch (e) {
          console.error("Couldn't set isLoggedIn to True");
        }
      }else{
        Alert.alert('Error!!', 'Please enter same password', [
          {
            text: 'Cancel',
          },
          {text: 'OK'},
        ]);
    
          console.log("Login Failed with status: " + await response.status);
      }
    } catch (error) {
        console.log(error);
    }
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
        <TextInput
          placeholder="Confirm Password"
          value ={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Register" onPress={handleRegisterPage} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        
        width: '90%',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
      },
})