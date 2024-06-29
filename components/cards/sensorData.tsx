import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '@/constants/Utility';

interface sensor {
  timestamp?:Date;
  username:String;
  RPM?:String;
  SPEED?:String;
  ENGINE_LOAD?: String;
  LONG_FUEL_TRIM_1?: String;
  O2_B1S1?: String;
  THROTTLE_POS?: String;
  COOLANT_POS?: String;
  MAF?: String;
  FUEL_LEVL?:String;
}

const SensorView = () => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<sensor>({username:username});
  
  const getUsername = async () => {
    try {
      const sensorUsername = await AsyncStorage.getItem('username');
      setUsername(sensorUsername as string);
    } catch (e) {
      console.error("Couldn't get username");
    }
  }
  const fetchdata = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const response = await fetch(API + "/sensor/get/" + username, requestOptions);
    
    if (response.ok) {
      const sensors = await response.json();
      //console.log(sensors as String);
      delete sensors["_id"];
      delete sensors["__v"];
      setData(sensors);

    } else {
      console.log(await response.text())
    }

  }
  useEffect(() => {
    getUsername();
    const fetchSensor = setInterval(fetchdata, 500);
    return () => {
      clearInterval(fetchSensor);
    }
  })

  const getSensors = () => {
    if (data.username != '') {
      let contentList = [];
      let count = 0;
      for (let sensor in data) {
        contentList.push(<Text key={count++} style={styles.text}>{sensor}: {data[sensor]}</Text>);
      }
      return contentList;
    } else {
      return <Text style={styles.text}>Loading</Text>;
    }
  }

  return (
    <View>
      {getSensors()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    maxHeight: '85%',
    maxWidth: '100%',


  },
  title: {
    padding: 10,
    fontSize: 30
  },
  text: {
    fontSize: 20,
    padding: 5
  },

});

export default SensorView