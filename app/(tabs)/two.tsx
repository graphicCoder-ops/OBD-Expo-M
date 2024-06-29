import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import SensorData from '@/components/cards/sensorData';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabTwoScreen() {

  const router = useRouter();
  useEffect(  ()=>{
    checkLogin();
  },[]);


  const checkLogin = async ()=>{
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value !== "true") {
        setTimeout(() => router.replace("auth/login"), 10);
      }
      
    } catch (error) {
      console.log("User not logged in")
    }
  }

  
  const logout = async ()=>{
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      await AsyncStorage.removeItem('username');
      router.replace("auth/login");
    } catch (e) {
      console.error("Couldn't set isLoggedIn to True");
    }
  }

  return (
    <View style={styles.container}>
      <SensorData/>
      <TouchableOpacity style={styles.button} onPress={logout}><Text>Log out</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   
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
