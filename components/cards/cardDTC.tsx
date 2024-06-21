import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '@/constants/Utility';

const CardDTC = () => {
    const [dtcError , setDTCError] = useState(0);
    const [username,setUsername]=useState('');

    const  getUsername = async ()=> {
      try {
        const dtcUsername = await AsyncStorage.getItem('username');
        setUsername(dtcUsername as string);
      } catch (e) {
        console.error("Couldn't get username");
      }
    }

    const fetchDTC = async ()=>{
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const response = await fetch(API + "/dtc/get/" + username, requestOptions);
      if(response.ok){
        const DTCs = await response.json();
        setDTCError(DTCs.DTCs.length);
      }else{
        console.log(await response.text())
      }
      
    }
    useEffect( ()=>{
      getUsername();
      const fetchDTC10sec = setInterval(fetchDTC,10000);
      return ()=>{
        console.log("Component Unmounts");
        clearInterval(fetchDTC10sec);
      }
    })


  return (
    <View style={{flex:1, flexDirection:'row'}}>
      <LinearGradient  style={dtcError==0?styles.container:styles.containerRED} colors={dtcError==0?['rgba(0,255,0,0.5)','rgba(0,255,0,0.1)']:['rgba(255,0,0,0.5)','rgba(255,0,0,0.1)']}>
      <Text style={styles.title}>{dtcError==0?'Your Car is Safe :)':'Your Car is UNSAFE!! D:'}</Text>
      <Text style={styles.info}>{'DTC Errors : ' + dtcError}</Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:10,
        shadowColor: "#000",
        height:120,
        margin:9,
        borderColor:'rgb(0,128,0)',
        borderStyle:'solid',
        borderWidth:2,
        flex:1
    },
    containerRED:{
        borderRadius:10,
        shadowColor: "#000",
        height:120,
        margin:9,
        borderColor:'rgb(128,0,0)',
        borderStyle:'solid',
        borderWidth:2,
        flex:1
    },
    title:{
        padding:10,
        fontSize:30
    },
    info:{
        padding:10,
        fontSize:18
    }
});

export default CardDTC