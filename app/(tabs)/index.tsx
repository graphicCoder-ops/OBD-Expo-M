import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        setTimeout(() => router.push("auth/login"), 100);
      }
      
    } catch (error) {
      
    }
  }

  const logout = async ()=>{
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      router.push("auth/login");
    } catch (e) {
      console.error("Couldn't set isLoggedIn to True");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity onPress={logout}><Text>Log out</Text></TouchableOpacity>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
