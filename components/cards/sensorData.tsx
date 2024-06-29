import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '@/constants/Utility';



const SensorData = () => {

    const [sensorData , setSensorData] = useState(null);
    const [username,setUsername]=useState('');
    
    const  getUsername = async ()=> {
        try {
          const sensorUsername = await AsyncStorage.getItem('username');
          setUsername(sensorUsername as string);
        } catch (e) {
          console.error("Couldn't get username");
        }
      }
      const fetchSensordata = async ()=>{
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        };
        const response = await fetch(API + "/sensor/get/" + username, requestOptions);
        if(response.ok){
            const sensors = await response.json();
            setSensorData(sensors)
            
        }else{
          console.log(await response.text())
        }
        
      }
      useEffect( ()=>{
        getUsername();
        const fetchSensor = setInterval(fetchSensordata,3000);
        return ()=>{
          console.log("Component Unmounts");
          clearInterval(fetchSensor);
        }
      })
  

      
  return (
    <View>
        {sensorData ? (
        <View style={styles.container}> 
        <Text style={styles.title}>Sensor Data</Text>
          <Text style={styles.text}>Username: {sensorData.username}</Text>
          <Text style={styles.text}>RPM: {sensorData.RPM}</Text>
          <Text style={styles.text}>Speed: {sensorData.SPEED} km/h</Text>
          <Text style={styles.text}>Engine Load: {sensorData.ENGINE_LOAD}</Text>
          <Text style={styles.text}>Fuel Level: {sensorData.FUEL_LEVL}%</Text>
          <Text style={styles.text}>LONG_FUEL_TRIM: {sensorData.LONG_FUEL_TRIM_1}</Text>
          <Text style={styles.text}>Throttle Position: {sensorData.THROTTLE_POS}</Text>
          <Text style={styles.text}>O2_B1S1: {sensorData.O2_B1S1}</Text>
          <Text style={styles.text}>COOLANT_POS: {sensorData.COOLANT_POS}</Text>
          <Text style={styles.text}>MAF: {sensorData.MAF}</Text>

          
        </View>
      ) :(
        <Text style={styles.title}>Loading Data</Text>  // This could be your else case if needed
      )}
    </View>
  )
}

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop:40,
      maxHeight:'85%',
      maxWidth:'100%',
      
      
    },
    title:{
      padding:10,
      fontSize:30
  },
    text:{
      fontSize:20,
      padding:5
    },

  });

export default SensorData