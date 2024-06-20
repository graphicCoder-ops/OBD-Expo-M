import { Alert, Button, StyleSheet,  TextInput, TouchableOpacity,  } from 'react-native'
import React, { useState } from 'react'
import { Text, View } from '@/components/Themed';
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
        //router.push("(tabs)");
        try {
          await AsyncStorage.setItem('isLoggedIn', 'true');
        } catch (e) {
          console.error("Couldn't set isLoggedIn to True");
        }
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
    
   


  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleRegisterPage}><Text>Register</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:20,
      },
      heading:{
        fontSize:30,
        marginBottom:40,
        top: -40,
        
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
        top: -40,
      },
      button:{
        margin:10,
        borderRadius:6,
        backgroundColor:'#4B70F5',
        padding:10,
        display:'flex',
        alignItems:'center',
        width:100,
        top: -40,
      }
})

