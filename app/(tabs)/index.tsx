import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardDTC from '@/components/cards/cardDTC';


export default function TabOneScreen() {
  const router = useRouter();
  useEffect(  ()=>{
    checkLogin();
    //router.push('auth/login');
  },[]);

  const checkLogin = async ()=>{
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value !== "true") {
        setTimeout(() => router.replace("auth/login"), 10);
      }
      
    } catch (error) {
      
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
      <ScrollView contentContainerStyle={styles.scroll}>
      <CardDTC/>
      <CardDTC/>
      <CardDTC/>
      <CardDTC/>
      <CardDTC/>
      <CardDTC/>
      <CardDTC/>
      <CardDTC/>
      <CardDTC/>
      <TouchableOpacity style={styles.button} onPress={logout}><Text>Log out</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  scroll:{
    flexGrow:1,
    width:'100%',
    alignItems:'center'
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
